FROM node:16-alpine

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile

COPY . .

RUN yarn build

ENV PORT 3000

EXPOSE 3000

CMD ["yarn", "start"]
