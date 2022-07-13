import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import query from "source-server-query";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(duration);
dayjs.extend(relativeTime);

(async () => {
  const players = (await query.players(
    process.env.SERVER_IP ?? "",
    process.env.SERVER_PORT ?? "",
    /** timeout = */ 1000
  )) as {
    name: string;
    duration: number; // unit: sec
  }[];

  const formatted = players
    .map(({ name, duration }) => ({ name, duration: Number(duration) }))
    .sort((l, r) => Math.sign(r.duration - l.duration))
    .map(({ name, duration }) => ({
      name,
      duration: dayjs.duration({ seconds: duration }).humanize(),
    }));

  console.table(formatted);
})();
