# hackaton

# Get Started
install node.js : https://nodejs.org/en/
install node CLI : 

npm install -g @angular/cli

go to the project and check if angular is well installed

ng -h

install libs

npm install


# Backend
## build backend
If it doesn't exist, create directory backend/api/api-web/src/main/resources/META-INF
cd backend
mvn clean install

## docker - build all
docker-compose up -d

## docker - rebuild api only
docker-compose up -d --build api

## test
http://localhost:8080/hackathon/test
