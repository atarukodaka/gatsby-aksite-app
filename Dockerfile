FROM node

EXPOSE 8000
WORKDIR /home/node/app
ENV HOME /home/node/app

RUN npm i -g npm \
    && npm i -g gatsby-cli
