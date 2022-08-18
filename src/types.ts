import { z } from "zod";

export const ServerSchema = z.object({
  ip: z.string(),
  port: z.number(),
  emoji: z.string(),
});

export const ServerListSchema = z.array(ServerSchema);
