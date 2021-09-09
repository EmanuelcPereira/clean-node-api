FROM node:14
WORKDIR /usr/src/clean-node-api
COPY ./package.json .
RUN yarn install --only=prod