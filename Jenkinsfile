pipeline {
    agent any

    environment {
        AWS_REGION = 'ap-south-1'
        S3_BUCKET = 'track-activity-ui-dhiraj'
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                bat 'npm ci'
            }
        }

        stage('Build UI') {
            steps {
                bat 'npm run build'
            }
        }

        stage('Deploy to S3') {
            steps {
                withCredentials([
                    string(credentialsId: 'AWS_ACCESS_KEY_ID',
                           variable: 'AWS_ACCESS_KEY_ID'),
                    string(credentialsId: 'AWS_SECRET_ACCESS_KEY',
                           variable: 'AWS_SECRET_ACCESS_KEY')
                ]) {
                    bat '''
                    aws s3 sync dist/ s3://%S3_BUCKET% --delete --region %AWS_REGION%
                    '''
                }
            }
        }
    }
}