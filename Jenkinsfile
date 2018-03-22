pipeline {
    agent any
    stages {
        stage('Build') {
            steps {
                sh "JAVA_HOME=/usr/lib/jvm/java-8-openjdk-amd64 ./mvnw clean install"

            }
        }

    }
}
