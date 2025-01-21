pipeline {
  agent any
  stages {
    stage('Checkout Code') {
      steps {
        echo 'Checking out the code...'
        checkout scm
      }
    }

    stage('Install Dependencies') {
      steps {
        echo 'Installing Node.js dependencies...'
        sh 'npm install'
        npm install
      }
    }

    stage('Run Tests') {
      steps {
        echo 'Running unit tests...'
        sh 'npm test'
      }
    }

    stage('Lint Code') {
      steps {
        echo 'Linting the code...'
        sh 'npm run lint'
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
        echo 'Pushing Docker image to registry...'
        sh """
                                                            echo "$DOCKER_REGISTRY_PASSWORD" | docker login -u "$DOCKER_REGISTRY_USERNAME" --password-stdin
                                                            docker tag $DOCKER_IMAGE:latest $DOCKER_REGISTRY/$DOCKER_IMAGE:latest
                                                            docker push $DOCKER_REGISTRY/$DOCKER_IMAGE:latest
                                                        """
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

    stage('Deploy to Production') {
      when {
        branch 'main'
      }
      steps {
        echo 'Deploying to production environment...'
        sh 'docker-compose -f docker-compose.prod.yml up -d'
      }
    }

  }
  environment {
    NODE_ENV = 'production'
    DOCKER_IMAGE = 'reading-tracker'
    DOCKER_REGISTRY = 'your-docker-registry'
  }
  post {
    always {
      echo 'Cleaning up workspace...'
      cleanWs()
    }

    success {
      echo 'Build succeeded!'
    }

    failure {
      echo 'Build failed!'
    }

  }
}
