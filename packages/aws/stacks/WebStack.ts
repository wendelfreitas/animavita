import * as CDK from '@aws-cdk/core';
import * as S3 from '@aws-cdk/aws-s3';
import * as S3Deployment from '@aws-cdk/aws-s3-deployment';
import * as Cloudfront from '@aws-cdk/aws-cloudfront';
import * as Route53 from '@aws-cdk/aws-route53';
import * as Route53Targets from '@aws-cdk/aws-route53-targets';

import {ModeStack, getEnvironmentVariables} from '../helpers';

export class WebStack extends ModeStack {
  public readonly domainName = 'animavita.site';
  public readonly secretArn: string = this.node.tryGetContext('secretArn');

  constructor(app: CDK.App, id: string) {
    super(app, id);

    /**
     * Environment
     */

    const environment = getEnvironmentVariables(this, this.secretArn, [
      'NODE_ENV',
      'ANIMAVITA_ENV',
      'HOSTED_ZONE_ID',
      'CERTIFICATE_ARN',
    ]);

    /**
     * Bucket
     */

    const bucket = new S3.Bucket(this, 'AnimavitaWebPublicBucket', {
      bucketName: this.mode === 'production' ? this.domainName : `${this.mode}.${this.domainName}`,
      publicReadAccess: true,
      websiteIndexDocument: 'index.html',
    });

    /**
     * Deploy
     */

    new S3Deployment.BucketDeployment(this, 'AnimavitaWebDeploy', {
      sources: [S3Deployment.Source.asset('../expo/web-build')],
      destinationBucket: bucket,
    });

    /**
     * CDN
     */

    const viewerCertificate = Cloudfront.ViewerCertificate.fromAcmCertificate(
      {
        stack: this,
        node: this.node,
        certificateArn: environment['CERTIFICATE_ARN'],
      },
      {
        aliases: [this.domainName, `www.${this.domainName}`],
        sslMethod: Cloudfront.SSLMethod.SNI,
      },
    );

    const cdn = new Cloudfront.CloudFrontWebDistribution(this, 'AnimavitaWebCDN', {
      httpVersion: Cloudfront.HttpVersion.HTTP2,
      priceClass: Cloudfront.PriceClass.PRICE_CLASS_100,
      viewerProtocolPolicy: Cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
      defaultRootObject: 'index.html',
      viewerCertificate,
      originConfigs: [
        {
          s3OriginSource: {
            s3BucketSource: bucket,
          },
          behaviors: [
            {
              allowedMethods: Cloudfront.CloudFrontAllowedMethods.GET_HEAD_OPTIONS,
              compress: true,
              isDefaultBehavior: true,
              forwardedValues: {
                queryString: true,
                cookies: {forward: 'all'},
              },
            },
            {
              allowedMethods: Cloudfront.CloudFrontAllowedMethods.GET_HEAD_OPTIONS,
              compress: true,
              pathPattern: '/*.*',
              forwardedValues: {
                queryString: true,
                cookies: {forward: 'all'},
              },
            },
          ],
        },
      ],
    });

    /**
     * DNS
     */

    const hostedZone = Route53.HostedZone.fromHostedZoneAttributes(this, 'AnimavitaHostedZone', {
      zoneName: this.domainName,
      hostedZoneId: environment['HOSTED_ZONE_ID'],
    });

    new Route53.ARecord(this, 'AnimavitaWebAlias', {
      zone: hostedZone,
      target: Route53.RecordTarget.fromAlias(new Route53Targets.CloudFrontTarget(cdn)),
    });
    new Route53.ARecord(this, 'AnimavitaWebWWWAlias', {
      recordName: 'www',
      zone: hostedZone,
      target: Route53.RecordTarget.fromAlias(new Route53Targets.CloudFrontTarget(cdn)),
    });
  }
}
