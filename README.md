# REPOSITORY-SERVICE

The service-oriented architecture repository is part of an arrangement to store critical information about the service-oriented architecture as a whole

## Installation

```bash
git clone https://github.com/jhoncbernal/RepositoryService
cd repository-service
yarn
```

Then, you will need to create a **.env** file in the root of the project

```bash
PROJECT_NAME=base-app
PROJECT_MODE=development
SERVER_HOSTNAME="http://localhost"
SERVER_PORT=3000

MONGODB_HOSTNAME=127.0.0.1
MONGODB_PORT=27018
MONGODB_USERNAME=root
MONGODB_PASSWORD=newPassword
MONGODB_DATABASE=service_repository_dev
```

## Scripts

### start

```bash
yarn start
```

### test

Run the unit tests

```bash
yarn test
```

Run the integration tests

```bash
yarn test:integration
```

### build

Compile the project

```bash
yarn build
```

### build and run

Compile the project and run it

```bash
yarn serve
```

## Documentation

https://www.getpostman.com/collections/b1753be0afa7a703fe5b

## Production

### Docker configuration

```bash
docker network create intranet

sh deploy.sh
```
