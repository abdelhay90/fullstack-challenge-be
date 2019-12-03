FROM node:10 as api-server
WORKDIR /home/node/app
COPY . .
RUN npm install

EXPOSE 8080

USER node
CMD ["npm", "start"]
