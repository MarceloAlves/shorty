FROM node:alpine

WORKDIR /app

COPY ./ ./prisma

CMD ["npx", "-y", "prisma", "migrate", "deploy"]
