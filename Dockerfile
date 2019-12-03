# Stage 1 - the build process
FROM node:10 as build-client
WORKDIR /usr/src/app
COPY client/package.json client/package-lock.json ./
RUN npm install
COPY client/. ./
RUN npm run build

FROM node:10 as api-server
WORKDIR /home/node/app
COPY . .
RUN npm install
RUN mkdir client
COPY --from=build-client /usr/src/app/build ./client
EXPOSE 8080

USER node
CMD ["npm", "start"]
