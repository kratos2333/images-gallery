FROM node:17.3-alpine

WORKDIR /app

EXPOSE 3006

COPY package-lock.json package.json ./

RUN npm install --slient

COPY . ./

CMD ["npm", "start"]