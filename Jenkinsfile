pipeline {
    agent any

    tools{
        nodejs 'node'
      SonarQube scanner 'sonar'
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
                    sh '''\
            sonar-scanner \
              -Dsonar.projectKey=music-player \
              -Dsonar.sources=. /home/saikumar/musicplayer\
              -Dsonar.host.url=http://localhost:9000 \
              -Dsonar.login=922db5feb5b3895a1b185e4bbd3062e8b563f9b4
            '''
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

