ifneq (,$wildcard docker/.env)
	include docker/.env
	export $(shell sed 's/=.*//' docker/.env)
endif

#CORE DATABASE
env-database:
	@if [ ! -f docker/.env ]; then cp -n docker/.env.example docker/.env; fi

start-database:
	docker compose -f docker/compose.yml -p dance up -d
	@echo "\\n\033[32m○  Database is running\033[0m"

stop-database:
	cd docker
	docker compose -f docker/compose.yml -p dance down -v
	@echo "\\n\033[31m○  Database stopped\033[0m"

restart-database:
	make stop-database
	make start-database

force-backup:
	bash ./docker/utils/backup.sh

#CORE APP
env-app:
	@if [ ! -f .env ]; then cp -n .env.example .env; fi

build-app:
	npm i
	npx prisma generate
	npm run build

start-app:
	make stop-app
	npm run pm2
	@echo "\\n\033[32m○  Application is running\033[0m"

stop-app:
	@npm run pm2:stop || true
	@npm run pm2:delete || true
	@echo "\\n\033[31m○  Application stopped\033[0m"

prisma-migrate:
	npx prisma migrate deploy



#DEVELOPMENT
dev:
	npm run dev



#MANAGEMENT
init:
	make env-database
	make env-app
	make start-database
	make build-app
	make prisma-migrate
	make start-app
	make monitor

update:
	git pull
	make build-app
	@echo "\\n\033[32m○  Updated successfully. Now start an application \033[33mmake up\033[0m"

up:
	make start-database
	make start-app

stop:
	make stop-database
	make stop-app

restart:
	make stop-database
	make start-database
	make start-app

monitor:
	npm run pm2:monitor

start:
	make prisma-migrate
	npm run start