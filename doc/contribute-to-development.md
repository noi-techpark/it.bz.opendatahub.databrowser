# Contribute to development

## Requirements for developers

The projects in the repository rely on common web technologies: HTML, CSS and JavaScript. A developer should therefor have knowledge in that area. Knowledge in the nodejs eco system is beneficial, because the projects use e.g. npm (alternatively yarn) for package management.

## Project overview

The repository contains two types of projects:

- the [Databrowser App](../databrowser) is written in [Vue 3.x](https://vuejs.org/) and is the main application. It uses [Pinia](https://pinia.vuejs.org/) as store.
- the [Web Components](../web-components) projects provide components and functionalities that can be used by the Databrowser App. The idea is to make the Web Components as generic and reusable as possible, so they can be released and reused independently from the Databrowser App. At the moment, all Web Components are implemented with the help of [lit](https://lit.dev/) framework. Other suitable frameworks (or no framework at all) may be used after consultation with the repository maintainers.

> Please note: at the moment there is just a proof-of-concept for the Web Component integration which is in alpha stage. Please contact the repository maintainers before you start working on Web Components for the Databrowser App.

## Databrowser App

The [Databrowser App](../databrowser) is written in [Vue 3.x](https://vuejs.org/). It consists of a set of [pages](../databrowser/pages), most of those pages serve (semi) static content like privacy information. 

The [DatasetPage](../databrowser/src/pages/DatasetPage.vue) on the other side is the main entry point for Open Data Hub dataset navigation. The DatasetPage renders different views for a dataset, depending on the current app URL. Please take a look at the [domain/datasets](../databrowser/src/domain/datasets/) folder to find the different view implementations.

The pages are embedded in a layout, that defines common parts of the application, e.g. header, sidebar, footer and search. You can find the layout definitions in the [layouts](../databrowser/src/layouts) folder.

## Web Components

> Please note that the concepts described in this chapter are still in very early planning / development stage. The current Databrowser App implementation uses Vue components only. Most probably you can skip this entire chapter.

The [Web Components](../web-components) implement the dataset rendering of the Databrowser app.

At the moment, there is a [databrowser-example](../web-components/databrowser-example) project for an example Web Component. It shows how a Web Component can be implemented with the [lit](https://lit.dev/) framework. It can be used as template.

New Web Components should be implemented in their own projects inside the [Web Components](../web-components) folder, just like the `databrowser-example` Web Component.

It is not necessary to have one project for every single Web Component. If you find that a set of Web Components belong together, just put them inside the same project. Take a look at the [databrowser-tourism](../web-components/databrowser-tourism) folder to get an idea on how such a project may look like.

## Embedding Web Components in the Databrowser App

In general, there are two steps to embed and use a Web Component in the Databrowser app:

1. import the Web Component
2. register the Web Component

### Import Web Components

Web Components can be imported in one of two ways:

- using browser builds (e.g. [IIFE](https://developer.mozilla.org/en-US/docs/Glossary/IIFE)) that are loaded as `<script>` tag
- using ES module imports

#### Browser build Web Components

Browser build Web Components are usually self contained and can be loaded with a `<script>` tag inside the HTML code:

```html
<script src="https://__PATH_TO__/mycomponent.js"></script>

<my-component attrX="valueX"></my-component>
```

The advantage is, that it is very simple to integrate Web Components that way. The disadvantage is, that they are loaded by the browser just like any other script, requiring an extra network request. Another disadvantage is, that Web Components really should provide all necessary dependencies to work in order to be self contained. This usually results in bigger code sizes and code duplications in case two different Web Components use the same libraries (e.g. date / time libraries like moment.js).

#### ES module Web Components

Web Components that are build to be included as ES modules can be embedded in one of two ways:

Using the `<script>` tag:

```html
<script type="module">
  import '__PATH_TO__/mycomponent.js';
</script>

<my-component attrX="valueX"></my-component>
```

Using ES module imports when a bundler is available (that's the case for the Databrowser App):

```js
import from '__PATH_TO__/mycomponent.js'
```

The ES module import using the `<script>` tag in HTML is relatively new, but all major browsers support it nowadays (see [https://caniuse.com/es6-module](https://caniuse.com/es6-module). If a bundler is available, as it is the case for the Databrowser App, this won't be an issue, because the bundler translates all imports for the target environment.

One advantage of ES module imports is, that it is the new standard for module imports that is supported by (current) browsers and nodejs. Another advantage is, that ES modules can be imported dynamically. That means, that the code will be loaded on demand only. Last but not least, ES module imports simplify support for [tree shaking](https://developer.mozilla.org/en-US/docs/Glossary/Tree_shaking), especially when used together with a bundler, which reduces code sizes.

#### Import advice

For all the reasons stated [above](#import-web-components), it is strongly advised to import Web Components inside the Databrowser App as ES modules.

If a Web Component is part of the current repository, the import may be done using static paths. Please take a look at the [web-component.import.ts](../databrowser/plugins/web-component.import.ts) file to see how the imports are defined for the current Web Components.

If you want to use Web Components that are released e.g. in an npm registry, you can import the corresponding packages like any other npm package.

### Register Web Components

Independently on how you import a Web Component, you still have to register it in order to use it. For this, use the [window.customElements.define](https://developer.mozilla.org/en-US/docs/Web/API/Window/customElements) method. Take a look at the [web-component.import.ts](../databrowser/plugins/web-component.import.ts) file to see actual examples.

> The only exception to the registration with `window.customElements.define` is, if your import already handles the registration - which is not advised because of possible tag-name collisions.

## Authentication and authorization

The Databrowser App provides authentication and authorization facilities, using KeyCloak as identity provider.

The auth information can be accessed in Vue components using the `auth` store, accessible by the `useAuth()` command. If you want to forward that information to a Web Component, please do so using attributes or properties.
