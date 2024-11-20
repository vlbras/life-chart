# build stage
FROM node:18-alpine AS build
WORKDIR /usr/src/app
COPY package*.json pnpm-lock.yaml ./
RUN npm install -g pnpm
RUN pnpm install
COPY . .
RUN pnpm build

# prod stage
FROM node:18-alpine AS prod
WORKDIR /usr/src/app
COPY package*.json pnpm-lock.yaml ./
COPY --from=build /usr/src/app/dist ./dist
RUN npm install -g pnpm
RUN pnpm install -P
COPY .env.prod .env
RUN rm package*.json pnpm-lock.yaml 
EXPOSE 3000
CMD ["node", "dist/main.js"]