FROM ghcr.io/cirruslabs/flutter:3.44.0

ENV PUB_HOSTED_URL=https://pub.dev

WORKDIR /app

COPY . .

RUN flutter pub get

EXPOSE 8080

CMD flutter run -d web-server --web-port=8080 --web-hostname=0.0.0.0
