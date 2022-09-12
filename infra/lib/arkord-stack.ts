import { Stack, StackProps } from "aws-cdk-lib";
import { SubnetType, Vpc } from "aws-cdk-lib/aws-ec2";
import {
  Cluster,
  ContainerImage,
  CpuArchitecture,
  FargateService,
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

    const appTask = new FargateTaskDefinition(this, "AppTask", {
      runtimePlatform: {
        cpuArchitecture: CpuArchitecture.X86_64,
        operatingSystemFamily: OperatingSystemFamily.LINUX,
      },
      cpu: 256,
      memoryLimitMiB: 512,
    });

    appTask.addContainer("AppContainer", {
      image: ContainerImage.fromRegistry(this.node.tryGetContext("appContainerImage")),
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

    const vpc = new Vpc(this, "Vpc", {
      // 金がかかるので、クラスタをパブリックサブネットに直接配置する
      natGateways: 0,
      subnetConfiguration: [
        {
          name: "Public",
          subnetType: SubnetType.PUBLIC,
        },
      ],
    });

    const cluster = new Cluster(this, "FargateCluster", {
      vpc,
    });

    new FargateService(this, "AppService", {
      cluster,
      taskDefinition: appTask,
      desiredCount: 0,
      assignPublicIp: true, // SEE: https://abillyz.com/mamezou/studies/522
    });
  }
}
