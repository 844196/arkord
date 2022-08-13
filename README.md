<p align="center">
  <img src="https://user-images.githubusercontent.com/4990822/184510301-67163f39-d268-4a73-8d1f-a05c63e3af13.png" />
</p>

```bash
docker build . -t arkord:for-me
```

```bash
cat <<EOF >.env
SERVER_LIST=[{"ip":"127.0.0.1","port":27015,"emoji":"️⛰️"},{"ip":"127.0.0.1","port":27016,"emoji":"🔯"}]
DISCORD_TOKEN=xxxxxxxxxxxxxxxxxxxxxxxxx
EOF

docker run -it --env-file .env --rm --detach arkord:for-me
```
