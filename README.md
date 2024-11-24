
## Installation

```bash
$ pnpm install
```

## Database setup

```bash
# set up .env
$ cp .env.example .env

# run db
$ docker-compose up -d

# run seed
$ pnpm seed:run
```

## Running the app

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

## Documentation
```bash
# default value for PORT is 3000
$ http://localhost:3000/api/
```
