# API Documentation

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