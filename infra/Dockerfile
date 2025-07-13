FROM node:22.17.0-bullseye as workspace

WORKDIR /opt/app

RUN \
  install -o node -g node -d /workspace/arkord/infra/ && \
  install -o node -g node -d /workspace/arkord/infra/node_modules/

USER node
