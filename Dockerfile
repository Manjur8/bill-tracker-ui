FROM node:18-alpine
# FROM node:18.17.0
# FROM node:18-slim
# FROM node:18-alpine3.19
WORKDIR /usr/src/app
# COPY public public
# COPY src src
# COPY .env.local ./
COPY package*.json ./
# COPY next.config.mjs tsconfig.json .eslintrc.json ./

COPY . .

# RUN npm install
RUN npm ci
RUN npm run build
# COPY . .
EXPOSE 3000
CMD ["npm", "run", "dev", "--", "-H", "0.0.0.0", "-p", "3000"]
