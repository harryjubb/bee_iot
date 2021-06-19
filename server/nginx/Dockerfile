FROM node:16.3.0 as jsbuild

WORKDIR /build

COPY ./frontend/package.json .
RUN yarn

COPY ./frontend/ .
RUN yarn run build

FROM ghcr.io/linuxserver/swag

RUN mkdir /js_app
COPY --from=jsbuild /build/build/* /js_app
