# Common build stage
FROM node:20-alpine as common-build-stage

COPY . ./app

WORKDIR /app

RUN yarn install

EXPOSE 3000

# Development build stage
FROM common-build-stage as development-build-stage

ENV NODE_ENV development

CMD ["yarn", "dev"]

# Production build stage
FROM common-build-stage as production-build-stage

ENV NODE_ENV production

CMD ["yarn", "start"]
