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

## Authentication

All protected endpoints require JWT token in Authorization header:

```
Authorization: Bearer <token>
```

## Authentication Endpoints

### POST /users/register

Register new user.

Request:

```json
{
  "username": "string",
  "email": "string",
  "password": "string"
}
```

Response (201):

```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {
      "id": "uuid",
      "username": "string",
      "email": "string",
      "createdAt": "timestamp",
      "updatedAt": "timestamp"
    },
    "accessToken": "jwt-token",
    "refreshToken": "jwt-refresh-token"
  }
}
```

### POST /users/login

Authenticate user.

Request:

```json
{
  "email": "string",
  "password": "string"
}
```

Response (200):

```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "id": "uuid",
      "username": "string",
      "email": "string",
      "createdAt": "timestamp",
      "updatedAt": "timestamp"
    },
    "accessToken": "jwt-token",
    "refreshToken": "jwt-refresh-token"
  }
}
```

### POST /users/refresh-token

Refresh expired access token.

Request:

```json
{
  "refreshToken": "string"
}
```

Response (200):

```json
{
  "success": true,
  "message": "Tokens refreshed successfully",
  "data": {
    "accessToken": "new-jwt-token",
    "refreshToken": "new-refresh-token"
  }
}
```

### GET /users/:id

Get user details. Protected endpoint.

Response (200):

```json
{
  "success": true,
  "message": "Success",
  "data": {
    "user": {
      "id": "uuid",
      "username": "string",
      "email": "string",
      "createdAt": "timestamp",
      "updatedAt": "timestamp"
    }
  }
}
```

## Blog Endpoints

### POST /blogs

Create a new blog post. Protected endpoint.

Request:

```json
{
  "title": "string",
  "content": "string"
}
```

Response (201):

```json
{
  "success": true,
  "message": "Blog created successfully",
  "data": {
    "id": "uuid",
    "title": "string",
    "content": "string",
    "userId": "uuid",
    "createdAt": "timestamp",
    "updatedAt": "timestamp"
  }
}
```

### GET /blogs

Get all blog posts with pagination.

Query Parameters:

- page (optional): Page number (default: 1)
- limit (optional): Items per page (default: 10)

Response (200):

```json
{
  "success": true,
  "message": "Success",
  "data": {
    "blogs": [
      {
        "id": "uuid",
        "title": "string",
        "content": "string",
        "userId": "uuid",
        "createdAt": "timestamp",
        "updatedAt": "timestamp"
      }
    ],
    "totalPages": "number",
    "currentPage": "number"
  }
}
```

### GET /blogs/:id

Get a specific blog post.

Response (200):

```json
{
  "success": true,
  "message": "Success",
  "data": {
    "id": "uuid",
    "title": "string",
    "content": "string",
    "userId": "uuid",
    "createdAt": "timestamp",
    "updatedAt": "timestamp"
  }
}
```

## Comment Endpoints

### POST /comments

Create a new comment. Protected endpoint.

Request:

```json
{
  "content": "string",
  "blogId": "uuid"
}
```

Response (201):

```json
{
  "success": true,
  "message": "Comment created successfully",
  "data": {
    "id": "uuid",
    "content": "string",
    "userId": "uuid",
    "blogId": "uuid",
    "createdAt": "timestamp",
    "updatedAt": "timestamp"
  }
}
```

### GET /comments

Get comments for a specific blog post.

Query Parameters:

- post_id (required): Blog post ID

Response (200):

```json
{
  "success": true,
  "message": "Success",
  "data": {
    "comments": [
      {
        "id": "uuid",
        "content": "string",
        "userId": "uuid",
        "blogId": "uuid",
        "createdAt": "timestamp",
        "updatedAt": "timestamp"
      }
    ]
  }
}
```

## Error Responses

All endpoints may return the following error responses:

### 400 Bad Request

```json
{
  "success": false,
  "message": "Validation error",
  "errors": [
    {
      "field": "string",
      "message": "string"
    }
  ]
}
```

### 401 Unauthorized

```json
{
  "success": false,
  "message": "Authentication required"
}
```

### 404 Not Found

```json
{
  "success": false,
  "message": "Resource not found"
}
```

### 500 Internal Server Error

```json
{
  "success": false,
  "message": "Internal server error"
}
```

# Deployment Guide

## Local Development with Docker Compose

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd blog-platform
   ```

2. Create `.env` file with required environment variables:

   ```
   PORT=3000
   POSTGRES_HOST=db
   POSTGRES_USER=postgres
   POSTGRES_PASSWORD=postgres
   POSTGRES_DB=blogdb
   JWT_SECRET=your-secret-key
   ```

3. Build and start services:

   ```bash
   docker-compose up --build
   ```

4. Access services:
   - User Service: http://localhost:3000
   - Blog Service: http://localhost:3001
   - Comment Service: http://localhost:3002

## AWS Deployment

1. Launch EC2 Instance:

   - Use Amazon Linux 2
   - t2.micro for testing, t2.small/medium for production
   - Configure security group to allow ports 80, 443, and 22

2. Install Dependencies:

   ```bash
   sudo yum update -y
   sudo yum install -y docker
   sudo service docker start
   sudo usermod -a -G docker ec2-user
   sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
   sudo chmod +x /usr/local/bin/docker-compose
   ```

3. Clone and Deploy:

   ```bash
   git clone <repository-url>
   cd blog-platform
   docker-compose -f docker-compose.prod.yml up --build -d
   ```

4. Set up HTTPS:
   - Register domain in Route 53
   - Request SSL certificate in ACM
   - Configure Application Load Balancer
   - Point domain to Load Balancer

## Monitoring and Maintenance

1. View logs:

   ```bash
   docker-compose logs -f [service-name]
   ```

2. Update services:

   ```bash
   git pull
   docker-compose -f docker-compose.prod.yml up --build -d
   ```

3. Backup database:
   ```bash
   docker exec blog-platform_db_1 pg_dump -U postgres blogdb > backup.sql
   ```
