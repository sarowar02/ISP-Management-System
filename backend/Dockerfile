FROM eclipse-temurin:latest

WORKDIR /app

COPY target/isp-management-system.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]