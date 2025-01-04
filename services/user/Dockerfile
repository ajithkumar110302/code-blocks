FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
COPY .env ./
COPY src/config ./src/config
COPY src/models/User.js ./src/models/
COPY src/controllers/userController.js ./src/controllers/
COPY src/routes/users.js ./src/routes/
COPY src/middleware ./src/middleware

RUN npm ci --only=production

EXPOSE 3000

CMD ["node", "src/index.js"]