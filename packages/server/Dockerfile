#This Dockerfile is used for the back-end of Rossignol monorepo project.
#The aim is to reproduct the behaviour of a monorepo that's why there's a copy of root file & front end.
FROM node:22.2.0-alpine

#Workdir of backend
WORKDIR /usr/app

#Install pnpm
RUN corepack enable

#Copy the dependencies infos
#Root (packages)
COPY ./pnpm-lock.yaml ./
COPY ./package.json ./
#Front (packages)
COPY ./packages/client/package.json ./packages/client/package.json
#Back-end (packages & src)
COPY ./packages/server/package.json ./packages/server/package.json

#Install the dependencies
RUN pnpm install

#Copy the code
COPY ./packages/server ./packages/server

#Build it
RUN pnpm -F server build

#Set port for the container
EXPOSE 3000

CMD ['pnpm' 'start']