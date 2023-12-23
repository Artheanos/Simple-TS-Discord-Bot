FROM node:20.9.0

WORKDIR /app/

# install yt-dlp
RUN apt update -y
RUN apt install python3-pip -y
RUN python3 -m pip install --no-deps --break-system-packages -U yt-dlp

COPY ./package.json ./package-lock.json /app/
RUN npm i
RUN npm i ffmpeg-static

COPY . /app/
RUN npx prisma migrate deploy
RUN npx prisma generate
RUN npm run build

VOLUME ["/app/data"]
CMD ["node", "dist/src/app.js"]
