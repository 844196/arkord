import {Handler} from 'aws-lambda';
const { Client, Intents } = require('discord.js');
import {fetchServer, userPresence} from "./local";

const SERVER_IP = process.env.SERVER_IP
const SERVER_PORT = process.env.SERVER_PORT
const DISCORD_TOKEN = process.env.DISCORD_TOKEN

export const check: Handler = async (event, context, callback) => {
    const stats = await fetchServer()
    console.log("STATS", stats)

    const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

    client.on('ready', () => {
        client.user.setPresence(userPresence(stats));
    });

    await client.login(DISCORD_TOKEN);

    setTimeout(() => {
        // client.destroyだとDiscordをログアウトするので、1分で強制的に切ることでオフラインになるのを回避する
        console.log("FORCE EXIT")
        process.exit()
    }, 1000*60*1)
}