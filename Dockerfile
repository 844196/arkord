# syntax=docker/dockerfile:1

FROM node:16.16.0-bullseye-slim as build

WORKDIR /opt/app

COPY package.json package-lock.json ./
RUN \
  --mount=type=cache,target=/root/.npm \
  npm ci

COPY tsconfig.json ./
COPY src ./

RUN npm run build


FROM node:16.16.0-bullseye-slim as runtime-deps

WORKDIR /opt/app

COPY package.json package-lock.json ./
RUN \
  --mount=type=cache,target=/root/.npm \
  npm ci --omit=dev


FROM gcr.io/distroless/nodejs:16

COPY --chown=nonroot:nonroot package.json package-lock.json /opt/app/
COPY --chown=nonroot:nonroot --from=runtime-deps /opt/app/node_modules /opt/app/node_modules
COPY --chown=nonroot:nonroot --from=build /opt/app/build /opt/app/build

USER nonroot

ENTRYPOINT ["/nodejs/bin/node", "/opt/app/build/main.js"]
