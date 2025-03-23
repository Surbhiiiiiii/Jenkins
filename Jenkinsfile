pipeline {
    agent any

    environment {
        DOCKERHUB_USER = 'surbhi800'
        DOCKERHUB_PASS = 'Surbhi123'
        IMAGE_NAME = 'surbhi800/mern-app'
        AWS_SERVER = 'ubuntu@3.10.152.219'
        SSH_KEY = '~/.ssh/jenkins-docker.pem'
    }

    stages {
        stage('Clone Repository') {
            steps {
                git branch: 'main', url: 'https://github.com/Surbhiiiiiii/Jenkins.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t $IMAGE_NAME .'
            }
        }

        stage('Login to Docker Hub') {
            steps {
                sh 'echo $DOCKERHUB_PASS | docker login -u $DOCKERHUB_USER --password-stdin'
            }
        }

        stage('Push Image to Docker Hub') {
            steps {
                sh 'docker push $IMAGE_NAME'
            }
        }

        stage('Deploy on EC2') {
            steps {
                sshagent(['ec2-key']) {
                    sh """
                    ssh -o StrictHostKeyChecking=no -i $SSH_KEY $AWS_SERVER '
                    # Stop and remove previous container
                    docker stop mern-app || true && docker rm mern-app || true
                    # Pull latest image
                    docker pull $IMAGE_NAME
                    # Run the container with proper environment variables and restart policy
                    docker run -d -p 5000:5000 --restart always --name mern-app $IMAGE_NAME
                    '
                    """
                }
            }
        }
    }
}
