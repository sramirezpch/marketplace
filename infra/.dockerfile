FROM node:16-alpine

WORKDIR /app

COPY . .

EXPOSE 8545

CMD npx hardhat node