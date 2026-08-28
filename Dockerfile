FROM node:alpine

ARG MAP_BOX_API_KEY
ARG GIT_TOKEN

ENV MAP_BOX_API_KEY=$MAP_BOX_API_KEY
ENV GIT_TOKEN=$GIT_TOKEN
ENV NODE_ENV=production

WORKDIR /app

COPY package*.json ./

RUN npx npm install --force --ignore-scripts

COPY src/ ./src/
COPY public ./public/
COPY components ./components/
COPY config.json .
COPY tsconfig.json .
COPY next.config.mjs .

RUN npx npm run build --force --ignore-scripts

EXPOSE 9000

CMD ["npx", "npm", "start", "--ignore-scripts"]
