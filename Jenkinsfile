pipeline {
    agent any
    stages {
        stage('Build') {
            steps {
                sh "JAVA_HOME=/usr/lib/jvm/java-8-openjdk-amd64 ./mvnw clean package -DskipTests=true"

            }
        }

        stage('Test') {
            steps {
                sh "JAVA_HOME=/usr/lib/jvm/java-8-openjdk-amd64 ./mvnw test verify"

            }
        }

    }

    post {
        always {
            junit 'target/surefire-reports/**/*.xml'
        }
    }
}
