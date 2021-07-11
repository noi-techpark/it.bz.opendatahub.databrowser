# OpenDataHub Databrowser - Web Components

This project contains different Web Components for the [OpenDataHub](https://noi.bz.it/en/services/open-data-hub) Databrowser.

The Web Components follow the [open-wc](https://github.com/open-wc/open-wc) recommendation.

## Table of Contents

- [Getting started](#getting-started)
- [Usage](#usage)
- [Testing](#testing)
- [Information](#information)

## Getting started

These instructions will get you a copy of the project up and running
on your local machine for development and testing purposes.

### Prerequisites

To build the project, the following prerequisites must be met:

- Node.js, at least v12 (see [https://nodejs.org/en/about/releases/](https://nodejs.org/en/about/releases/))

### Installation

This project is part of a mono repository, together with the [Databrowser](../databrowser) app. Therefore you need to check out the whole mono repository.

Get a copy of the repository, e.g. by cloning it from the following location:

```bash
git clone https://github.com/noi-techpark/it.bz.opendatahub.databrowser.git
```

Change directory:

```bash
cd it.bz.opendatahub.databrowser/web-components
```

Install project dependencies:

```bash
npm i
```

### Demoing with Storybook

[Storybook](https://storybook.js.org/) is an app that provides a nice overview about the Web Components.

To run a local instance of Storybook for your component, run:

```bash
npm run storybook
```

To build a production version of Storybook, run:

```bash
npm run storybook:build
```

## Usage

Example for the `databrowser-counter` component:

```html
<script type="module">
  import 'databrowser-counter/databrowser-counter.js';
</script>

<databrowser-counter></databrowser-counter>
```

## Testing

To run the suite of Web Test Runner tests, run:

```bash
npm run test
```

To run the tests in watch mode (for <abbr title="test driven development">TDD</abbr>, for example), run

```bash
npm run test:watch
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
