pipeline {
    agent any
    environment {
        DOCKER_REGISTRY = 'saidocker999/musicplayer'
    }
    tools {
        dockerTool 'docker'
        tool name: 'sonar-scanner', type: 'hudson.plugins.sonar.SonarRunnerInstallation'
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

                stage('SonarQube Analysis') {
            steps {
                script {
                    def sonarScanner = tool name: 'sonar-scanner', type: 'hudson.plugins.sonar.SonarRunnerInstallation'
                    withSonarQubeEnv(credentialsId: 'sonar-token') {
                        sh "${sonarScanner}/bin/sonar-scanner -Dsonar.projectKey=music-player"
                    }
                }
            }
                }
    }
}
