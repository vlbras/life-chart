
## Installation

```bash
$ pnpm install
```

## Database setup

```bash
# set up .env
cp .env.example .env

# run db
$ docker-compose up -d
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
# defaulf value for PORT is 3000
$ http://localhost:3000/api/
```
