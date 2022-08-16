FROM node:16-alpine3.15

LABEL author="Group21"

ENV HOME=/home

RUN mkdir -p /sd-sdp-group21/

WORKDIR /sd-sdp-group21/

COPY . .

RUN npm install --legacy-peer-deps

RUN npm run build

EXPOSE 3000

ENTRYPOINT npm run serve
