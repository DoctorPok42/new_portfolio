FROM node:alpine

ARG MAP_BOX_API_KEY

ENV MAP_BOX_API_KEY=$MAP_BOX_API_KEY
ENV NODE_ENV=production

WORKDIR /app

COPY package*.json ./

RUN npm install --ignore-scripts --legacy-peer-deps

COPY src/ ./src/
COPY public ./public/
COPY components ./components/
COPY tsconfig.json .
COPY next.config.mjs .

RUN npm run build --legacy-peer-deps

EXPOSE 6000

CMD ["npm", "run", "start"]

