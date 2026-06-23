#FROM python:3.13-slim

#WORKDIR /app

# Copy shared code
#COPY common /app/common

# Copy agentA code
#COPY agentA /app

#COPY requirements.txt /app/requirements.txt
#RUN pip install --no-cache-dir -r /app/requirements.txt

#CMD ["python", "server.py"]

FROM node:22-alpine

WORKDIR /app

# Copy shared common folder
COPY common ./common

# Copy package.json first (for caching)
COPY agentA/package.json ./package.json
RUN rm -rf node_modules package-lock.json

RUN npm install

# Copy actual agentA code
COPY agentA/server.js ./

CMD ["npm", "start"]


