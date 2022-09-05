#!/usr/bin/env node

import * as cdk from "aws-cdk-lib";
import { ArkordStack } from "../lib/arkord-stack";

const app = new cdk.App();
new ArkordStack(app, "ArkordStack");
