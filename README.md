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

1. Build the UI Project:
```sh
$ cd $PROJECT_HOME/microservices/http-server
$ npm install
$ npm run build
```
1. Create Docker Machine boilerplate
```sh
$ docker-machine create -d virtualbox default
$ eval $(docker-machine env)
$ docker images
```
The last command must display a list of 0 images. If you get the following error, re-run the eval command:
```
'Cannot connect to the Docker daemon. Is the docker daemon running on this host?'
```
__NOTE:__ Remember to run the eval command everytime you open a new terminal.
1. Create base image
```sh
$ docker build -t boilerplate/base-image $PROJECT_HOME/base-image
```
1. Deploy rest of the project
```sh
$ docker-compose up -d
```
1. Connect to the running application.
To find the IP of the docker-machine, run
```sh
$ docker-machine ip
```
Open the URL in your browser to access the application: http://__DOCKER-MACHINE-IP__:8001/
Default credentials are: __admin__/__5ivel!fe__
