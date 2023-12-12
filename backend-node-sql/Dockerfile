FROM node:lts-bullseye-slim AS builder
WORKDIR /opt/app
COPY package.json .
RUN  yarn global add pm2  && yarn

FROM builder AS release
COPY . .
RUN mv .env.prod .env 
EXPOSE 8000
CMD ["pm2-docker", "start", "process.yml"]
