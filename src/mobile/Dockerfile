FROM ghcr.io/cirruslabs/flutter:3.44.0

WORKDIR /app

COPY . .

RUN flutter pub get

CMD flutter run -d web-server --web-port=8080
