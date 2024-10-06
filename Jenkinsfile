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
                    // Delete the container if it exists
                    sh 'docker rm -f apt-billing-ui || true'

                    // Delete the image if it exists
                    sh 'docker rmi apt-billing-ui || true'

                    // Prune all stopped containers
                    sh 'docker container prune -f'

                    // Prune unused images
                    sh 'docker image prune -a -f'

                    // Build the Docker image
                    def app = docker.build("apt-billing-ui:latest")

                    // Run the container with the restart policy
                    app.run('-p 3000:3000 --restart always --name apt-billing-ui')
                }

            }
        }
    }
}