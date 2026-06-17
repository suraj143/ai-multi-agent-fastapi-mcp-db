FROM python:3.11-slim

WORKDIR /app

COPY gemini_client.py /app/gemini_client.py
COPY server.py /app/server.py

RUN pip install --no-cache-dir google-generativeai psycopg2-binary mcp

ENV PYTHONUNBUFFERED=1

CMD ["python", "server.py"]
