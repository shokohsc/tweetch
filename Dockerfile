# build stage
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install && npm cache clean --force
COPY . .

# Vite inlines VITE_* at build time; there is no runtime env in a static image.
# ponytail: values persist in build-stage layer metadata (docker history) and in
# the shipped bundle. Acceptable for the client id (public by design); swap to
# authorization-code + PKCE to drop the secret entirely.
ARG VITE_TWITCH_CLIENT_ID
ARG VITE_TWITCH_CLIENT_SECRET
ENV VITE_TWITCH_CLIENT_ID=$VITE_TWITCH_CLIENT_ID
ENV VITE_TWITCH_CLIENT_SECRET=$VITE_TWITCH_CLIENT_SECRET

RUN npm run build

FROM scratch
COPY --from=build /app/dist /