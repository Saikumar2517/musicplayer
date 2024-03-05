pipeline {
    agent any

    tools {
        nodejs 'node'
          sonarqube 'sonar'
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
    stage('Run SonarQube Analysis') {
        steps {
            script {
               sonar-scanner \
  -Dsonar.projectKey=musicplayer \
  -Dsonar.sources= /home/saikumar/musicplayer
    -Dsonar.host.url=http://localhost:9000 \c
  -Dsonar.login=e3219738caba13460e93fcc0886ce1d24713c8c2
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

