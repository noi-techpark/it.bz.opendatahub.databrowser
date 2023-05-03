# Contribute to development

## Requirements for developers

The Data Browser is a web application written in [Vue 3.x](https://vuejs.org/). A developer should therefor have knowledge in that area. Knowledge in the nodejs eco system is beneficial, because the projects use e.g. npm (alternatively yarn) for package management.

## Data Browser

The Data Browser consists of a set of [pages](../databrowser/pages), most of those pages serve (semi) static content like privacy information.

The [DatasetPage](../databrowser/src/pages/DatasetPage.vue) on the other side is the main entry point for Open Data Hub dataset navigation. The DatasetPage renders different views for a dataset, depending on the current app URL. Please take a look at the [domain/datasets](../databrowser/src/domain/datasets/) folder to find the different view implementations.

The pages are embedded in a layout, that defines common parts of the application, e.g. header, sidebar, footer and search. You can find the layout definitions in the [layouts](../databrowser/src/layouts) folder.

## Authentication and authorization

The Data Browser App provides authentication and authorization facilities, using KeyCloak as identity provider.

The auth information can be accessed in Vue components using the `auth` store, accessible by the `useAuth()` command. If you want to forward that information to a Web Component, please do so using attributes or properties.

## Further information

Please take a look on the [guildeline](../databrowser/guideline.md) for further information.
