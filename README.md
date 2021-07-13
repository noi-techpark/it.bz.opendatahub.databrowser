# OpenDataHub Databrowser

This is the mono repository for the OpenDataHub Databrowser.

It contains the [Databrowser application](./databrowser) and its [Web Components](./web-components). You can find more details about those projects (development, build and more) in the corresponding folders.

## Table of Contents

- [Getting started](#getting-started)
- [Docker environment](#docker-environment)
- [Information](#information)

## Getting started

These instructions will get you a copy of this mono repository and prepare it for development.

Please take a look at the projects and their corresponding `README.md` files inside this mono repository to see
how to do develop, tests and build.

### Prerequisites

To build the projects in the repository, the following prerequisites must be met:

- Node.js, at least v12 (see [https://nodejs.org/en/about/releases/](https://nodejs.org/en/about/releases/))

If you want to use Docker instead, take a look at the [Docker environment](#docker-environment) section.

### Installing

Get a copy of the repository, e.g. by cloning it from the following location:

```bash
git clone https://github.com/noi-techpark/it.bz.opendatahub.databrowser
```

Change directory:

```bash
cd it.bz.opendatahub.databrowser/
```

Install the dependencies of all projects in this mono repository:

> This is a mono repository. That means, that many projects are located in this repository. Some of
> those projects depend on each other (e.g. the databrowser app depends on the Web Components).
>
> In order to simplify development, test and build, this repository provides [lerna](https://lerna.js.org/)
> tasks e.g. to install all dependencies at once as seen below.

```bash
# Install dependencies of all projects. This may take some time!

npm run bootstrap
```

Please take a look at the `README.md` files of the projects in this repository for more specific details.

#### Example: Start databrowser app in development mode

Change into the databrowser app folder:

```bash
cd databrowser
```

Start the databrowser app in development mode:

```bash
npm run dev
```

> Take a look at the `README.md` file in the `databrowser` folder for further details.

#### Example: Start web-component development environment with Storybook

Change into the databrowser app folder:

```bash
cd web-components/databrowser-example
```

Start the databrowser app in development mode:

```bash
npm run storybook
```

> Take a look at the `README.md` file in the `databrowser-example` folder for further details.

## Docker environment

This repository and all of its projects provide ready-to-use `docker-compose.yml` to further simplify
development, tests and build.

### Install project dependencies

The `docker-compose.yml` located in the repository root can be used to install the dependencies of
all projects. Given you are located in the repository root, just run the following command:

```bash
docker-compose up
```

Take a look at the project specific `README.md` files for further information on how to develop, test and
build the projects.

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