pipeline {
    agent any

    tools {
        nodejs:'node'
    }

    stages('checkout') {
        stage {
            steps {
                git branch: 'main', credentialsId: 'git-password', url: 'https://github.com/Saikumar2517/musicplayer.git'
            }
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
                withSonarQubeEnv(credentialsId: 'sonar') {
                }
            }
        }
    }
}
