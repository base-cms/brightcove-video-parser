FROM node:10.15

ENV NODE_ENV production
ENV PORT 80
ENV EXPOSED_PORT 80

WORKDIR /root
ENTRYPOINT [ "node", "src/index.js" ]

ADD ./ /root
RUN yarn --production
