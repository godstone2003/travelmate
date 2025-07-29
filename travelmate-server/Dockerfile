# Backend Dockerfile
FROM node:18

WORKDIR /app

COPY package*.json ./
COPY travelmate-server ./travelmate-server
COPY .env .env

WORKDIR /app/travelmate-server

RUN npm install

EXPOSE 5000

CMD ["npm", "start"]
