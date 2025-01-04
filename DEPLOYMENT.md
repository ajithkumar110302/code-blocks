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