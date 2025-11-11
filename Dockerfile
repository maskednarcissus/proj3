# Build stage
FROM maven:3.9-eclipse-temurin-17 AS build
WORKDIR /app

# Copy pom.xml first for better layer caching
COPY api/pom.xml api/pom.xml
COPY frontend/package.json frontend/package.json
COPY frontend/package-lock.json frontend/package-lock.json

# Copy source files
COPY frontend frontend
COPY api/src api/src

# Build the application (this will install Node.js, build frontend, and package backend)
WORKDIR /app/api
RUN mvn clean package -DskipTests

# Runtime stage
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app

# Create non-root user
RUN addgroup -S spring && adduser -S spring -G spring
USER spring:spring

# Copy JAR from build stage
COPY --from=build /app/api/target/vitrine-sorocabana-1.0.0.jar app.jar

# Expose port
EXPOSE 8080

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=40s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:8080/ || exit 1

# Run application
ENTRYPOINT ["java", "-jar", "-Xmx512m", "-Xms256m", "app.jar", "--spring.profiles.active=prod"]

