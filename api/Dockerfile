FROM node:14-alpine

WORKDIR /app

ADD package.json /app

RUN yarn

ADD . /app

RUN yarn build

CMD yarn start
