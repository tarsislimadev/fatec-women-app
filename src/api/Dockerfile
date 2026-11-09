FROM node:alpine

WORKDIR /app

COPY . .

RUN npm ci

# RUN npm run build

# CMD npm run dev

CMD npx tsx watch src/index.ts
