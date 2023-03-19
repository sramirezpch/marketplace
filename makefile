HARDHAT_IMAGE_NAME="hardhat-node"
HARDHAT_DOCKERFILE="./infra/.dockerfile"

COMPOSE_FILE="./docker-compose.yml"

NETWORK=localhost

run-app: 
	make clean
	docker-compose -f $(COMPOSE_FILE) up -d --build

.PHONY: clean
clean:
	docker-compose -f $(COMPOSE_FILE) down --remove-orphans

deployment:
	npx hardhat run ./scripts/deploy.ts --network $(NETWORK)

compile:
	npx hardhat compile

run-node:
	npx hardhat node