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

## Prisma

npm install prisma --save-dev
npm install @prisma/client

### Prisma cli

npx prisma init

npx prima migrate dev

npx prisma studio => localhost:5555


## Validator
 npm install class-validator class-transformer

 ## Config module

npm install @nestjs/config

## Passport - jwt
npm install @nestjs/passport passport @nestjs/jwt passport-jwt

npm install --save-dev @types/passport-jwt