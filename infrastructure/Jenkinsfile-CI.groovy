pipeline {
    agent {
        dockerfile {
            filename 'infrastructure/docker/dockerfile-node'
            additionalBuildArgs '--build-arg JENKINS_USER_ID=`id -u jenkins` --build-arg JENKINS_GROUP_ID=`id -g jenkins`'
        }
    }

    stages {
        stage('Dependencies') {
            steps {
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
    }
}
