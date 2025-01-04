FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
COPY .env ./
COPY src/config ./src/config
COPY src/models/Comment.js ./src/models/
COPY src/controllers/commentController.js ./src/controllers/
COPY src/routes/comments.js ./src/routes/
COPY src/middleware ./src/middleware

RUN npm ci --only=production

EXPOSE 3002

CMD ["node", "src/index.js"]