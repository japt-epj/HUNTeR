pipeline {
    agent any

    environment {
        JAVA_HOME = "/usr/lib/jvm/java-8-openjdk-amd64"
    }

    stages {
        stage('Build') {
            steps {
                sh "./mvnw clean package -DskipTests=true"
            }
        }

        stage('Test') {
            steps {
                sh "./mvnw test verify"
            }
        }

        stage('Docker Build') {
            steps {
                sh "sudo docker-compose -f docker/docker-compose-test.yaml build"
            }
        }
    }

    post {
        always {
            junit 'backend/target/surefire-reports/**/*.xml'
        }

        success {
            sh "sudo docker-compose -f docker/docker-compose-test.yaml down --rmi all -v"
            sh "sudo docker-compose -f docker/docker-compose-test.yaml up -d"
            // this is useless, we should publish the finished docker files...
            //archiveArtifacts artifacts: 'target/*.jar', fingerprint: true
        }
    }
}
