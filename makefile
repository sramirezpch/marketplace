MARKETPLACE_IMAGE_NAME="marketplace-client"
MARKETPLACE_DOCKERFILE_DEV="./infra/.dockerfile-dev"
HARDHAT_IMAGE_NAME="hardhat-node"
HARDHAT_DOCKERFILE="./infra/.dockerfile"

COMPOSE_FILE="./docker/compose.yml"

CLIENT_LOCAL_URL="http://localhost:3000"

build-marketplace:
	cd marketplace && docker build -t $(MARKETPLACE_IMAGE_NAME) -f $(MARKETPLACE_DOCKERFILE_DEV) . --no-cache

build-hardhat:
	docker build -t $(HARDHAT_IMAGE_NAME) -f $(HARDHAT_DOCKERFILE) . --no-cache

run-app: clean
	docker-compose -f $(COMPOSE_FILE) build node
	docker-compose -f $(COMPOSE_FILE) build client
	docker-compose -f $(COMPOSE_FILE) up -d

.PHONY: clean
clean:
	docker-compose -f $(COMPOSE_FILE) down --remove-orphans

open-browser:
ifeq ($(OS), Windows_NT)
	start "$(CLIENT_LOCAL_URL)"
else
	open $(CLIENT_LOCAL_URL)
endif
