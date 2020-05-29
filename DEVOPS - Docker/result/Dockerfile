FROM node:8.9-alpine
WORKDIR "/home/node/app"
COPY ./package.json .
RUN npm install
COPY . .
EXPOSE 80
CMD ["npm", "start"]
