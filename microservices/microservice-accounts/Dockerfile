FROM boilerplate/base-image

WORKDIR /usr/src/service

COPY package.json /usr/src/service
RUN npm install --production

COPY account-microservice.js /usr/src/service
COPY account-plugin.js /usr/src/service
COPY account.schema.js /usr/src/service

CMD ["npm","start","--production"]
