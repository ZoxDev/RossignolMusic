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

COPY ./packages/server ./packages/server
COPY ./tsconfig.base.json ./
RUN ls -laR
RUN pnpm -F server build

EXPOSE 3000

CMD ['pnpm' 'start']