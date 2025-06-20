// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="./.sst/platform/config.d.ts" />

// Utility function to determine if the stage is production
const isProd = (stage: string) => stage.startsWith("prod");

export default $config({
  app(input) {
    return {
      name: "radcraft33-com",
      removal: isProd(input.stage) ? "retain" : "remove",
      home: "aws",
    };
  },

  // The main run function where all Pulumi resources are defined
  async run() {
    // Determine the domain name based on the deployment stage
    const domainName = isProd($app.stage) ? "radcraft33.com" : `${$app.stage}.radcraft33.com`;

    // Deploy the Next.js application with specified domain
    new sst.aws.Nextjs("NextApp", {
      domain: {
        name: domainName,
        dns: sst.aws.dns({
          zone: "Z090335213R71C3XV0GKU",
        }),
      },
    });
  },
});
