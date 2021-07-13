# OpenDataHub Databrowser - Application

This project provides the [OpenDataHub](https://noi.bz.it/en/services/open-data-hub) Databrowser Application.

It is part of a mono repository, together with the [Databrowser Web Components](../web-components).

## Table of Contents

- [Getting started](#getting-started)
- [Build and launch server](#build-and-launch-server)
- [Information](#information)

## Getting started

These instructions will get you a copy of the project up and running
on your local machine for development and testing purposes.

### Prerequisites

To build the project, the following prerequisites must be met:

- Node.js, at least v12 (see [https://nodejs.org/en/about/releases/](https://nodejs.org/en/about/releases/))

> If you want to use Docker instead, take a look at the [Docker environment](#docker-environment) section.

### Installation

Get a copy of the repository, e.g. by cloning it from the following location:

```bash
git clone https://github.com/noi-techpark/it.bz.opendatahub.databrowser
```

Change directory:

```bash
cd it.bz.opendatahub.databrowser/databrowser
```

Install dependencies

```bash
npm install
```

### Start development

To start the development server, run:

```bash
npm run dev
```

On successful start, the demo application can be found at [http://localhost:3000](http://localhost:3000).

## Test

To run the suite of Web Test Runner tests, run:

```bash
npm run test
```

To run the tests in watch mode, run:

```bash
npm run test:watch
```

## Build and deploy

Build the production version:

```bash
npm run build
```

The result, found in the `./dist` folder, can be deployed to a web server.

Launch local production server:

```bash
npm run start
```

## Docker environment

For the project a Docker environment is already prepared and ready to use with all necessary prerequisites.

These Docker containers are the same as used by the continuous integration servers.

In order to use the Docker environment, you must have [Docker](https://docs.docker.com/install/) installed
locally on your machine, together with [Docker Compose](https://docs.docker.com/compose/).

### Start and stop the containers

Before start working you have to start the Docker containers:

```bash
docker-compose up --build --detach
```

After finished working you can stop the Docker containers:

```bash
docker-compose stop
```

### Running commands inside the container

When the containers are running, you can execute any command inside the environment. Just replace the dots `...` in the following example with the command you wish to execute:

```bash
docker-compose exec node /bin/bash -c "..."
```

Some examples are:

```bash
docker-compose exec node /bin/bash -c "npm install"

# or

docker-compose exec node /bin/bash -c "npm run dev"

# or

docker-compose exec node /bin/bash -c "npm run test"

# or

docker-compose exec node /bin/bash -c "npm run build"
```

## Information

### Support

For support, please contact [Christian Gapp](https://github.com/gappc) or
[NOI Techpark Südtirol - Alto Adige](https://noi.bz.it/en).

### Contributing

If you'd like to contribute, please fork the repository and use a feature
branch. Pull requests are warmly welcome.

### Versioning

This project uses [SemVer](https://semver.org/) for versioning. For the versions available,
see the [tags on this repository](https://github.com/noi-techpark/it.bz.opendatahub.databrowser/tags).

### License

The code in this project is licensed under the GNU AFFERO GENERAL PUBLIC LICENSE license, Version 3. See the LICENSE file for more information.

### Authors

- **Christian Gapp** - *Initial work* - [gappc](https://github.com/gappc)

### Acknowledgements

- [NOI Techpark Südtirol - Alto Adige](https://noi.bz.it/en)
- Dashboard: based on [https://github.com/Kamona-WD/starter-dashboard-layout-vue](https://github.com/Kamona-WD/starter-dashboard-layout-vue)
