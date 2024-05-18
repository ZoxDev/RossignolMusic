FROM node:22.2.0-alpine

WORKDIR /usr/app

RUN corepack enable
ENV NODE_ENV development

COPY ./pnpm-lock.yaml ./
COPY ./package.json ./
COPY ./pnpm-workspace.yaml ./

COPY ./packages/client/package.json ./packages/client/package.json
COPY ./packages/server/package.json ./packages/server/package.json

RUN pnpm install --frozen-lockfile

COPY ./packages/client ./packages/client
COPY ./tsconfig.base.json ./

RUN pnpm -F client build

EXPOSE 5173

CMD ['pnpm' 'dev']