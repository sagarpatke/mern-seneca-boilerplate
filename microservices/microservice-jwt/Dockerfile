FROM boilerplate/base-image

WORKDIR /usr/src/service

COPY package.json /usr/src/service
RUN npm install --production

COPY jwt-microservice.js /usr/src/service
COPY jwt-plugin.js /usr/src/service

CMD ["npm","start","--production"]
