# arkord/app

## :wrench: Build

```bash
docker build . -t ghcr.io/844196/arkord
```

## :rocket: Usage

```bash
cat <<EOF >.env
SERVER_LIST=[{"ip":"127.0.0.1","port":27015,"emoji":"️⛰️"},{"ip":"127.0.0.1","port":27016,"emoji":"🔯"}]
DISCORD_TOKEN=xxxxxxxxxxxxxxxxxxxxxxxxx
EOF

docker run --init --env-file .env --name arkord --detach ghcr.io/844196/arkord:latest
```
