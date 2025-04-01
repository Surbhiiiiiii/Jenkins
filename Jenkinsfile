pipeline {
    agent any
    environment {
        DOCKERHUB_CREDENTIALS = credentials('dockerhub-credentials')
    }
    stages {
        stage('Clone Repository') {
            steps {
                git 'https://github.com/Surbhiiiiiii/Jenkins.git'
            }
        }
        stage('Build & Push Docker Images') {
            steps {
                sh '''
                docker build -t surbhi800/mern-backend:latest ./backend
                docker build -t surbhi800/mern-frontend:latest ./frontend
                docker build -t surbhi800/mern-mongodb:latest ./mongodb
                
                echo $DOCKERHUB_CREDENTIALS | docker login -u "surbhi800" --password-stdin
                docker push surbhi800/mern-backend:latest
                docker push surbhi800/mern-frontend:latest
                docker push surbhi800/mern-mongodb:latest
                '''
            }
        }
        stage('Deploy on AWS EC2') {
            steps {
                sshagent(['ec2-key']) {
                    sh '''
                    ssh -o StrictHostKeyChecking=no ubuntu@35.87.34.201 <<EOF
                    docker pull surbhi800/mern-backend:latest
                    docker pull surbhi800/mern-frontend:latest
                    docker pull surbhi800/mern-mongodb:latest

                    cd /home/ubuntu
                    cat > docker-compose.yml <<EOL
                    version: '3.8'

                    services:
                      mongo:
                        image: surbhi800/mern-mongodb:latest
                        container_name: mongo
                        ports:
                          - '27017:27017'
                        volumes:
                          - mongodb_data:/data/db
                        networks:
                          - mern_network

                      backend:
                        image: surbhi800/mern-backend:latest
                        container_name: backend
                        ports:
                          - '5000:5000'
                        depends_on:
                          - mongo
                        networks:
                          - mern_network
                        environment:
                          - MONGO_URI=mongodb://mongo:27017/mydatabase

                      frontend:
                        image: surbhi800/mern-frontend:latest
                        container_name: frontend
                        ports:
                          - '80:80'
                        depends_on:
                          - backend
                        networks:
                          - mern_network

                    networks:
                      mern_network:
                        driver: bridge

                    volumes:
                      mongodb_data:
                    EOL

                    docker-compose down
                    docker-compose up -d
                    EOF
                    '''
                }
            }
        }
    }
}
