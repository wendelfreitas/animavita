import * as CDK from '@aws-cdk/core';
import * as S3 from '@aws-cdk/aws-s3';
import * as Lambda from '@aws-cdk/aws-lambda';
import * as ApiGateway from '@aws-cdk/aws-apigateway';
import * as SQS from '@aws-cdk/aws-sqs';
import * as IAM from '@aws-cdk/aws-iam';
import * as Route53 from '@aws-cdk/aws-route53';
import * as Route53Targets from '@aws-cdk/aws-route53-targets';
import {SqsEventSource} from '@aws-cdk/aws-lambda-event-sources';

import {ModeStack, getEnvironmentVariables} from '../helpers';

export class GraphQLStack extends ModeStack {
  public readonly domainName = 'animavita.site';
  public readonly graphqlWhitecard = this.mode === 'production' ? 'graphql' : `graphql-${this.mode}`;
  public readonly secretArn: string = this.node.tryGetContext('secretArn');

  constructor(app: CDK.App, id: string) {
    super(app, id);

    /**
     * Basic Resources
     */

    const bucket = new S3.Bucket(this, 'AnimavitaGraphQLFileBucket', {
      bucketName: `${this.graphqlWhitecard}.${this.domainName}`,
    });

    const standardQueue = new SQS.Queue(this, 'AnimavitaStandardQueue', {
      queueName: `animavita-${this.mode}-standard-queue`,
    });

    /**
     * Environment
     */

    const environment = getEnvironmentVariables(this, this.secretArn, [
      'NODE_ENV',
      'ANIMAVITA_ENV',
      'JWT_KEY',
      'MONGO_URI',
      'HOSTED_ZONE_ID',
      'CERTIFICATE_ARN',
    ]);

    /**
     * GraphQL
     */

    const graphql = new Lambda.Function(this, 'AnimavitaGraphQLFunction', {
      code: Lambda.Code.fromAsset('../graphql/build', {
        exclude: ['worker.*'],
      }),
      handler: 'index.handler',
      runtime: Lambda.Runtime.NODEJS_12_X,
      timeout: CDK.Duration.seconds(15),
      description: 'Lambda function that runs GraphQL koa server',
      functionName: `animavita-${this.mode}-graphql-function`,
      environment: {
        ...environment,
        AWS_S3_BUCKET_NAME: bucket.bucketName,
        AWS_STANDARD_QUEUE_URL: standardQueue.queueUrl,
      },
    });

    bucket.grantPut(graphql);
    standardQueue.grantSendMessages(graphql);

    const api = new ApiGateway.RestApi(this, 'AnimavitaGraphQLApi', {
      restApiName: `animavita-${this.mode}-graphql-api`,
    });
    const integration = new ApiGateway.LambdaIntegration(graphql);

    const root = api.root;
    const path = api.root.addResource('{proxy+}');

    root.addMethod('ANY', integration);
    path.addMethod('ANY', integration);

    /**
     * GraphQL Domain
     */

    const graphqlDomainName = new ApiGateway.DomainName(this, 'AnimavitaGraphQLDomainName', {
      domainName: `${this.graphqlWhitecard}.${this.domainName}`,
      endpointType: ApiGateway.EndpointType.REGIONAL,
      certificate: {
        certificateArn: environment['CERTIFICATE_ARN'],
        node: this.node,
        stack: this,
      },
    });

    graphqlDomainName.addBasePathMapping(api);

    const hostedZone = Route53.HostedZone.fromHostedZoneAttributes(this, 'AnimavitaHostedZone', {
      zoneName: this.domainName,
      hostedZoneId: environment['HOSTED_ZONE_ID'],
    });

    new Route53.ARecord(this, 'AnimavitaGraphQLAlias', {
      recordName: this.graphqlWhitecard,
      zone: hostedZone,
      target: Route53.RecordTarget.fromAlias(new Route53Targets.ApiGatewayDomain(graphqlDomainName)),
    });

    /**
     * Worker
     */

    const worker = new Lambda.Function(this, 'AnimavitaWorkerFunction', {
      code: Lambda.Code.fromAsset('../graphql/build', {
        exclude: ['index.*'],
      }),
      handler: 'worker.handler',
      runtime: Lambda.Runtime.NODEJS_12_X,
      timeout: CDK.Duration.seconds(15),
      description: 'Lambda function that runs worker',
      functionName: `animavita-${this.mode}-worker-function`,
      environment,
      initialPolicy: [
        new IAM.PolicyStatement({
          effect: IAM.Effect.ALLOW,
          actions: ['ses:SendEmail', 'ses:SendRawEmail'],
          resources: ['*'],
        }),
      ],
    });

    worker.addEventSource(new SqsEventSource(standardQueue));

    standardQueue.grantConsumeMessages(worker);
    bucket.grantRead(worker);
  }
}
