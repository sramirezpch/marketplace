MARKETPLACE_IMAGE_NAME="marketplace-client"
MARKETPLACE_DOCKERFILE_DEV="./infra/.dockerfile-dev"
HARDHAT_IMAGE_NAME="hardhat-node"
HARDHAT_DOCKERFILE="./infra/.dockerfile"

COMPOSE_FILE="./docker-compose.yml"

CLIENT_LOCAL_URL="http://localhost:3000"

run-app: clean
	docker-compose -f $(COMPOSE_FILE) up -d --build

.PHONY: clean
clean:
	docker-compose -f $(COMPOSE_FILE) down --remove-orphans

open-browser:
ifeq ($(OS), Windows_NT)
	start "$(CLIENT_LOCAL_URL)"
else
	open $(CLIENT_LOCAL_URL)
endif
