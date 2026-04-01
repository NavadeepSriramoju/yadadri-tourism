# Multi-stage Docker build for Yadadri Temple Tourism Backend
# Stage 1: Build with Maven
FROM maven:3.8.1-openjdk-17 AS builder

WORKDIR /app

# Copy pom.xml first (for better Docker layer caching)
COPY backend/pom.xml .

# Download dependencies
RUN mvn dependency:resolve -DincludeScope=test

# Copy source code
COPY backend/src ./src

# Build the application
RUN mvn clean package -DskipTests -q

# Stage 2: Runtime
FROM openjdk:17-jdk-slim

WORKDIR /app

# Copy the built JAR from builder
COPY --from=builder /app/target/temple-*.jar app.jar

# Expose port
EXPOSE 8080

# Health check endpoint
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
  CMD curl -f http://localhost:8080/health || exit 1

# Set environment for Render
ENV PORT=8080
ENV JAVA_OPTS="-Xmx512m -Xms256m"

# Run the application
ENTRYPOINT ["java", "-jar", "app.jar"]
