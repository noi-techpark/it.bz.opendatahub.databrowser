# Open Data Hub Databrowser - Application

This project provides the [Open Data Hub](https://opendatahub.bz.it/) Databrowser Application.

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

- Node.js, at least v14.16 or v16 LTS (see [https://nodejs.org/en/about/releases/](https://nodejs.org/en/about/releases/))

> If you want to use Docker instead, take a look at the [Docker environment](#docker-environment) section.

### Installation

Get a copy of the repository, e.g. by cloning it from the following location:

```bash
git clone https://github.com/noi-techpark/it.bz.opendatahub.databrowser
```

Change directory:

```bash
cd it.bz.opendatahub.databrowser
```

Install the dependencies of all projects in this mono repository:

> This is a mono repository. That means, that many projects are located in this repository. Some of
> those projects depend on each other (e.g. the Databrowser Application depends on the Web Components).
>
> In order to simplify development, test and build, this repository provides [lerna](https://lerna.js.org/)
> tasks e.g. to install all dependencies at once as seen below.

```bash
# Install dependencies of all projects. This may take some time!

npm run bootstrap
```

### Start development

If you are in the root folder of this mono repository, change to the Databrowser Application folder:

```bash
cd databrowser
```

Copy the file .env.example to .env and adjust the configuration parameters:

```bash
cp .env.example .env
```

To start the development server, run:

```bash
npm run dev
```

On successful start, the demo application can be found at [http://localhost:3000](http://localhost:3000).

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

docker-compose exec node /bin/bash -c "npm run build"
```

## Information

### Support

For support, please contact [Christian Gapp](https://github.com/gappc), [AboutBits](https://aboutbits.it) or [NOI Techpark Südtirol - Alto Adige](https://noi.bz.it/en).

### Contributing

If you'd like to contribute, please fork the repository and use a feature branch. Pull requests are warmly welcome.

### Versioning

This project uses [SemVer](https://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/noi-techpark/it.bz.opendatahub.databrowser/tags).

### License

The code in this project is licensed under the GNU AFFERO GENERAL PUBLIC LICENSE license, Version 3. See the LICENSE file for more information.

### Authors

- **Christian Gapp** - *Initial work* - [gappc](https://github.com/gappc)
- **Alex Lanz** - *Initial work* - [Alex Lanz](https://aboutbits.it/)
- **Martin Malfertheiner** - *Initial work* - [gappc](https://aboutbits.it/)

### Acknowledgements

- [NOI Techpark Südtirol - Alto Adige](https://noi.bz.it/en)
- Dashboard: based on [https://github.com/Kamona-WD/starter-dashboard-layout-vue](https://github.com/Kamona-WD/starter-dashboard-layout-vue)
