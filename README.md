# REPOSITORY-SERVICE

The service-oriented architecture repository is part of an arrangement to store critical information about the service-oriented architecture as a whole

## Context

Implement a REST API in NodeJs 16.x that handles CRUD requests.

#### Example of a user

```bash
{
    "email": "janet.weaver@reqres.in",
    "name": "Janet Weaver",
    "phone": "435594689",
    "company": "StatusCode Weekly"
}
```

- Create a Docerized instance of this database. Write the NoSQL and a dockerfile to launch the DB, and create the collections required.

## Related Links

- Postman Collection: https://www.getpostman.com/collections/a6da8f4b09a4a791298a.

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

MONGODB_HOSTNAME=127.0.0.1 ## to build the container you should use "mongo" insted of 127...
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

## Manual Testing Steps

- Please Run the application with this command: `docker-compose -f "docker-compose.yml" up -d --build`
- Go to http://localhost:4000/v1/api/user
- for a dev enviroment create a file (".env") and add the following variables:

```bash PROJECT_NAME=base-app
PROJECT_MODE=development
SERVER_HOSTNAME="http://localhost"
SERVER_PORT=3000

MONGODB_HOSTNAME=127.0.0.1 ## to build the container you should use "mongo" insted of 127...
MONGODB_PORT=27018
MONGODB_USERNAME=root
MONGODB_PASSWORD=newPassword
MONGODB_DATABASE=service_repository_dev
```

- Also you can enter to the coinainer log and check the log
