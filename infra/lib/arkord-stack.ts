import { Stack, StackProps } from "aws-cdk-lib";
import { SubnetType, Vpc } from "aws-cdk-lib/aws-ec2";
import { Cluster } from "aws-cdk-lib/aws-ecs";
import { Construct } from "constructs";

export class ArkordStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    new Vpc(this, "Vpc", {
      natGateways: 0,
      subnetConfiguration: [
        {
          name: "Public",
          subnetType: SubnetType.PUBLIC,
        },
      ],
    });
  }
}
