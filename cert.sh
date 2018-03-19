#!/bin/bash

openssl x509 \
    -in <(openssl s_client -connect localhost:8443 -prexit 2>/dev/null) \
    -out /tmp/docker-debug.crt

/usr/lib/jvm/java-8-oracle/bin/keytool \
    -keystore /usr/lib/jvm/java-8-oracle/jre/lib/security/cacerts \
    -delete \
    -alias hunter-docker-debug \
    -storepass changeit

/usr/lib/jvm/java-8-oracle/bin/keytool \
    -importcert \
    -file /tmp/docker-debug.crt \
    -alias hunter-docker-debug \
    -keystore /usr/lib/jvm/java-8-oracle/jre/lib/security/cacerts \
    -storepass changeit \
    -noprompt
