FROM python

WORKDIR /app

RUN apt-get -y update && apt-get -y install build-essential libpq-dev && rm -rf /var/lib/apt/lists/*

COPY . .

COPY .env.example .env

RUN pip install --no-cache-dir -r requirements.txt

CMD uvicorn app.main:app --host 0.0.0.0 --port 8000
