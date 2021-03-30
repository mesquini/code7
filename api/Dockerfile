FROM node:alpine

WORKDIR /app

ADD package.json .

RUN yarn --silent

ADD . .

RUN yarn build

CMD yarn start

EXPOSE 3333
