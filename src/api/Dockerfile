FROM node:26.13-alpine

WORKDIR /app

EXPOSE 8000

COPY . .

RUN npm ci

RUN npm run build

CMD npm start
