FROM node:10 as api-server
WORKDIR /home/node/app
COPY . .
RUN npm install

EXPOSE 8080

USER node
CMD ["npm", "start"]

# Stage 1 - the build process
FROM node:10 as build-deps
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm ci
COPY . ./
RUN npm run build

# Stage 2 - the production environment
FROM nginx:1.12-alpine
COPY --from=build-deps /usr/src/app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
