FROM boilerplate/base-image

WORKDIR /usr/src/service

COPY package.json /usr/src/service
RUN npm install --production

COPY mesh-base.js /usr/src/service
CMD ["npm", "start", "--production"]
