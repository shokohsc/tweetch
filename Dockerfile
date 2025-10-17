# build stage
FROM node:lts-alpine as build-stage
WORKDIR /app
COPY package*.json ./
RUN apk add --no-cache bash && \
    npm install
COPY . .
RUN npm run build

# production stage
FROM nginx:stable
COPY ./start-nginx.sh /usr/bin/start-nginx.sh
COPY ./default.conf /etc/nginx/conf.d/default.conf
RUN chmod +x /usr/bin/start-nginx.sh
WORKDIR /usr/share/nginx/html
COPY --from=build-stage /app/dist .
ENTRYPOINT [ "start-nginx.sh" ]
