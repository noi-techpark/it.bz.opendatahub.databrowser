<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: CC0-1.0
-->

# FAQ

## How to contribute or give feedback

We are very happy if you decide to contribute to the project or if you provide feedback. Please take a look at the [Support](./README.md#support) and [Contributing](./README.md#contributing) sections in [README.md](./README) for information about how to do so.

You can find an introduction on how to start developing in the [contribute-to-development](./doc/contribute-to-development.md) file.

## Why a mono repository?

The reason to use a mono repository is to speed up initial development. In the future, the projects in the repository may be moved to their own repositories.

## How can I solve dependency issues?

If you encounter any dependency issues, it may be helpful to delete all node_modules folders across all projects and attempt to run npm install in the appropriate repository.

## Where do I import / register my Web Component for the Data Browser application?

You can import and register your Web Component globally in the [web-component.import.ts](./databrowser/plugins/web-component.import.ts) file.

## How to pass data to Web Components from Vue?

If you want to pass any data other than Strings to a Web Component, you must pass it as property. Vue provides a `:name.prop` binding, where `name` is the name of the property, and `.prop` tells Vue to pass the data as property.

For example, if you want to pass the object `currentUser` to the `user` property of the `my-user` Web Component:

```html
<my-user :user.prop="currentUser"></my-user>
```
