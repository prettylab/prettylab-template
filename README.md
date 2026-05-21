## Commands

### Management

`make init` - bootstrap envs, start database, build app, run migrations, start app, open monitor

`make update` - pull latest and rebuild app

`make up` - start database and app

`make stop` - stop database and app

`make restart` - restart database and app

`make monitor` - pm2 monitor panel with logs

`make start` - run prisma migrations and start the app

<hr/>

### Development

`make dev` - run dev server

<hr/>

### Database

`make env-database` - create `docker/.env` from example if missing

`make start-database` - start the database via docker compose

`make stop-database` - stop the database and remove volumes

`make restart-database` - restart the database

`make force-backup` - run the database backup script

<hr/>

### App

`make env-app` - create `.env` from example if missing

`make build-app` - install deps, generate prisma client, build

`make start-app` - (re)start the app under pm2

`make stop-app` - stop and delete the pm2 process

`make prisma-migrate` - apply prisma migrations
