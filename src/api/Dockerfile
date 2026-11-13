FROM node:alpine

WORKDIR /app

EXPOSE 8000

COPY . .

RUN npm ci

RUN npm run build

CMD npm start
