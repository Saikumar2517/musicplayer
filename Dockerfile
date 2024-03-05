FROM node:15.1.0-alpine


WORKDIR /home/saikumar/musicplayer


COPY package*.json ./

RUN npm ci

COPY . .

EXPOSE 3000

CMD [ "npm", "start" ]
