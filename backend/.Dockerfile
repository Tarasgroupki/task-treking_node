FROM node:12-alpine

ARG APP_DIR=app
RUN mkdir -p ${APP_DIR}
WORKDIR ${APP_DIR}

COPY package*.json ./
RUN npm cache clean -f
RUN apk add --no-cache --virtual .build-deps alpine-sdk python \
 && npm install \
 && npm audit fix \
 && npm rebuild bcrypt --build-from-source \
 && apk del .build-deps

COPY . .

EXPOSE 2700

CMD ["npm", "start"]