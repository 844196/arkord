const { Client, Intents } = require('discord.js');
import query from 'source-server-query';
import 'dotenv/config'

const SERVER_IP: string = process.env.SERVER_IP ?? ""
const SERVER_PORT: string = process.env.SERVER_PORT ?? ""
const DISCORD_TOKEN: string = process.env.DISCORD_TOKEN ?? ""

export type Player =  {
    name: string;
    duration: string;
}
export type ServerStats = {
    game: string;
    name: string;
    players: Player[],
    ip: string;
    port: string;
}

export const run = async () => {
    const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

    client.on('ready', () => {
        setInterval(async () => {
            console.log("CHECKING....")
            const stats = await fetchServer()
            console.log(Date.now().toString(), "STATS", stats)
            client.user.setPresence(userPresence(stats));
        }, 1000 * 60 * 1) // 1分ごとに実行
    });

    await client.login(DISCORD_TOKEN);
}

export const userPresence = (stats: ServerStats): any => {
    return {
        activity: {
            name: `🔴  ${stats.players.length} | ARK`
        },
        status: 'online'
    }
}

export const fetchServer = async (): Promise<ServerStats> => {
    const info = await query.info(SERVER_IP, SERVER_PORT, 1000).then()
    const players = await query.players(SERVER_IP, SERVER_PORT, 1000).then()
    return {
        game: info['game'],
        name: info['name'],
        players: players.map<Player>((p): Player => {
            return {
                name: `${p['name']}`,
                duration: `${p['duration']}`,
            }
        }),
        ip: SERVER_IP,
        port: SERVER_PORT,
    }
}

run().then()