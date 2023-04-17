FROM node:19.9.0-bullseye as base

# --------------------------------------------------------------------------------

FROM base as workspace

WORKDIR /opt/app

RUN \
  install -o node -g node -d /workspace/arkord/app/ && \
  install -o node -g node -d /workspace/arkord/app/node_modules/

USER node

# --------------------------------------------------------------------------------

FROM base as build

WORKDIR /opt/app

COPY package.json package-lock.json ./
RUN \
  --mount=type=cache,target=/root/.npm \
  npm ci

COPY tsconfig.json ./
COPY src ./

RUN npm run build

# 実行時に必要な依存関係のみインストール
RUN \
  --mount=type=cache,target=/root/.npm \
  npm ci --omit=dev

# --------------------------------------------------------------------------------

FROM gcr.io/distroless/nodejs:16

COPY --chown=nonroot:nonroot package.json package-lock.json /opt/app/
COPY --chown=nonroot:nonroot --from=build /opt/app/node_modules /opt/app/node_modules
COPY --chown=nonroot:nonroot --from=build /opt/app/build /opt/app/build

USER nonroot

ENTRYPOINT ["/nodejs/bin/node", "/opt/app/build/main.js"]
