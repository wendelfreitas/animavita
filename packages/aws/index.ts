import * as CDK from '@aws-cdk/core';

import {GraphQLStack} from './stacks/GraphQLStack';
import {WebStack} from './stacks/WebStack';

const PACKAGES = {
  GRAPHQL: 'graphql',
  WEB: 'web',
};
const allowedPackages = Object.values(PACKAGES);

function run() {
  const app = new CDK.App();

  const pkg = app.node.tryGetContext('pkg');
  if (!pkg || !allowedPackages.includes(pkg)) {
    throw new Error(`Invalid package "${pkg}"`);
  }

  const mode = app.node.tryGetContext('mode')
    ? app.node.tryGetContext('mode').replace(/^\w/, (c: string) => c.toUpperCase())
    : 'Development';

  switch (pkg) {
    case PACKAGES.GRAPHQL:
      new GraphQLStack(app, `Animavita${mode}GraphQLStack`);
      break;
    case PACKAGES.WEB:
      new WebStack(app, `Animavita${mode}WebStack`);
      break;
    default:
      throw new Error(`Deployment not found for package "${pkg}"`);
  }

  app.synth();
}

run();
