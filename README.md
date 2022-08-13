<p align="center">
  <img src="https://user-images.githubusercontent.com/4990822/184510658-3c6b0a96-6f59-4003-8f90-03f42313f3c3.png" />
</p>

<h1 align="center">
arkord
</h1>
<p align="center">
  <small><i>:mountain: Display online mexicans</i></small>
</p>

<br />

```bash
cat <<EOF >.env
SERVER_LIST=[{"ip":"127.0.0.1","port":27015,"emoji":"️⛰️"},{"ip":"127.0.0.1","port":27016,"emoji":"🔯"}]
DISCORD_TOKEN=xxxxxxxxxxxxxxxxxxxxxxxxx
EOF

docker run -it --env-file .env --rm --detach ghcr.io/844196/arkord:latest
```
