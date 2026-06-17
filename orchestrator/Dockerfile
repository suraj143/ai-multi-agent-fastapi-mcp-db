FROM python:3.11-slim

WORKDIR /app

COPY ../common /app/common
COPY orchestrator.py /app/orchestrator.py

RUN pip install --no-cache-dir google-generativeai mcp fastapi uvicorn

ENV PYTHONUNBUFFERED=1

CMD ["uvicorn", "orchestrator:app", "--host", "0.0.0.0", "--port", "9001"]
