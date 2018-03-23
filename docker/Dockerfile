# slimmer container may be possible
FROM openjdk:8-slim
EXPOSE 8080
EXPOSE 8443
EXPOSE 5005
COPY . /app
WORKDIR /app
RUN /usr/lib/jvm/java-8-openjdk-amd64/bin/keytool -genkey -noprompt \
     -alias tomcat \
     -dname "CN=localhost, OU=ID, O=japt, C=CH" \
     -keystore /app/keystore.p12 \
     -storepass default \
     -storetype PKCS12 \
     -keyalg RSA \
     -keysize 2048 \
     -keypass default
RUN [ "./mvnw", "-DskipTests=true", "clean", "install" ]
CMD [ "./mvnw", "-f", "backend/pom.xml", "spring-boot:run" ]
