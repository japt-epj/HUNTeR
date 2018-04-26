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

`$ git clone git@github.com:japt-epj/HUNTeR-Deploy.git`

`$ cd HUNTeR-Deploy`

`# docker compose up`

You can now connect to the HUNTeR Website by navigating to [http://localhost:8080/](http://localhost:8080/). The docker configuration is optimized to be hosted behind a reverse proxy. For a detailed example of an optimal deployment, see the next section.

## Cloud
Any cloud service that supports docker-compose files perfectly supports hosting an instance of HUNTeR.

## Detailed deployment diagram of testing environment
This is how we host our testing environment of hunter, and can be used as an example of how HUNTeR can be hosted in a productive environment facing the internet. The main detail to be aware of is that our docker configuration is meant to be hosted behind a reverse proxy. The configuration doesn't support HTTPS, and we rely on a properly configured reverse proxy to supply security. Configuration within the compose network is unsecured and not meant to face the internet.

We use a Jenkins [Pipeline](https://jenkins.io/doc/book/pipeline/) build defined in the [Jenkinsfile](https://github.com/SBI-/epj-prototype/blob/master/Jenkinsfile). Every push to master triggers a build, unit and integration test cycle. Every successful build is continuously deployed as a completely clean test environment, supplied with test data. This is the deployment we use for integration testing.

![Deployment Diagram](https://github.com/SBI-/epj-prototype/raw/master/documentation/deployment_diagram.png)

### Example Apache Configuration

## Database migration

# Development

## Technology

## Architecture

### Adding new Features

### Thoughts on scalability