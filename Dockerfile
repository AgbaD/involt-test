# Production
FROM node:16 AS production

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma/

RUN npm install

COPY . .

RUN npm run build

FROM node:16

COPY --from=production /app/node_modules ./node_modules
COPY --from=production /app/package*.json ./
COPY --from=production /app/dist ./dist

EXPOSE 5500
CMD [ "npm", "run", "start:prod" ]
