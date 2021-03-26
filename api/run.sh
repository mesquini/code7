docker run \
  --name mongodb \
  -p 27017:27017 \
  -d \
  mongo

docker run \
  --name redis \
  -p 6379:6379 \
  -d \
  redis:alpine

docker volume create --name nodemodules

docker build -t app .

docker run \
  --name app \
  --link mongodb \
  -e MONGO_URL=mongodb  \
  --link redis \
  -e REDIS_URL=redis \
  -e PORT=3333 \
  -p 3333:3333 \
  -v `pwd`/src \
  -v nodemodules:/src/node_modules \
  app yarn dev

docker rm app
docker volume rm nodemodules
docker stop $(docker ps -aq)
docker rm $(docker ps -aq)

docker-compose up --build
docker-compose down

