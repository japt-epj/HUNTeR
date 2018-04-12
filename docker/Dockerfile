# slimmer container may be possible
FROM openjdk:8-slim
EXPOSE 8080
EXPOSE 8443
EXPOSE 5005
COPY . /app
WORKDIR /app
RUN ["/bin/bash", "-c", "mv backend/target/*.jar backend/target/backend.jar"]
CMD ["java", "-jar", "backend/target/backend.jar"]
