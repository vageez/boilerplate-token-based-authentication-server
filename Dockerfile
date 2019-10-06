# Working
FROM node:alpine
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
EXPOSE 3090
CMD ["npm", "run", "dev"]