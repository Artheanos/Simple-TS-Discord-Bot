FROM node:latest

WORKDIR /app/

# install yt-dlp
RUN apt update -y
RUN apt install python3-pip -y
RUN python3 -m pip install --no-deps -U yt-dlp

COPY ./package.json ./yarn.lock /app/
RUN yarn
RUN yarn add ffmpeg-static

COPY . /app/
RUN yarn prisma migrate deploy
RUN yarn prisma generate
RUN yarn build

CMD ["node", "dist/src/app.js"]
