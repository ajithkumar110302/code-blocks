# Blog Platform

A multi-service blog platform built with Express.js, PostgreSQL, and Docker.

## Features

- User authentication with JWT
- Blog post management
- Comment system
- Docker containerization
- PostgreSQL database

## Local Development

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## Docker Setup

1. Build and run with Docker Compose:
   ```bash
   docker-compose up --build
   ```

## API Endpoints

### Users
- POST /users/register - Register a new user
- POST /users/login - Login user
- GET /users/:id - Get user details

### Blogs
- POST /blogs - Create a new blog post
- GET /blogs - List all blog posts (with pagination)
- GET /blogs/:id - Get a specific blog post

### Comments
- POST /comments - Add a comment to a blog post
- GET /comments?post_id=:id - Get comments for a blog post

## Environment Variables

Create a `.env` file with the following variables:
```
PORT=3000
POSTGRES_HOST=localhost
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=blogdb
JWT_SECRET=your-secret-key
```

## AWS Deployment

1. Launch an EC2 instance
2. Install Docker and Docker Compose
3. Clone the repository
4. Configure environment variables
5. Run with Docker Compose

For detailed deployment instructions, see the deployment guide.