pipeline {
    agent any

    environment {
        DOCKERHUB_USER = 'surbhi800'
        DOCKERHUB_PASS = 'Surbhi123'
 IMAGE_BACKEND = 'surbhi800/mern-backend'
        IMAGE_FRONTEND = 'surbhi800/mern-frontend'
                AWS_SERVER = 'ubuntu@3.10.152.219'
        SSH_KEY = '~/.ssh/jenkins-docker.pem'
    }

    stages {
        stage('Clone Repository') {
            steps {
                git branch: 'main', url: 'https://github.com/Surbhiiiiiii/Jenkins.git'
            }
        }

      stage('Build Backend Docker Image') {
            steps {
                sh 'docker build -t $IMAGE_BACKEND ./backend'
            }
        }
        stage('Build Frontend Docker Image') {
            steps {
                sh 'docker build -t $IMAGE_FRONTEND ./frontend'
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

        stage('Deploy on AWS EC2') {
            steps {
                sshagent(['your-ssh-key']) {
                    sh '''
                    ssh -o StrictHostKeyChecking=no ubuntu@$EC2_INSTANCE <<EOF
                    sudo docker pull $IMAGE_BACKEND
                    sudo docker pull $IMAGE_FRONTEND
                    sudo docker stop backend frontend || true
                    sudo docker rm backend frontend || true
                    sudo docker run -d -p 5000:5000 --name backend $IMAGE_BACKEND
                    sudo docker run -d -p 80:80 --name frontend $IMAGE_FRONTEND
                    EOF
                    '''
                }
            }
        }
    }
}
