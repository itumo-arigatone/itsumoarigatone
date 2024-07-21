FROM node:20.2-alpine AS build

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:20.2-alpine AS production

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --production
COPY --from=build /app/.next ./.next

EXPOSE 3000
USER node
CMD ["npm", "start"]