import { Stack, StackProps } from "aws-cdk-lib";
import { SubnetType, Vpc } from "aws-cdk-lib/aws-ec2";
import {
  Cluster,
  ContainerImage,
  CpuArchitecture,
  FargateTaskDefinition,
  LinuxParameters,
  LogDriver,
  OperatingSystemFamily,
  Secret,
} from "aws-cdk-lib/aws-ecs";
import { RetentionDays } from "aws-cdk-lib/aws-logs";
import { StringParameter } from "aws-cdk-lib/aws-ssm";
import { Construct } from "constructs";

export class ArkordStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const vpc = new Vpc(this, "Vpc", {
      natGateways: 0,
      subnetConfiguration: [
        {
          name: "Public",
          subnetType: SubnetType.PUBLIC,
        },
      ],
    });

    new Cluster(this, "FargateCluster", {
      vpc,
    });

    const appTask = new FargateTaskDefinition(this, "AppTask", {
      runtimePlatform: {
        cpuArchitecture: CpuArchitecture.X86_64,
        operatingSystemFamily: OperatingSystemFamily.LINUX,
      },
      cpu: 256,
      memoryLimitMiB: 512,
    });

    appTask.addContainer("AppContainer", {
      image: ContainerImage.fromRegistry("ghcr.io/844196/arkord:latest"),
      linuxParameters: new LinuxParameters(this, "AppTaskLinuxParameters", {
        initProcessEnabled: true,
      }),
      secrets: {
        SERVER_LIST: Secret.fromSsmParameter(
          StringParameter.fromStringParameterName(
            this,
            "AppContainerSecretsServerList",
            "/arkord/SERVER_LIST"
          )
        ),
        DISCORD_TOKEN: Secret.fromSsmParameter(
          StringParameter.fromSecureStringParameterAttributes(
            this,
            "AppContainerSecretsDiscordToken",
            {
              parameterName: "/arkord/DISCORD_TOKEN",
            }
          )
        ),
      },
      logging: LogDriver.awsLogs({
        streamPrefix: "ecs",
        logRetention: RetentionDays.SIX_MONTHS,
      }),
    });
  }
}
