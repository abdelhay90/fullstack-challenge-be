FROM node:10.17 as native-build
WORKDIR /home/node/app
COPY . .
RUN npm install

EXPOSE 8080

USER node
CMD ["npm", "run seed:all"]
CMD ["npm", "start"]
