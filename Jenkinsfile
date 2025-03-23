pipeline {
    agent any

    environment {
        IMAGE_NAME = "surbhi800/mern-app"  // Apna DockerHub repo name likh
    }

    stages {
stage('Clone Repository') {
    steps {
        script {
            withCredentials([usernamePassword(credentialsId: 'github-credentials', usernameVariable: 'GIT_USER', passwordVariable: 'GIT_PASS')]) {
                sh "git clone https://$GIT_USER:$GIT_PASS@github.com/Surbhiiiiiii/Jenkins.git"
            }
        }
    }
}


        stage('Login to DockerHub') {
            steps {
                script {
                    withCredentials([usernamePassword(credentialsId: 'dockerhub-credentials', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                        sh "docker login -u $DOCKER_USER -p $DOCKER_PASS"
                    }
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                sh "docker build -t $IMAGE_NAME ."
            }
        }

        stage('Push to DockerHub') {
            steps {
                sh "docker push $IMAGE_NAME"
            }
        }

        stage('Deploy on EC2') {
            steps {
                sshagent(['ec2-ssh-key']) {
                    sh """
                        ssh -o StrictHostKeyChecking=no ubuntu@13.40.133.141 <<EOF
                        docker pull $IMAGE_NAME
                        docker stop mern-app || true
                        docker rm mern-app || true
                        docker run -d -p 5000:5000 --name mern-app $IMAGE_NAME
                        EOF
                    """
                }
            }
        }
    }
}
