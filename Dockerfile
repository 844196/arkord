# syntax=docker/dockerfile:1

FROM node:16.16.0-bullseye-slim as build

WORKDIR /opt/app

COPY package.json package-lock.json ./
RUN --mount=type=cache,target=/root/.npm npm ci

COPY tsconfig.json main.ts ./

RUN npx tsc


FROM node:16.16.0-alpine

WORKDIR /opt/app

COPY --from=build /opt/app/node_modules /opt/app/node_modules
COPY --from=build /opt/app/build /opt/app/build

ENTRYPOINT ["node", "/opt/app/build/main.js"]
