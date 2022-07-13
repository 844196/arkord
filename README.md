```bash
docker build . -t arkord:for-me
```

```bash
cat <<EOF >.env
SERVER_IP=127.0.0.1
SERVER_PORT=27015
EOF

docker run -it --env-file .env --rm arkord:for-me
```

```console
$ docker run -it --env-file .env --rm arkord:for-me
┌─────────┬───────┬───────────┐
│ (index) │ name  │ duration  │
├─────────┼───────┼───────────┤
│    0    │ 'hoy' │ 'an hour' │
└─────────┴───────┴───────────┘
```
