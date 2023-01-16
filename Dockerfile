FROM node:16

WORKDIR /app

RUN curl -f https://get.pnpm.io/v6.16.js | node - add --global pnpm

COPY package.json pnpm-lock.yaml /app/

RUN pnpm install && \
    rm -rf /tmp/* /var/tmp/*

COPY ./docker-utils/entrypoint/docker-entrypoint.sh /usr/local/bin/docker-entrypoint.sh

COPY . /app

RUN pnpm build

EXPOSE 3000

USER node

ENV TYPEORM_MIGRATION=ENABLE
ENV NPM_INSTALL=DISABLE
CMD pnpm start:prod