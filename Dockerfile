# Use Nginx as the base image
FROM nginx:alpine

LABEL maintainer="Your Name <your.email@example.com>"
LABEL version="1.0"
LABEL description="E-commerce Dashboard UI"

# Install curl for health check
RUN apk add --no-cache curl

# Set working directory
WORKDIR /usr/share/nginx/html

# Remove default nginx static assets
RUN rm -rf ./*

# Copy static assets from src directory
COPY src/ .

# Copy nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Create a non-root user to run nginx
RUN addgroup -g 1001 -S nginxgroup && \
    adduser -S nginxuser -G nginxgroup -u 1001 && \
    chown -R nginxuser:nginxgroup /usr/share/nginx/html && \
    chown -R nginxuser:nginxgroup /var/cache/nginx && \
    chown -R nginxuser:nginxgroup /var/log/nginx && \
    chown -R nginxuser:nginxgroup /etc/nginx/nginx.conf && \
    chmod -R 755 /usr/share/nginx/html && \
    touch /var/run/nginx.pid && \
    chown -R nginxuser:nginxgroup /var/run/nginx.pid

# Switch to non-root user
USER nginxuser

# Expose port 9000
EXPOSE 9000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:9000/ || exit 1

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
