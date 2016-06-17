FROM mhart/alpine-node

RUN mkdir -p /usr/src/service
WORKDIR /usr/src/service

RUN apk update
RUN apk add python build-base
RUN npm install -g seneca seneca-balance-client seneca-mesh
