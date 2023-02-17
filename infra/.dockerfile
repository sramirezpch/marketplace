FROM node:16-alpine

WORKDIR /app

COPY . .

CMD npx hardhat node