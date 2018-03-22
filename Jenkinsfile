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

        stage('Docker Build') {
            steps {
                sh "sudo docker-compose -f docker/docker-compose-prod.yaml build"

            }
        }

        stage('Compose up') {
            steps {
                sh "sudo docker-compose -f docker/docker-compose-prod.yaml up -d"

            }
        }
    }

    post {
        always {
            junit 'target/surefire-reports/**/*.xml'
        }
    }
}
