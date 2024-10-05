pipeline {
    agent any
    stages {
        stage('Checkout') {
            steps {
                script {
                    withCredentials([usernamePassword(credentialsId: 'github-cradential', usernameVariable: 'GIT_USERNAME', passwordVariable: 'GIT_PASSWORD')]) {
                        sh """
                            #!/bin/bash
                            
                            if [ -d ".git" ]; then
                                git checkout ${env.BRANCH_NAME}
                                git pull https://$GIT_USERNAME:$GIT_PASSWORD@github.com/subhankar2028/apartment-billing-management-UI.git ${env.BRANCH_NAME}
                            else
                                git clone -b ${env.BRANCH_NAME} https://$GIT_USERNAME:$GIT_PASSWORD@github.com/subhankar2028/apartment-billing-management-UI.git .
                            fi
                        """
                    }
                }
                script {
                    sh 'docker rm -f apt-billing-ui || true'
                    def app = docker.build("apt-billing-ui:latest")
                    app.run('-p 3000:3000 --name apt-billing-ui')
                }
            }
        }
    }
}