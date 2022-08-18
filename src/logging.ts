import * as bunyan from "bunyan";

export const Log = bunyan.createLogger({
  name: "arkord",
  serializers: bunyan.stdSerializers,
});
