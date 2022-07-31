# Web components

The Databrowser App provides different views to present the [Open Data Hub](https://opendatahub.bz.it/) datasets, e.g.

- The table view shows a list of dataset entries
- The detail view shows the details for a dataset
- The raw view shows the raw data for a dataset
- ...

Each view is build out of dynamically created components, that render parts of datasets. There is e.g. a component that knows how to render string data, another one knows how to render GPS data. The render configurations are defined in the [config](../../databrowser/src/config) folder.

Many components used to render datasets are implemented as Vue components, but the Databrowser App supports also the usage of [Web Components]((https://developer.mozilla.org/en-US/docs/Web/Web_Components)).

> *Taken from [https://vuejs.org/guide/extras/web-components.html](https://vuejs.org/guide/extras/web-components.html) on 2022-31-07*
>
> Web Components is an umbrella term for a set of web native APIs that allows developers to create reusable custom elements.

## How to create Web Components

There are many ways to implement Web Components. One way is to use the plain web native APIs, an example is provided by [MDN docs](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements).

If you take a look at that example, you'll see that it is rather complicated and error prone to implement Web Components using web native APIs because one has to take care about the low-level behavior that is necessary for Web Components to work properly.

A better alternative is to use frameworks, that encapsulate most of the difficulties. Fortunately a lot of such frameworks exist, e.g. [Lit](https://lit.dev/), [FAST](https://www.fast.design/) and many more. It is even possible to use [Vue](https://vuejs.org/guide/extras/web-components.html) to implement Web Components.

### Vue example Web Components

TODO: need to clarify with NOI where to put example project.

### Lit example Web Components

You can find some example Web Components implemented with Lit in the [web-components](../../web-components/) folder. 

> Please note that the Web Components inside the `web-components` directory were part of a proof-of-concept. **They are not intended for production usage and don't reflect best practices. They will be rewritten or removed in the future**.

Take a look at the [Vue example](#vue-example-web-components) instead or take a look at the [example integration](#example-integration).

## Requirements for Web Components

There are requirements that must be met by a Web Component to be used in the Databrowser App:

### Browser build

The Web Component must be available as browser build that can be included with a script tag:

```html
<script type="module" src="https://__PATH_TO__/myComponent.js"></script>

<my-component attrX="valueX"></my-component>
```

> Hint: the example above shows how a Web Component could be loaded. **Please do not include Web Component `script` tags manually**, because it may lead to performance issues. Take a look at [Script loading](#script-loading) to see how to load the script.

The script should take care to register the Web Component as custom element:

```javascript
customElements.define('my-component', MyComponent);
```

### Script loading

Loading all known Web Components on application startup should be avoided because it affects the performance. A better strategy is to leave the decision on when to load a Web Component to the Databrowser App.

For this to work, you must add your Web Component to the facilities provided by the Databrowser app

1. Add the name under which your Web Component is registered as custom element (= HTML tag name) to the [webComponentRegistry](../../databrowser/src/domain/webComponents/webComponentRegistry.ts) file as new entry for the enum `WebComponent`. That way it is easier to reuse the tag name.

2. Add the tag name and URL from where to load the Web Component to the same [webComponentRegistry](../../databrowser/src/domain/webComponents/webComponentRegistry.ts) file to the `webComponentRegistry` definitions.

3. Where necessary, adapt the view configurations to use your Web Component (see [How to use a Web Component](#how-to-use-a-web-component))

### Attributes only

The parameters that a Web Component expects must be provided **as attributes** (as of now, it is not possible to set Web Component properties):

```javascript
<my-component attrX="valueX" attrY="valueY"></my-component>
```

Please be aware that attributes accept strings only, it is not possible to provide objects, arrays and functions to Web Components. A workaround for objects and arrays is to provide the data as JSON and then, inside the Web Component, to parse that data. **The Databrowser App has no support for that kind of functionality**.

## How to use Web Components

Web Components for dataset rendering are configured the same way as Vue components. Take a look at any view config file, e.g. the [detail view config for ODH Activity POIs](../../databrowser/src/config/tourism/odhActivityPoi/odhActivityPoi.detailView.ts).

Inside that config you'll find properties called `component` that define which component to use when rendering different parts of a dataset. The property takes a string argument, that is either a registered Vue Component, or a registered Web Component.

### Example integration

An example integration for the [Activity and POI Web Component](https://webcomponents.opendatahub.com/webcomponent/0e5fbede-4a21-4dd3-bf85-7d2be71dfb12?from=%2F) from the [Open Data Hub Web Component Store](https://webcomponents.opendatahub.com/) can be found here:

- registration in file [webComponentRegistry.ts](../../databrowser/src/domain/webComponents/webComponentRegistry.ts)
- usage in configuration [odhActivityPoi.detailView.ts](../../databrowser/src/config/tourism/odhActivityPoi/odhActivityPoi.detailView.ts) when rendering GPS Data
