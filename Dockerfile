# FROM will declare Node as our runtime system; will want to use alpine-node when ready for leaner container
FROM node:8
# WORKDIR will set the working directory location within the image
WORKDIR /HomeChef
# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied where available (npm@5+)
COPY package*.json ./

RUN npm install --only=production

# Bundle app source
COPY . .

EXPOSE 5678
CMD [ "npm", "start" ]