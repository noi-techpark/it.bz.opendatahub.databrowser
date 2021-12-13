pipeline {
    agent {
        dockerfile {
            filename 'infrastructure/docker/dockerfile-node'
            additionalBuildArgs '--build-arg JENKINS_USER_ID=`id -u jenkins` --build-arg JENKINS_GROUP_ID=`id -g jenkins`'
        }
    }

    environment {
        AWS_ACCESS_KEY_ID = credentials('AWS_ACCESS_KEY_ID')
        AWS_SECRET_ACCESS_KEY = credentials('AWS_SECRET_ACCESS_KEY')
    }

    stages {
        stage('Dependencies') {
            steps {
                sh 'npm ci'
                sh 'npm run bootstrap'
            }
        }
        stage('Test') {
            steps {
                sh 'cd databrowser && npm run lint'
                sh 'cd databrowser && npm run test'
            }
        }
        stage('Build') {
            steps {
                sh 'cd databrowser && npm run build'
            }
        }
        stage('Upload') {
            steps {
                s3Upload(bucket: 'it.bz.opendatahub.databrowser-prod', acl: 'PublicRead', file: './databrowser/dist')
            }
        }
    }
}
