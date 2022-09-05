# arkord/infra

## :wrench: Setup

```bash
cat <<EOF >.envrc
export AWS_DEFAULT_REGION=ap-northeast-1
export AWS_ACCESS_KEY_ID=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
export AWS_SECRET_ACCESS_KEY=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
EOF

direnv allow
```

## :twisted_rightwards_arrows: Diff

```bash
npm run diff
```

## :rocket: Deploy

```bash
npm run deploy
```
