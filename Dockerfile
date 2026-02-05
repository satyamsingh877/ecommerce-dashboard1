# Use Nginx as the base image
FROM nginx:alpine

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
RUN chown -R nginx:nginx /usr/share/nginx/html && \
    chmod -R 755 /usr/share/nginx/html

# Switch to non-root user
USER nginx

# Expose port 9000
EXPOSE 9000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:9000/ || exit 1

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
