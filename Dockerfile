FROM node:alpine

ARG MAP_BOX_API_KEY
ARG GIT_TOKEN

ENV MAP_BOX_API_KEY=$MAP_BOX_API_KEY
ENV GIT_TOKEN=$GIT_TOKEN
ENV NODE_ENV=production

WORKDIR /app

COPY package*.json ./

RUN npm install --ignore-scripts --legacy-peer-deps

COPY src/ ./src/
COPY public ./public/
COPY components ./components/
COPY config.json .
COPY tsconfig.json .
COPY next.config.mjs .

RUN npm run build --legacy-peer-deps

EXPOSE 9000

CMD ["npm", "run", "start"]

