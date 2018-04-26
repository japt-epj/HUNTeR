[![Build Status](https://travis-ci.com/SBI-/epj-prototype.svg?token=KYkpx1fhK2TYuVsyAFZV&branch=master)](https://travis-ci.com/SBI-/epj-prototype)

# HUNTeR
App for creating and playing a scavenger hunt. 

# Table Of Contents

## Introduction
The goal of this app is to support teachers in creating interactive content for interesting lessons. The application is web-based, and can be used from either your computer, your tablet, or your mobile phone. Creating lessons is enabled for teachers, and is facilitated by a simple web interface for organizing questions and quizzes.

Participating in a scavenger hunt is easily done using any smartphone. As the application is optimized for usage in a mobile browser, there are no restrictions for the device used. However, your experience will be best when using a recent Android or iPhone device. 

## User Guide

### Teacher

### Student

# Deployment
There is currently no completely public deployment of this application, only our internal testing environment on [the HSR server](https://sinv-56053.edu.hsr.ch/). However, you are free to host your own instance of Hunter. The easiest way to do so is using Docker. 

HUNTeR relies on docker-compose for setting up the entire application environment. We have prepared a separate repository for supplying a standalone docker-compose configuration: [HUNTeR-Deploy](https://github.com/japt-epj/HUNTeR-Deploy). You can download the compose file or clone the directory.

## Prerequisites
Docker and docker-compose must be installed. Familiarity using these tools will help in creating a sensible productive deployment environment.

## Quick setup

    $ git clone git@github.com:japt-epj/HUNTeR-Deploy.git
    $ cd HUNTeR-Deploy
    # docker compose up

You can now connect to the HUNTeR Website by navigating to [http://localhost:8080/](http://localhost:8080/). The docker configuration is optimized to be hosted behind a reverse proxy. For a detailed example of an optimal deployment, see the next section.

## Cloud
Any cloud service that supports docker-compose files perfectly supports hosting an instance of HUNTeR.

## Detailed deployment diagram of testing environment
This is how we host our testing environment of hunter, and can be used as an example of how HUNTeR can be hosted in a productive environment facing the internet. The main detail to be aware of is that our docker configuration is meant to be hosted behind a reverse proxy. The configuration doesn't support HTTPS, and we rely on a properly configured reverse proxy to supply security. Configuration within the compose network is unsecured and not meant to face the internet.

We use a Jenkins [Pipeline](https://jenkins.io/doc/book/pipeline/) build defined in the [Jenkinsfile](https://github.com/SBI-/epj-prototype/blob/master/Jenkinsfile). Every push to master triggers a build, unit and integration test cycle. Every successful build is continuously deployed as a completely clean test environment, supplied with test data. This is the deployment we use for integration testing.

![Deployment Diagram](https://github.com/SBI-/epj-prototype/raw/master/documentation/deployment_diagram.png)

### Example Apache Configuration
These are the relevant parts of the apache reverse proxy configuration we use on our testing system. It uses [Let's Encrypt](https://letsencrypt.org/) for proper SSL configuration to enable HTTPS for the entire HUNTeR frontend and backend.

    ServerName              sinv-56053.edu.hsr.ch
    <VirtualHost *:80>
            ServerName              sinv-56053.edu.hsr.ch
            ErrorLog ${APACHE_LOG_DIR}/error.log
            CustomLog ${APACHE_LOG_DIR}/access.log combined
            Redirect / https://sinv-56053.edu.hsr.ch/
    </VirtualHost>
    <VirtualHost *:443>
            ServerName              sinv-56053.edu.hsr.ch
            SSLEngine               ON
            SSLProxyEngine          ON
            SSLCertificateFile      /etc/letsencrypt/live/sinv-56053.edu.hsr.ch/cert.pem
            SSLCertificateKeyFile   /etc/letsencrypt/live/sinv-56053.edu.hsr.ch/privkey.pem
            SSLCertificateChainFile /etc/letsencrypt/live/sinv-56053.edu.hsr.ch/chain.pem

            # app
            ProxyPreserveHost On
            ProxyPass               / http://127.0.0.1:8080/ nocanon
            ProxyPassReverse        / http://127.0.0.1:8080/
            ProxyRequests           Off
            AllowEncodedSlashes     NoDecode
            RequestHeader           set X-Forwarded-Proto "https"
            RequestHeader           set X-Forwarded-Port 443
    </VirtualHost>


## Database migration

# Development
HUNTeR is completely open source, and exclusively uses open source technologies. Everything we use is well documented on the respective web sites.

To start hacking on HUNTeR, just clone this repository.

`$ git clone git@github.com:SBI-/epj-prototype.git`

To create a test build and run all unit and integration tests, you can just run

`$ ./mvnw clean test verify`

This command has to be run at least once when you start to develop, because a lot of interfaces and DTO classes are generated and not checked into source control.

There is a prepared wrapper script for running a development environment on your local development machine. You **must** have docker installed for this script to work.

`$ ./dev.sh`

This environment runs the spring backend separately from the react frontend. Both support hot reloading without having to restart the respective java and express servers. The frontend can be reached on [https://localhost:3000/](https://localhost:3000/) and the backend api can be reached on [https://localhost:8080/api/](https://localhost:8080/api/). You can use this environment for local testing and rapid feedback while developing.

Hot reload for react is enabled automatically. To use the spring hot reload feature, you have to configure your IDE accordingly. [This](https://docs.spring.io/spring-boot/docs/current/reference/html/using-boot-devtools.html#_running_the_remote_client_application) section of the spring documentation covers how this can be achieved.

TODO: Add explanation for IntelliJ, which is what we use.

## Technology
The project is split up into frontend and backend. The frontend is what runs in the browser on a user's client device. The backend is a Java Spring application which runs on the server it is deployed on.

### Frontend
The main frontend technology is [React](https://reactjs.org/), supplemented by different libraries. For a comprehensive list of all dependencies, consult the [package.json](https://github.com/SBI-/epj-prototype/blob/master/frontend/package.json) file of the frontend module.

#### Most Important Libraries:

- [React](https://reactjs.org/)
- [Semantic UI](https://react.semantic-ui.com/introduction)
- [Axios](https://github.com/axios/axios)
- [Leaflet](http://leafletjs.com/) with [React-Leaflet](https://react-leaflet.js.org/)

### Backend
The backend is based on [Spring Boot 1.5](https://docs.spring.io/spring-boot/docs/1.5.12.RELEASE/reference/htmlsingle/). For a comprehensive list of all Spring plugins, and dependencies, consult the backend [maven configuration](https://github.com/SBI-/epj-prototype/blob/master/backend/pom.xml).

The API description uses [Swagger](https://swagger.io/), which enables us to generate DTOs and HTTP controller interfaces. The current stable [API documentation](https://sinv-56053.edu.hsr.ch/swagger-ui.html) is always generated at runtime with every build, and can be reached at `your-hunter-host/swagger-ui.html`.

HUNTeR is designed to be used with [POSTGRESQL](https://www.postgresql.org/) for storage.

#### Most Important Technologies:
- [Spring Boot 1.5](https://docs.spring.io/spring-boot/docs/1.5.12.RELEASE/reference/htmlsingle/)
- [Swagger](https://swagger.io/)
- [POSTGRESQL](https://www.postgresql.org/)
- [modelmapper](http://modelmapper.org/)
- [QR Code Gen](https://www.nayuki.io/page/qr-code-generator-library)

## Architecture
The entire application architecture is a fairly traditional REST API + HTML5 Frontend modelled after the [Model-View-Controller pattern](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller). Our aim is to keep the architecture as simple as possible so that we can focus on adding features. Apart from an authentication token which is generated when a user logs in, the entire backend is completely stateless. This makes development on the backend straight forward, but also has important scalability implications, which we cover in a later section.

### Application
This layer diagram shows the current tiers of the entire application logic. The presentation layer represents the entire front-end module, which is implemented in Javascript using React. All the other layers apart from the database are implemented in Java using Spring.

Frontend and Backend communicate using HTTP, using the REST API which is documented [here](https://sinv-56053.edu.hsr.ch/swagger-ui.html). Backend and database communicate using JDBC.

![Layer Diagram](https://github.com/SBI-/epj-prototype/raw/master/documentation/layer_diagram.png)


### Database

Something something JPA

### Extending functionality

### Thoughts on scalability