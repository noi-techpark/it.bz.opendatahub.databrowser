# Databrowser Web Component: databrowser-example

This project contains the `databrowser-example` Web Component.

It is a simple example to demonstrate how a Web Component can be implemented with [lit](https://lit.dev/);

## Table of Contents

- [Getting started](#getting-started)
- [Test](#test)
- [Build and deploy](#build-and-deploy)
- [Usage](#usage)
- [Docker environment](#docker-environment)
- [Information](#information)

## Getting started

These instructions will get you a copy of the project up and running on your local machine for development, test and build.

### Prerequisites

To build the project, the following prerequisites must be met:

- Node.js, at least v12 (see [https://nodejs.org/en/about/releases/](https://nodejs.org/en/about/releases/))

If you want to use Docker instead, take a look at the [Docker environment](#docker-environment) section.

### Installation

Change to this directory:

```bash
cd web-components/databrowser-example
```

Install the dependencies (if not already installed with Lerna):

```bash
npm ci
```

### Start development

To start the development server, run:

```bash
npm run start
```

On successful start, the demo application can be found at [http://localhost:8000/demo](http://localhost:8000/demo).

### Demoing with Storybook

[Storybook](https://storybook.js.org/) is an app that provides a nice overview about the Web Component and its capabilities.

To run a local development instance of Storybook for your component, run:

```bash
npm run storybook
```

On successful start, the storybook application can be found at [http://localhost:8000](http://localhost:8000).

To compile the Storybook to static resources that can be deployed to a web server, run:

```bash
npm run storybook:build
```

The result can be found in the `storybook-static` folder.

> Storybook provides hot reload capabilities, so it is suited for development purposes. Unfortunately, hot reload doesn't
> work when Storybook is started in a Docker container. You have to start Storybook on your machine (not in a Docker container)
> in order for hot reload to work. This seems to be a bug either in the Docker configuration (maybe volume mounts) or in
> Storybook itself.
>
> If you have an idea on how to fix this, please let us know.

## Test

To run the suite of Web Test Runner tests, run:

```bash
npm run test
```

To run the tests in watch mode, run:

```bash
npm run test:watch
```

> Note that the tests can not be run in a Docker container due to dependencies on an installed Chrome browser.
>
> If you have an idea on how to fix this, please let us know.

## Build and deploy

The project provides two different builds:

- ES module
- Browser

### ES module

This build target compiles the Web Component to an ES module that can be included in other projects using the
`import` statement. The ES module is also suitable for publishing to an npm registry.

To start the ES module build, run:

```bash
npm run build
```

The result can be found in the `./dist` folder.

To publish the module to an npm registry, run:

```bash
npm publish
```

### Browser

This build target compiles the Web Component to an [IIFE](https://developer.mozilla.org/en-US/docs/Glossary/IIFE) that
can be included in websites using the `<script>` tag.

To start the browser build, run:

```bash
npm run build:browser
```

The result can be found in the `./dist-browser` folder.

## Usage

Below you can find some examples on how to use the Web Component in your applications. Note, that the
import from `databrowser-example/dist/databrowser-example.js` registers the Web Component using
`window.customElements.define`. If you don't want to register the Web Component or you want to register
it by your own, just import `databrowser-example`.

Example usage for the `databrowser-example` component when compiled to an ES module using the `<script>` tag:

```html
<script type="module">
  import 'databrowser-example/dist/databrowser-example.js';
</script>

<databrowser-example></databrowser-example>
```

Example usage for the `databrowser-example` component when compiled to an ES module using the ES module import:

```js
import from 'databrowser-example/dist/databrowser-example.js';
```

Example usage for the `databrowser-example` component when compiled for the browser using the `<script>` tag:

```html
<script src="__PATH_TO_FILE__/databrowser-example.js"></script>

<databrowser-example></databrowser-example>
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

docker-compose exec node /bin/bash -c "npm run start"

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
