pipeline {
    agent any

    tools {
        nodejs 'node'
    // tool name: 'sonar-scanner', type: 'hudson.plugins.sonar.SonarRunnerInstallation'
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', credentialsId: 'git-password', url: 'https://github.com/Saikumar2517/musicplayer.git'
            }
        }
        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }
        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }

        stage('SonarQube Analysis') {
            steps {
                script {
                    def sonarScanner = tool name: 'sonar-scanner', type: 'hudson.plugins.sonar.SonarRunnerInstallation'
                    withSonarQubeEnv(credentialsId: 'sonar') {
                        sh "${sonarScanner}/bin/sonar-scanner -Dsonar.projectKey=sonar-music-player \
                                            -Dsonar.sources=. \
                                            -Dsonar.host.url=http://localhost:9000 \
                                            -Dsonar.login=f68a023e29dfb8a603510738d35652fc62e4fe92"
                    }
                }
            }
        }
    }

    post {
        success {
            echo 'Pipeline succeeded!'
        }
        failure {
            echo 'Pipeline failed!'
        }
    }
}

