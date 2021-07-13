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

        KEYCLOAK_CLIENT_ID = "odh-databrowser"
        KEYCLOAK_AUTHORIZATION_URI = "https://auth.opendatahub.testingmachine.eu/auth/realms/noi/protocol/openid-connect/auth"
        KEYCLOAK_TOKEN_URI = "https://auth.opendatahub.testingmachine.eu/auth/realms/noi/protocol/openid-connect/token"
        KEYCLOAK_USERINFO_URI = "https://auth.opendatahub.testingmachine.eu/auth/realms/noi/protocol/openid-connect/userinfo"
        KEYCLOAK_LOGOUT_URI = "https://auth.opendatahub.testingmachine.eu/auth/realms/noi/protocol/openid-connect/logout?redirect_uri=http://localhost:3000"
    }

    stages {
        stage('Dependencies') {
            steps {
                sh 'yarn install'
            }
        }
        stage('Test') {
            steps {
                sh 'yarn run test'
            }
        }
        stage('Build') {
            steps {
                sh 'yarn run generate'
            }
        }
        stage('Upload') {
            steps {
                s3Upload(bucket: 'databrowser-app-test', acl: 'PublicRead', file: './dist')
            }
        }
    }
}