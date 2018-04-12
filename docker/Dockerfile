# slimmer container may be possible
FROM openjdk:8-slim
EXPOSE 8080
EXPOSE 8443
EXPOSE 5005
COPY ./backend/target/*.jar /app/backend.jar
WORKDIR /app
CMD ["java", "-jar", "backend.jar", "-Xdebug", "-Xrunjdwp:transport=dt_socket,server=y,suspend=n,address=5005" ]
