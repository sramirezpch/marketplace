FROM node:16-alpine

WORKDIR /app

COPY package*.json .

RUN npm install

COPY . .

EXPOSE 8545

CMD npx hardhat node