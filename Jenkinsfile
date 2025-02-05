pipeline {
    agent any
tools {
    nodejs 'NodeJS'
}
    environment {
        NODE_ENV = 'production'
        DOCKER_IMAGE = 'reading-tracker'
        DOCKER_REGISTRY = 'thenightmaremabbitt/reading-tracker'
        DOCKER_CREDENTIALS = credentials('docker') // Jenkins credentials ID for Docker registry
        
    }

    stages {
        stage('Checkout Code') {
            steps {
                echo 'Checking out the code...'
                checkout scm
            }
        }

        stage('Install Backend Dependencies') {
            steps {
                echo 'Installing Backend dependencies...'
                dir(path: 'backend') {
                    sh 'npm install'
                }
            }
        }

        stage('Install Frontend Dependencies') {
            steps {
                echo 'Installing Frontend dependencies...'
                dir(path: 'frontend') {
                    sh 'npm install'
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                echo 'Building Docker image...'
                sh 'docker build -t $DOCKER_IMAGE .'
            }
        }

        stage('Push Docker Image') {
            when {
                branch 'main'
            }
            steps {
                echo 'Logging in to Docker registry...'
                sh """
                    echo "$DOCKER_CREDENTIALS_PSW" | docker login -u "$DOCKER_CREDENTIALS_USR" --password-stdin
                """

                echo 'Tagging Docker image...'
                sh """
                    docker tag $DOCKER_IMAGE:latest $DOCKER_REGISTRY:latest
                """

                echo 'Pushing Docker image to registry...'
                sh """
                    docker push $DOCKER_REGISTRY:latest
                """
            }
        }

        stage('Deploy to Production') {
            when {
                branch 'main'
            }
            steps {
                withCredentials([usernamePassword(credentialsId: 'mongo-credentials', usernameVariable: 'MONGO_USER', passwordVariable: 'MONGO_PASSWORD')]) {
                    echo 'Deploying to production environment...'
                    sh """
                        MONGO_URL=mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@cluster.mongodb.net/proddb?retryWrites=true&w=majority \
                        MONGO_INITDB_ROOT_USERNAME=${MONGO_USER} \
                        MONGO_INITDB_ROOT_PASSWORD=${MONGO_PASSWORD} \
                        docker-compose -f docker-compose.prod.yml up -d
                    """
                }
            }
        }

        stage('Deploy to Development') {
            when {
                branch 'develop'
            }
            steps {
                echo 'Deploying to development environment...'
                sh 'docker-compose -f docker-compose.dev.yml up -d'
            }
        }
    }

    post {
        always {
            echo 'Cleaning up workspace...'
            cleanWs()
        }
        success {
            echo 'Build and deployment succeeded!'
        }
        failure {
            echo 'Build or deployment failed!'
        }
    }
}

