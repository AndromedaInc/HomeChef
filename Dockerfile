# FROM will declare Node as our runtime system
FROM node:8
# WORKDIR will set the working directory location within the image
WORKDIR /HomeChef
# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied where available (npm@5+)
COPY package*.json ./

RUN npm install

ENV DB_HOST=us-cdbr-gcp-east-01.cleardb.net \
    DB_USER=be489e42e91434 \
    DB_PASS=0465991d \
    DB_DATABASE=gcp_2fe7b1ac85cbef2a25af

# Bundle app source
COPY . .

RUN npm run build

EXPOSE 5678
CMD [ "npm", "start" ]