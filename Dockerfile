# build stage
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install && npm cache clean --force
COPY . .
RUN npm run build

FROM scratch
COPY --from=build /app/dist /