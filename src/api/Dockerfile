FROM python

ENV PORT=8000

WORKDIR /app

RUN apt-get -y update && apt-get -y install build-essential libpq-dev && rm -rf /var/lib/apt/lists/*

COPY . .

RUN pip install --no-cache-dir -r requirements.txt

CMD uvicorn app.main:app --host 0.0.0.0 --port ${PORT}
