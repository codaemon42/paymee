
# Let's get the base image of node14
FROM node:14
# Create app directory
WORKDIR /usr/src/app
# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./
# Install app dependencies
RUN npm install
# Bundle app source
COPY . .
# Binding port
EXPOSE 3000
# Command to run our app
CMD [ "node", "app.js"]