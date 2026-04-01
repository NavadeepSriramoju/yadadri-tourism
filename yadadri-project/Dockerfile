FROM eclipse-temurin:17-jdk-jammy AS builder

WORKDIR /app

# Copy Maven files
COPY backend/pom.xml .
COPY backend/src ./src

# Build the application
RUN apt-get update && apt-get install -y maven && \
    mvn clean package -DskipTests

FROM eclipse-temurin:17-jre-jammy

WORKDIR /app

# Copy built jar from builder stage
COPY --from=builder /app/target/*.jar app.jar

# Expose port
EXPOSE 8080

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD bash -c 'curl -f http://localhost:8080/health || exit 1'

# Run the application
ENTRYPOINT ["java", "-jar", "app.jar"]
