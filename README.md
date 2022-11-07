# Data Browser for the Open Data Hub

This is the mono repository for the Open Data Hub Data Browser.

It contains the [Data Browser application](./databrowser) and its [Web Components](./web-components). You can find more details about those projects (development, build and more) in the corresponding folders.

## Table of Contents

- [Getting started](#getting-started)
- [Docker environment](#docker-environment)
- [Information](#information)

## Getting started

These instructions will get you a copy of this mono repository and prepare it for development.

Please take a look at the subprojects and their corresponding `README.md` files inside this mono repository to see
how to do develop, test and build.

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
cd it.bz.opendatahub.databrowser
```

Install Lerna:

```bash
npm ci
```

Install the dependencies of all subprojects in this mono repository:

```bash
npm run bootstrap
```

Please take a look at the `README.md` files of the subprojects in this mono repository for further setup details.

## Information

### Support

For support, please contact [Christian Gapp](https://github.com/gappc) or
[NOI Techpark Südtirol - Alto Adige](https://noi.bz.it/en).

### Contributing

Please take a look at the [Contributor Guidelines](https://github.com/noi-techpark/odh-docs/wiki/Contributor-Guidelines%3A-Getting-started).

You can find an introduction on how to start developing in the [contribute-to-development](./doc/contribute-to-development.md) file.

### Versioning

This project uses [SemVer](https://semver.org/) for versioning. For the versions available,
see the [tags on this repository](https://github.com/noi-techpark/it.bz.opendatahub.databrowser/tags).

### License

The code in this project is licensed under the GNU AFFERO GENERAL PUBLIC LICENSE license, Version 3. See the LICENSE file for more information.

### Authors

- **Christian Gapp** - *Initial work* - [gappc](https://github.com/gappc)
- **AboutBits** - *Initial work* - [aboutbits](https://github.com/aboutbits)

### Acknowledgements

- [NOI Techpark Südtirol - Alto Adige](https://noi.bz.it/en)
