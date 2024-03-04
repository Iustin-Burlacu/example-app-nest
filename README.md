## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Docker run postgres image
```bash
$ docker compose up dev-db -d
```

## Docker restart service and deploy migration on prisma

```bash
$ npm run db:dev:restart
```

## Prisma
```bash
$ npm install prisma --save-dev
```
```bash
$ npm install @prisma/client
```

### Prisma cli
```
npx prisma init

npx prima migrate dev

npx prisma studio => localhost:5555
```

## Validator
```bash
$ npm install class-validator class-transformer
```


 ## Config module
```bash
$ npm install @nestjs/config
```


## Passport - jwt
```bash
$ npm install @nestjs/passport passport @nestjs/jwt passport-jwt
```
```bash
$ npm install --save-dev @types/passport-jwt
```