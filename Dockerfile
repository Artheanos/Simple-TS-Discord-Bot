FROM node:latest

WORKDIR /app/

COPY ./package.json ./yarn.lock /app/
RUN yarn --prod

COPY . /app/
RUN yarn build

CMD ["yarn", "start"]
