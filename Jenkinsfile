pipeline {
    agent any
    environment {
        DOCKER_REGISTRY = 'saidocker999/musicplayer'
    }
    tools {
        dockerTool 'docker'
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
                    def sonarScanner = tool name:'sonar-scanner', type: 'hudson.plugins.sonar.SonarRunnerInstallation'
                    withSonarQubeEnv(credentialsId: 'sonar-password') {
                        sh "${sonarScanner}/bin/sonar-scanner -Dsonar.projectKey=music-player"
                    }
                }
            }
        }
        stage('Deploy') {
            steps {
                script {
                    sshPublisher(publishers: [sshPublisherDesc(configName: 'aws-server', transfers: [sshTransfer(cleanRemote: false, excludes: '', execCommand: "docker pull ${DOCKER_REGISTRY}:${env.BUILD_ID} && docker container rm -f music_player && docker run --name music_player -p 3000:3000 -d ${DOCKER_REGISTRY}:${env.BUILD_ID} ", execTimeout: 120000, flatten: false, makeEmptyDirs: false, noDefaultExcludes: false, patternSeparator: '[, ]+', remoteDirectory: '', remoteDirectorySDF: false, removePrefix: '', sourceFiles: '')], usePromotionTimestamp: false, useWorkspaceInPromotion: false, verbose: false)])
                }
            }
        }
    }
}
