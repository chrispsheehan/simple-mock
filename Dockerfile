FROM node:16

ARG _HTTPS_MODE
ARG _MOCK_REFERENCE

ENV HTTPS_MODE=${_HTTPS_MODE}
ENV MOCK_REFERENCE=${_MOCK_REFERENCE}

ENV STATE_FILE=/state.json

WORKDIR /dist

COPY ./package.json /package.json
COPY ./dist /dist

RUN yarn

ENTRYPOINT [ "node", "index.js" ]