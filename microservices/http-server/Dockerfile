FROM boilerplate/base-image

WORKDIR /usr/src/service

COPY package.json /usr/src/service
RUN npm install --production

COPY bin/www /usr/src/service/bin/
COPY common-ui/index.html /usr/src/service/common-ui/
COPY common-ui/bower_components /usr/src/service/common-ui/bower_components/
COPY common-ui/styles /usr/src/service/common-ui/styles/
COPY common-ui/static /usr/src/service/common-ui/static/
COPY rest-server /usr/src/service/rest-server/

# Use --production flag for production. To enable CORS during development, ensure that the --production flag is removed, and make sure to set the NODE_ENV environment variable to 'dev' in the docker-compose.yml file.
CMD ["npm","start","--production"]
