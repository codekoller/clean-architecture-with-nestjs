FROM node:18.12.1-alpine

WORKDIR /app

RUN mkdir -p /app

COPY package.*json yarn.* /app/

RUN yarn cache clean \
  rm node_modules/ \
  yarn install --frozen-lockfile
  
COPY . .

EXPOSE 3003

CMD [ "yarn", "start:dev" ]
