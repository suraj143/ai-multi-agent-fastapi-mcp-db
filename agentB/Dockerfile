#FROM python:3.13-slim

#WORKDIR /app

# Copy shared code
#COPY common /app/common

# Copy agentB code
#COPY agentB /app

#COPY requirements.txt /app/requirements.txt
#RUN pip install --no-cache-dir -r /app/requirements.txt

#CMD ["python", "server.py"]


FROM node:22-alpine

WORKDIR /app

COPY common /app/common
COPY agentB/ /app

RUN npm install

ENV NODE_ENV=production

CMD ["npm", "start"]
