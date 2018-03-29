# slimmer container may be possible
FROM openjdk:8-slim
EXPOSE 8080
EXPOSE 8443
EXPOSE 5005
COPY . /app
WORKDIR /app
RUN [ "./mvnw", "-DskipTests=true", "clean", "install" ]
CMD [ "./mvnw", "-f", "backend/pom.xml", "spring-boot:run" ]
