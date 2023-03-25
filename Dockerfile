FROM node:16 as base

WORKDIR /home/node/app

COPY package*.json ./


RUN yarn install
# If you are building your code for production
# RUN npm ci --only=production

ARG ARGPORT=2020
ARG ARGconnectionDB=null
ARG ARGclientId=null
ARG ARGcarrierServiceUrl=null
ARG ARGclientSecret=null
ARG ARGuriMipaquete=https://api-v2.dev.mpr.mipaquete.com
ARG ARGoriginCors=*
ARG ARGcustomerKey=null
ARG ARGNODE_ENV=Dev
ARG ARGeventARN=null


ENV NODE_ENV=$ARGNODE_ENV
ENV PORT=$ARGPORT
ENV connectionDB=$ARGconnectionDB
ENV clientId=$ARGclientId
ENV carrierServiceUrl=$ARGcarrierServiceUrl
ENV clientSecret=$ARGclientSecret
ENV uriMipaquete=$ARGuriMipaquete
ENV originCors=$ARGoriginCors
ENV customerKey=$ARGcustomerKey
ENV eventARN=$ARGeventARN




# Bundle app source
COPY . .

FROM base as production

ENV NODE_PATH=./build

RUN npm run build

EXPOSE $ARGPORT

CMD [ "node", "build/app.js" ]
