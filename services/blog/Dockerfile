FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
COPY .env ./
COPY src/config ./src/config
COPY src/models/Blog.js ./src/models/
COPY src/controllers/blogController.js ./src/controllers/
COPY src/routes/blogs.js ./src/routes/
COPY src/middleware ./src/middleware

RUN npm ci --only=production

EXPOSE 3001

CMD ["node", "src/index.js"]