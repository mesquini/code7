FROM node:alpine

WORKDIR /web

ADD package.json .

RUN yarn --silent

ADD . .

CMD yarn start

EXPOSE 3000
