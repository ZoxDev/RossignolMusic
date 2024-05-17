FROM node:22.2.0

COPY package.json pnpm-lock.yaml ./

RUN corepack enable && pnpm install

CMD pnpm tsc --version