#!/usr/bin/env node

import * as cdk from "aws-cdk-lib";
import { ArkordStack } from "../lib/arkord-stack";

const app = new cdk.App();
new ArkordStack(app, "ArkordStack", {
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION,
  },
});
