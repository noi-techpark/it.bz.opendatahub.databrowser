# FAQ

## Why a mono repository?

The reason to use a mono repository is to speed up initial development. In the future, the projects in the repository may
be moved to their own repositories.

## Why do I have to install node_modules in the referenced web-component projects before I can compile the databrowser app?

Before you can compile the databrowser app project, you need to install the dependencies of the referenced Web Components (see [web-component](../web-component)).

The reason is, that the web-components need their dependencies to compile. They expect those dependencies in their own
`node_modules` folder.

It is advised to invoke `npm run bootstrap` in the repository root, because that in turn uses [lerna](https://lerna.js.org/)
to take care of the dependencies.

## How can I solve dependency issues?

If you have any dependencies issues, consider removing all `node_modules` folders of all projects and try to invoke
`npm run bootstrap` in the repository root.

## What about the `MONOREPO_IMPORT` environment variable?

The `MONOREPO_IMPORT` environment variable can be used to control the location from where the [Databrowser app](./databrowser)
imports its Web Components. The configuration can be found in [web-component.import.ts](./databrowser/plugins/web-component.import.ts)
and should be extended with your Web Components.

When the `MONOREPO_IMPORT` environment variable is set to `true`, the Databrowser app imports its Web Components using file references, e.g.
`import ../../web-components/projects/databrowser-example/databrowser-example`. This simplifies development, because changes to a Web
Component are available to the app instantly. Otherwise, the Web Component must be compiled, published and installed with `npm install ...`
before its changes are visible to the app.

After the initial development efforts stabilize and the Web Components are released to an npm registry, it may be a good idea to remove
the file references and to use the standard `npm install` mechanisms, making the `MONOREPO_IMPORT` environment variable obsolete.
