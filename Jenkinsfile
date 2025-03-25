pipeline {
    agent any

    environment {
        DOCKERHUB_USER = 'surbhi800'
        DOCKERHUB_PASS = 'Surbhi123'
        IMAGE_BACKEND = 'surbhi800/mern-backend'
        IMAGE_FRONTEND = 'surbhi800/mern-frontend'
        AWS_SERVER = 'ubuntu@18.144.65.67'
        SSH_KEY = '~/.ssh/docker.pem'
    }

    stages {
        stage('Clone Repository') {
            steps {
                git branch: 'main', url: 'https://github.com/Surbhiiiiiii/Jenkins.git'
            }
        }

        stage('Build Backend Docker Image') {
            steps {
                sh 'docker build -t $IMAGE_BACKEND:latest ./backend'
            }
        }

        stage('Build Frontend Docker Image') {
            steps {
                sh 'docker build -t $IMAGE_FRONTEND:latest ./frontend'
            }
        }

        stage('Login to Docker Hub') {
            steps {
                sh 'echo $DOCKERHUB_PASS | docker login -u $DOCKERHUB_USER --password-stdin'
            }
        }

        stage('Push Images to Docker Hub') {
            steps {
                sh 'docker push $IMAGE_BACKEND:latest'
                sh 'docker push $IMAGE_FRONTEND:latest'
            }
        }

        stage('Deploy on AWS EC2') {
            steps {
                sshagent(credentials: ['jenkins-ssh-key']) {
                    sh '''
                    ssh -o StrictHostKeyChecking=no $AWS_SERVER <<EOF
                    sudo docker pull $IMAGE_BACKEND:latest
                    sudo docker pull $IMAGE_FRONTEND:latest
                    sudo docker stop backend frontend || true
                    sudo docker rm backend frontend || true
                    sudo docker run -d -p 5000:5000 --name backend $IMAGE_BACKEND:latest
                    sudo docker run -d -p 3000:3000 --name frontend $IMAGE_FRONTEND:latest
                    EOF
                    '''
                }
            }
        }
    }
}
