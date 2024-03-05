pipeline {
    agent any
    environment {
        DOCKER_REGISTRY = "saidocker999/musicplayer"
    }
    stages {
        stage('Docker Build') {
            steps {
                script {
                    docker.withRegistry('https://index.docker.io/v1/', 'docker-password') {

                            def customImage = docker.build("${DOCKER_REGISTRY}:${env.BUILD_ID}")

                            /* Push the container to the custom Registry */
                            customImage.push()
                        }
                }
            }
        }
    }
}
