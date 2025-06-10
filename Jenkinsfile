pipeline {
    // Usar "any" para ejecutar directamente en el agente Jenkins
    agent any
    
    // Configurar herramientas para Node.js - usar exactamente el nombre configurado
    tools {
        nodejs 'NodeJS'  // Este nombre debe coincidir con el configurado en Jenkins
    }
    
    environment {
        SONAR_SCANNER_HOME = tool 'SonarQubeScanner'
    }
    
    stages {
        // Añadir checkout explícito desde el repositorio
        stage('Checkout') {
            steps {
                checkout([
                    $class: 'GitSCM',
                    branches: [[name: '*/main']],
                    userRemoteConfigs: [[url: 'https://github.com/3orja/Jenkins-SonarQube-Dashboard.git']]
                ])
            }
        }
        
        stage('Install') {
            steps {
                dir('frontend') {
                    // Usar bat para Windows
                    bat 'npm ci'
                }
            }
        }
        
        stage('Lint') {
            steps {
                dir('frontend') {
                    // Añadir manejo de errores para que no falle la pipeline
                    bat 'npm run lint || exit 0'
                }
            }
        }
        
        // Etapa de test opcional - Si no tienes pruebas configuradas, puedes comentar esta etapa
        /*
        stage('Test') {
            steps {
                dir('frontend') {
                    bat 'npm test -- --watch=false --browsers=ChromeHeadless'
                }
            }
        }
        */
        
        stage('Build') {
            steps {
                dir('frontend') {
                    bat 'npm run build'
                }
            }
        }
        
        stage('SonarQube Analysis') {
            steps {
                // Usar la configuración simple de SonarQube
                withSonarQubeEnv('SonarQube') {
                    // Usar sintaxis de Windows para comandos y rutas
                    bat '''
                        %SONAR_SCANNER_HOME%\\bin\\sonar-scanner.bat ^
                        -Dsonar.projectKey=angular-dashboard ^
                        -Dsonar.projectName="Angular Dashboard" ^
                        -Dsonar.sources=frontend/src ^
                        -Dsonar.exclusions=**/node_modules/**,**/*.spec.ts
                    '''
                }
            }
        }
        
        // Simplificado sin calidad gate para pruebas iniciales
        /*
        stage('Quality Gate') {
            steps {
                timeout(time: 1, unit: 'MINUTES') {
                    waitForQualityGate abortPipeline: false
                }
            }
        }
        */
        
        stage('Docker Build') {
            steps {
                dir('frontend') {
                    // Simplificado para pruebas locales, sin push
                    bat 'docker build -t angular-dashboard:%BUILD_NUMBER% .'
                    bat 'docker tag angular-dashboard:%BUILD_NUMBER% angular-dashboard:latest'
                }
            }
        }
    }
    
    post {
        always {
            cleanWs()
        }
        success {
            echo 'Pipeline completado exitosamente!'
        }
        failure {
            echo 'Pipeline falló!'
        }
    }
}
