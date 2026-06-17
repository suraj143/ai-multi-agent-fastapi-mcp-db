FROM python:3.11-slim

WORKDIR /app

COPY main.py /app/main.py

RUN pip install --no-cache-dir fastapi uvicorn httpx

ENV PYTHONUNBUFFERED=1

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "9000"]
