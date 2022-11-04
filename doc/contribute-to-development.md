# Contribute to development

## Requirements for developers

The projects in the repository rely on common web technologies: HTML, CSS and JavaScript. A developer should therefor have knowledge in that area. Knowledge in the nodejs eco system is beneficial, because the projects use e.g. npm (alternatively yarn) for package management.

## Project overview

The repository contains two types of projects:

- the [Data Browser App](../databrowser) is written in [Vue 3.x](https://vuejs.org/) and is the main application. It uses [Pinia](https://pinia.vuejs.org/) as store.
- ~~the [Web Components](../web-components) projects provide components and functionalities that can be used by the Data Browser App. The idea is to make the Web Components as generic and reusable as possible, so they can be released and reused independently from the Data Browser App. At the moment, all Web Components are implemented with the help of [lit](https://lit.dev/) framework. Other suitable frameworks (or no framework at all) may be used after consultation with the repository maintainers.~~

> Please note: at the moment there is just a proof-of-concept for the Web Component integration which is in alpha stage. Please contact the repository maintainers before you start working on Web Components for the Data Browser App.
>
> See also [the documentation on Web Components](./developers/web-components.md) to get more information.

## Data Browser App

The [Data Browser App](../databrowser) is written in [Vue 3.x](https://vuejs.org/). It consists of a set of [pages](../databrowser/pages), most of those pages serve (semi) static content like privacy information. 

The [DatasetPage](../databrowser/src/pages/DatasetPage.vue) on the other side is the main entry point for Open Data Hub dataset navigation. The DatasetPage renders different views for a dataset, depending on the current app URL. Please take a look at the [domain/datasets](../databrowser/src/domain/datasets/) folder to find the different view implementations.

The pages are embedded in a layout, that defines common parts of the application, e.g. header, sidebar, footer and search. You can find the layout definitions in the [layouts](../databrowser/src/layouts) folder.

## Web Components

> Please note that the concepts described in this chapter are still in very early planning / development stage. The current Data Browser App implementation uses Vue components only. Most probably you can skip this entire chapter.
>
> See also [the documentation on Web Components](./developers/web-components.md) to get more information.

The [Web Components](../web-components) implement the dataset rendering of the Data Browser app.

At the moment, there is a [databrowser-example](../web-components/databrowser-example) project for an example Web Component. It shows how a Web Component can be implemented with the [lit](https://lit.dev/) framework. It can be used as template.

New Web Components should be implemented in their own projects inside the [Web Components](../web-components) folder, just like the `databrowser-example` Web Component.

It is not necessary to have one project for every single Web Component. If you find that a set of Web Components belong together, just put them inside the same project. Take a look at the [databrowser-tourism](../web-components/databrowser-tourism) folder to get an idea on how such a project may look like.

## Authentication and authorization

The Data Browser App provides authentication and authorization facilities, using KeyCloak as identity provider.

The auth information can be accessed in Vue components using the `auth` store, accessible by the `useAuth()` command. If you want to forward that information to a Web Component, please do so using attributes or properties.
