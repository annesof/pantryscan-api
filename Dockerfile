FROM node:18 As development

WORKDIR /usr/src/app

RUN curl -f https://get.pnpm.io/v6.16.js | node - add --global pnpm

COPY --chown=node:node package.json pnpm-lock.yaml ./

RUN pnpm i 
#&& \
#    rm -rf /tmp/* /var/tmp/*

#COPY ./docker-utils/entrypoint/docker-entrypoint.sh /usr/local/bin/docker-entrypoint.sh

COPY --chown=node:node . .

RUN pnpm run build

EXPOSE 3000

USER node

ENV TYPEORM_MIGRATION=DISABLE
ENV NPM_INSTALL=DISABLE
CMD pnpm start:prod