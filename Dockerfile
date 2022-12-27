FROM node:latest

WORKDIR /app/

# install yt-dlp
RUN curl -L https://github.com/yt-dlp/yt-dlp/releases/latest/download/yt-dlp -o /usr/local/bin/yt-dlp
RUN chmod a+rx /usr/local/bin/yt-dlp

COPY ./package.json ./yarn.lock /app/
RUN yarn
RUN yarn add ffmpeg-static

COPY . /app/
RUN yarn prisma migrate deploy
RUN yarn prisma generate
RUN yarn build

CMD ["node", "dist/src/app.js"]
