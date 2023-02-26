FROM node:19-alpine

RUN npm install -g pnpm

RUN mkdir /app
WORKDIR /app

COPY . .

RUN pnpm install

WORKDIR /app/packages/json-view-client

RUN pnpm build

WORKDIR /app/packages/json-view-server

ENTRYPOINT ["pnpm", "start"]
