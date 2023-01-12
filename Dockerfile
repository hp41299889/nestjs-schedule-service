FROM node:16.16.0
WORKDIR /app
COPY . ./
RUN [ "npm", "install", "--omit=dev" ]
CMD [ "npm", "run", "start:nodemon" ]