# ============================
# 1. Build stage
# ============================
FROM maven:3.9.6-eclipse-temurin-17 AS builder

WORKDIR /app

# Copy pom.xml and download dependencies (better caching)
COPY pom.xml .
RUN mvn dependency:go-offline -B

# Copy source code and build the app
COPY src ./src
RUN mvn clean package -DskipTests

# ============================
# 2. Runtime stage
# ============================
FROM eclipse-temurin:17-jdk-alpine

WORKDIR /app

# Copy only the built JAR from the builder stage
COPY --from=builder /app/target/*.jar app.jar

# Railway provides PORT env var, so we expose it
EXPOSE 8080

# Run Spring Boot app
ENTRYPOINT ["java","-jar","app.jar"]
