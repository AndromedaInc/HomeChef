# FROM will declare Node as our runtime system; would like to use alpine-node when ready to create an image ~1/10th the size but get a bycrypt-related error when doing so
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

# NOTE: DELETE 'postinstall from package.json' before issuing Docker build command in terminal or will error out