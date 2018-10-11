# FROM will declare Node as our runtime system
FROM node:8
# WORKDIR will set the working directory location within the image
WORKDIR /usr/src/app
# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied where available (npm@5+)
COPY package*.json ./

RUN npm install

# Bundle app source
COPY . .


RUN npm run start

EXPOSE 5678
CMD [ "npm", "start" ]