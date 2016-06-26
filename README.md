# MERN Microservice Boilerplate
## Includes:
- MERN
- [react-hot-boilerplate](https://github.com/gaearon/react-hot-boilerplate)
- [material-ui](http://material-ui.com)
- [Seneca](http://senecajs.org)
- [Seneca Mesh](https://github.com/rjrodger/seneca-mesh)
- JWT Authentication
- [Docker](https://docker.com)

## Deployment Dependencies
- [NodeJS](https://nodejs.org)
- For Windows: [Docker Toolbox](https://www.docker.com/products/docker-toolbox)
- For Linux: Install docker-cli, docker-machine and docker-compose

## Deployment instructions

### Step 1: Build the UI Project:
```sh
$ cd $PROJECT_HOME/microservices/http-server
$ npm install
$ npm run build
```
### Step 2: Create Docker Machine boilerplate
```sh
$ docker-machine create -d virtualbox default
$ eval $(docker-machine env)
$ docker images
```
The last command must display a list of 0 images. If you get the following error, re-run the eval command:
```
Cannot connect to the Docker daemon. Is the docker daemon running on this host?
```
__NOTE:__ Remember to run the eval command everytime you open a new terminal.

### Step 3: Create base image
```sh
$ cd $PROJECT_HOME/base-image
$ docker build -t boilerplate/base-image .
```
### Step 4: Deploy rest of the project
```sh
$ cd $PROJECT_HOME
$ docker-compose up -d
```
### Step 5: Connect to the running application.
To find the IP of the docker-machine, run
```sh
$ docker-machine ip
```
Open the URL in your browser to access the application: `http://DOCKER-MACHINE-IP:8001/`
Default credentials are: __admin__/__5ivel!fe__

## UI Development Instructions
1. Remove production flag for http-server microservice ($PROJECT_HOME/microservice/http-server/Dockerfile). This will enable CORS for all requests.
1. Deploy the docker-compose file by issuing the command `docker-compose up -d --build --remove-orphans`.
1. Provide the Docker-Machine's fully qualified ReST URI as restUrl in the file $PROJECT_HOME/microservices/http-server/common-ui/restUrl
1. Change directory to `$PROJECT_HOME/microservices/http-server`, and running the command `npm serve`.
