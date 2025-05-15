FROM node:20-alpine AS builder
WORKDIR /app

COPY package*.json pnpm-lock.yaml ./
RUN npm i pnpm -g
RUN pnpm i

COPY . .

expose 3000

CMD ["pnpm", "start"]