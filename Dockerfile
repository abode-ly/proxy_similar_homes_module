RUN node:latest

RUN mkdir -p /client/dist

WORKDIR /client/dist

COPY . /client/dist

RUN npm install 

EXPOSE 3000

CMD ["npm", "start"]