import { Client, IntentsBitField } from "discord.js";
import query from "source-server-query";
import { ServerListSchema } from "./types";

const { DISCORD_TOKEN = "", SERVER_LIST = "" } = process.env;
const SERVERS = ServerListSchema.parse(JSON.parse(SERVER_LIST));

process.on('SIGTERM', () => process.exit(0));
process.on('SIGINT', () => process.exit(1));

(async () => {
  const discord = new Client({ intents: [IntentsBitField.Flags.Guilds] });
  await discord.login(DISCORD_TOKEN);

  const updateStatus = async () => {
    const statuses = await Promise.all(
      SERVERS.map(async ({ ip, port, emoji }) => {
        const players = (await query.players(ip, port)) as Record<
          string,
          unknown
        >[];
        return `${emoji}  ${players.length}`;
      })
    );

    discord.user?.setPresence({
      status: "online",
      activities: [{ name: statuses.join(" | ") }],
    });
  };

  updateStatus();
  setInterval(updateStatus, 1000 * 60);
})();
