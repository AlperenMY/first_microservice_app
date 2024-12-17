FROM node:alpine

WORKDIR /app/blog/posts

COPY package.json ./
RUN npm install
RUN npm install -g nodemon
COPY ./ ./

CMD [ "npm", "start" ]