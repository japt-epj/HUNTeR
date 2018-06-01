[![Build Status](https://travis-ci.org/japt-epj/HUNTeR.svg?branch=master)](https://travis-ci.org/japt-epj/HUNTeR)
[![Code Metrics](https://sonarcloud.io/api/project_badges/measure?project=HUNTeR&metric=alert_status)](https://sonarcloud.io/dashboard?id=HUNTeR)

# <img width="200" src="documentation/HUNTeR.png">
App for creating and playing a scavenger hunt.

# Table Of Contents
-   [Introduction](#introduction)
-   [User Guide](#user-guide)
    -   [A Note on Language](#a-note-on-language)
    -   [Teacher](#teacher)
        -   [Create exercise](#create-exercise)
        -   [Exercise overview](#exercise-overview)
        -   [Create quiz](#create-quiz)
        -   [Quiz overview](#quiz-overview)
        -   [Create execution](#create-execution)
        -   [Execution overview](#execution-overview)
        -   [Navigate to next qr code location](#navigate-to-next-qr-code-location)
        -   [Current leaderboard](#current-leaderboard)
        -   [Create participant](#create-participant)
    -   [Participant](#participant)
        -   [Next location](#next-location)
        -   [Scan exercise](#scan-exercise)
        -   [Current leaderboard for participants](#current-leaderboard-for-participants)
        -   [User settings](#user-settings)
-   [Deployment](#deployment)
    -   [Prerequisites](#prerequisites)
    -   [Quick setup](#quick-setup)
    -   [Cloud](#cloud)
    -   [Detailed deployment diagram of testing
        environment](#detailed-deployment-diagram-of-testing-environment)
        -   [Example Apache
            Configuration](#example-apache-configuration)
    -   [Database migration](#database-migration)
-   [Development](#development)
    -   [Technology](#technology)
        -   [Build](#build)
        -   [Frontend](#frontend)
        -   [Backend](#backend)
    -   [Architecture](#architecture)
        -   [Application](#application)
        -   [Database](#database)
        -   [Extending functionality](#extending-functionality)
        -   [Thoughts on scalability](#thoughts-on-scalability)

## Introduction
The goal of this app is to support teachers in creating interactive content for interesting lessons. The application is web-based, and can be used from either your computer, your tablet, or your mobile phone. Creating lessons is enabled for teachers, and is facilitated by a simple web interface for organizing questions and quizzes.

Participating in a scavenger hunt is easily done using any smartphone. As the application is optimized for usage in a mobile browser, there are no restrictions for the device used. However, your experience will be best when using a recent Android or iPhone device. 

## User Guide

### A Note on Language
Currently, the entire frontend is in german, and german only. This is due to the fact that this project is being developed in the german speaking part of Switzerland, as a project by four german speaking students, for users who's first language is german. However, all of the documentation is in english, as is all of the source code, to be as accessible as possible to other developers.

Internationalization is not one of our prime concerns, due to the nature of the project and the scope we have to keep. However, there is no strict dependency on german as the only language, and we would be more than welcome for pull requests that modularize the UI in terms of the primary display language.

### Teacher
The teacher part of the HUNTeR app is mostly designed to be used on e regular computer.

The teacher interface is centered around creating exercises, quizzes and executions for planning lessons. An exercise is a question with possible answers. A quiz is a collection of exercises, which are grouped together to be answered in a lesson. Every exercise in a quiz has a location where it needs to be solved, and where a teacher can place a printed out QR code. Quizzes can be solved multiple times by different people, by creating different executions of the same quiz.

#### Create exercise
To create an exercise, a name for the exercise, a question and four possible answers, with one marked as the correct one, need to be provided. At the moment, only multiple choice, single answer, type questions can be created.

![Teacher create exercise](https://github.com/japt-epj/HUNTeR/raw/master/documentation/teacher_create_exercise.png)

#### Exercise overview
All existing exercises can be viewed and updated from here.

![Teacher exercise overview](https://github.com/japt-epj/HUNTeR/raw/master/documentation/teacher_exercise_overview.png)

#### Create quiz
To create a quiz, the quiz needs to be given a name. Previously created exercise can then be added to the quiz and mapped to a location on the map.

![Teacher create_quiz](https://github.com/japt-epj/HUNTeR/raw/master/documentation/teacher_create_quiz.png)

#### Quiz overview
All existing quizzes can be viewed from here. 

There is not currently an option to change the composition of a quiz.

![Teacher quiz overview](https://github.com/japt-epj/HUNTeR/raw/master/documentation/teacher_quiz_overview.png)

#### Create Execution
To create an execution, the execution needs to be given a name. Additionally, the teacher has to select a quiz to be used for the execution, add participants and has to provide a start and end time.

The start and end time were intended to restrict participants ability to solve exercises to the provided time frame, but this feature has not yet been implemented.

![Teacher create execution](https://github.com/japt-epj/HUNTeR/raw/master/documentation/teacher_create_execution.png)

#### Execution overview
All existing executions can be viewed from here and the corresponding qr codes can be downloaded. The available pdfs are intended as printouts, which can be scanned at the location where an exercise is intended to be solved.

![Teacher execution overview](https://github.com/japt-epj/HUNTeR/raw/master/documentation/teacher_execution_overview.png)

#### Navigate to next qr code location
To help place the printed qr codes at their correct location, a teacher can scan the qr code to navigate to the exercises intended location.

#### Current leaderboard
Here a teacher can view leaderboards for all executions. All participants names, rank and score (percentage of correctly answered questions) are shown. 

![Teacher current leaderboard](https://github.com/japt-epj/HUNTeR/raw/master/documentation/teacher_current_leaderboard.png)

#### Create participant
To create a new participant, an email address, a first name and a last name have to be provided. The participants password will automatically be set to his first name.  

![Teacher create participant](https://github.com/japt-epj/HUNTeR/raw/master/documentation/teacher_create_participant.png)

### Participant
The participant part of the HUNTeR app is designed to be used on a mobile phone with a camera. 

Participants take part in executions of a quiz. Their goal is to find exercises that they can scan with their phone and then solve. Participants can view a tally of their score for executions that they have participated in.

#### Next location
Shows the next location for each quiz the user is a participant of. The participant then has to find the location and solve the exercise to receive access to the next open location.

![Participant next location](https://github.com/japt-epj/HUNTeR/raw/master/documentation/participant_next_location.png)

#### Scan exercise
After allowing the application to use the camera of the mobile device it's running on, an exercises qr code can be scanned to solve the exercise.

![Participant scan exercise](https://github.com/japt-epj/HUNTeR/raw/master/documentation/participant_scan_exercise.png)

#### Current leaderboard for participants
The leaderboard shows the top three participants of each quiz. Additionally, the currently logged in participant will be displayed as well, if he did not rank in the top three.

![Participant current leaderboard](https://github.com/japt-epj/HUNTeR/raw/master/documentation/participant_current_leaderboard.png)

#### User settings
A logged in user can change his or her first and last name. The option to change ones email address or password is not yet implemented.

# Deployment
There is currently no completely public deployment of this application, only our internal testing environment on [the HSR server](https://sinv-56053.edu.hsr.ch/). However, you are free to host your own instance of HUNTeR. The easiest way to do so is using Docker. 

HUNTeR relies on docker-compose for setting up the entire application environment. We have prepared a separate repository for supplying a standalone docker-compose configuration: [HUNTeR-Deploy](https://github.com/japt-epj/HUNTeR-Deploy). You can download the compose file or clone the directory.

## Prerequisites
Docker and docker-compose must be installed. Familiarity using these tools will help in creating a sensible productive deployment environment.

## Quick setup

    $ git clone git@github.com:japt-epj/HUNTeR-Deploy.git
    $ cd HUNTeR-Deploy
    # docker-compose up

You can now connect to the HUNTeR Website by navigating to [http://localhost:3000/](http://localhost:3000/). The docker configuration is optimized to be hosted behind a reverse proxy. For a detailed example of an optimal deployment, see the next section.

## Cloud
Any cloud service that supports docker-compose files perfectly supports hosting an instance of HUNTeR.

## Detailed deployment diagram of testing environment
This is how we host our testing environment of HUNTeR, and can be used as an example of how HUNTeR can be hosted in a productive environment facing the internet. The main detail to be aware of is that our docker configuration is meant to be hosted behind a reverse proxy. The configuration doesn't support HTTPS, and we rely on a properly configured reverse proxy to supply security. Configuration within the compose network is unsecured and not meant to face the internet.

We use a Jenkins [Pipeline](https://jenkins.io/doc/book/pipeline/) build defined in the [Jenkinsfile](https://github.com/SBI-/epj-prototype/blob/master/Jenkinsfile). Every push to master triggers a build, unit and integration test cycle. Every successful build is continuously deployed as a completely clean test environment, supplied with test data. This is the deployment we use for integration testing.

![Deployment Diagram](https://github.com/japt-epj/HUNTeR/raw/master/documentation/deployment_diagram.png)

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

## Technology
The project is split up into frontend and backend. The frontend is what runs in the browser on a user's client device. The backend is a Java Spring application which runs on the server it is deployed on.

### Build

#### Travis
Travis is used to create all public builds and push to docker hub. For specific information on the travis build, you should use the travis build link and consult the travis build file. All deployable artifacts on docker hub are built using the configuration available in this repository.

#### Maven
The main build uses [maven](https://maven.apache.org/) to create a monolithic jar that contains all modules. As we use maven wrapper, maven itself is not a hard dependency. If you have the project checked out, you can build the entire project by running `./mvnw install`.

Maven is also used for dependency management and the entire build process of the backend. You are free to run custom maven builds from the backend directory.

#### NPM
The frontend is built using npm, also using npm for dependency management. When you run maven install from the main directory, npm is fetched automatically, without requiring a native installation of the node tooling. Should you want to create custom builds, you can run npm form the frontend directory. This step should only be necessary when developing specific frontend features. For npm specifics, please consult the [npm documentation](https://docs.npmjs.com/).

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

The Presentation and Logic layers communicate using HTTP, using the REST API which is documented [here](https://sinv-56053.edu.hsr.ch/swagger-ui.html). The Data Access Layer and database communicate using JDBC.

![Layer Diagram](https://github.com/japt-epj/HUNTeR/raw/master/documentation/layer_diagram.png)


### Database
The database design is relational. The complete entity description is written with JPA annotations in Java code, and all database tables are generated at application boot. We strictly use no hand-written sql to design the database.

This domain model diagram shows the entire database design.

![Domain Model](https://github.com/japt-epj/HUNTeR/raw/master/documentation/domain_model.png)

### Extending functionality
The technological choices made thus far should make the addition of new features no harder than what has been done so far. Depending on what type of feature is to be added, there are different considerations that have to be made when implementing them. When adding a new feature, you will probably have to consider more than one of the following points.

#### Adding a View
Creating new views for users will most likely entail writing new React components. If you are familiar with recent frontend technologies and ES6, you are good to hack away at creating new features.

Interesting views will communicate with the API, so sound knowledge of HTTP calls and JSON will enable you to fully take advantage of the entire backend.

#### Extending the API
Swagger is used for the entire API description. Adding new API endpoints or expanding on existing endpoints can be as easy as editing the `swagger.yaml` file (the [online editor](https://editor.swagger.io//#/) is particularly useful for this). A `mvn clean test` will generate the corresponding Spring interface files (which you have to implement), and also any DTOs that you have specified. Also, running test will at least guarantee, that the generated Java code is sensible enough to be loaded by Spring. 
Once the interfaces are generated, you have to implement them in a controller class.

#### Adding Database Tables
As previously mentioned, no SQL needs to be written. All entity definitions are created by JPA annotated classes and tables are created on first startup. To create new columns in existing tables, the entities in the `ch.japt.epj.model.data` package have to be edited.

To create additional tables, new entity classes should be added to the same package. When adding new rows, you will most likely want to edit the existing model classes to account for the changes you have made. When adding new tables, you will have to create new [repository interfaces](https://docs.spring.io/spring-data/data-commons/docs/1.6.1.RELEASE/reference/html/repositories.html) to access the data. 

Make yourself familiar with model mapper to easily integrate your new data with DTOs that are served to the API endpoints.

#### Writing Tests
You can never have enough tests, so obviously, writing tests is always a welcome addition to any project. We use spring test, which facilitates a lot of common testing gripes such as mocking and bootstrapping. Dependency Injection is handled out of the box and writing new tests is fairly simple. To write tests for your new code, you best consult the existing unit and integration tests to see how model and controller tests are handled.

#### Adding Dependencies
Most of the complexity the code base is handled using external dependencies. We favour code reuse to save time and keep our own code as simple as possible. However, when adding new dependencies, there are a few considerations to keep in mind. First and foremost, new dependencies need to be compatible with the MIT license and the licenses of current dependencies. This is a strict rule, as we wish to keep this project as open as possible.

New dependencies should be stable, or at least very actively developed. Predicting the future is hard, but sticking with dependencies that are already popular should be a fairly safe bet for the near future.

To add a new frontend dependency, use npm install to add the dependency to the package.json file. Adding a new backend dependency entails editing the `pom.xml`. We strictly discourage using dependencies that are not available on npm or maven central, because manual dependency management is a pain.

### Thoughts on scalability

#### Current
The current setup is made to be as simple as possible. A single maven build is used to create a monolithic jar file which contains the static frontend files, as well as the application server to host the backend. This is obviously not optimal for scalability, but makes it possible to publish a single docker file and keep docker-compose files as simple as possible. The reasoning behind this is to keep complexity as low as possible, which makes building and pushing production images very easy.

At the same time, the project is modularized enough to enable more refined builds and deployment strategies to create more elaborate deployment strategies.
#### Scaling up
Scaling up is the easiest solution to counter performance problems. As deploying the application on a single machine is as easy as the documented docker deployment, deplyoing on a stronger machine with better network will generally result in better performance. However, this solution provides no real scaling in terms of distributing load between several machines.

Currently, the test environment is hosted on a single core, 2GB virtual machine and works fairly well for testing purposes. Taking into account the underpowered solution that we currently have, scaling to a realistic load of users on a monolithic setup is not unrealistic.

#### Scaling out
Scaling out with this project will require changes to the build, but especially to the deployment. Precautions to these measures have been taken though, and changes are certainly possible, while requiring some tweaks to the current setup.

A first step towards better distributed scalability is creating a non-monolithic build artifact. The current single-jar deployment is targeted towards deployment on a single tomcat server instance. To move away from this restriction, a first step should be splitting up the backend and frontend builds so that they can be deployed separately. This can be done by maintaining the current build configuration, but not packaging a single jar.

The frontend consists of static artifacts, which can be hosted on any web server, such as apache or nginx. As the frontend is completely independent of the backend in terms of deployment, it doesn't matter how many servers host the frontend behind an entry reverse proxy. Scaling the frontend is therefor as easy as hosting multiple web servers on multiple machines.

The backend is designed is to be as stateless.

POSTGRES presents a certain bottleneck because horizontal scalability is not a speciality of any relational database. However, a powerful database server will be able to scale to very many queries in the current design. Should this ever be a real problem, it will have to be addressed accordingly, and probably require a switch of the database technology, and the database design as such. Should we ever reach this point, we should have enogh resources and money to throw at the problem.

TODO: Add a picture of best scaling out deployment!
