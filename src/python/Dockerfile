FROM python:3.11-slim

WORKDIR /app

RUN apt-get -y update && apt-get -y install build-essential libpq-dev && rm -rf /var/lib/apt/lists/*

COPY . .

RUN pip install --no-cache-dir -r requirements.txt

EXPOSE 8000

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
