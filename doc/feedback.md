# Web Components for Databrowser - current feedback

This document contains the problems and solutions encountered so far when using Web Components in the Databrowser project.

It should be an entry point for further discussions. It is not defined yet, where those discussions should take place.

## Table of Contents

- [Data transfer to Web Components](#data-transfer-to-web-components)
- [Browser build vs ES module](#browser-build-vs-es-module)
- [Shared variables and state](#shared-variables-and-state)
- [Functional components](#functional-components)
- [Summary](#summary)

## Data transfer to Web Components

Data can be passed as attribute or as property to a Web Component. For the examples below lets suppose that the Web Component `my-component` accepts a value for `title`.

1. as attribute on the HTML element

    ```html
    <my-component title="Some title"></my-component>  
    ```

2. as attribute programmatically:

    ```html
    <!-- Set id attribute to reference component from script -->
    <my-component id="mycomp"></my-component>

    <script>
      document.getElementById('mycomp').setAttribute('title', 'Some title');
    </script>
    ```

3. as property

    ```html
    <!-- Set id attribute to reference component from script -->
    <my-component id="mycomp"></my-component>

    <script>
      document.getElementById('mycomp').title = 'Some title';
    </script>
    ```

### Attributes allow Strings only

Attributes allow only Strings as arguments. If anything else is passed (e.g. Numbers, Objects, Arrays, Dates, ...), its corresponding String representation will be passed.

For example, let's try to pass the Object `currentUser` as attribute to a Web Component `my-user` that accepts a value for `user`. Note the value is passed as attribute programmatically, because it is impossible to pass anything else than a String as attribute on HTML (see example 1 above).

```html
<my-user id="mycomp"></my-user>

<script>
    const currentUser = {
      name: 'John Doe',
      age: 23
    };
    document.getElementById('mycomp').setAttribute('user', currentUser);
</script>
```

In the example above, the `user` attribute in the `my-user` Web Component has the value `[object Object]`, because that's the default String representation of an Object in JavaScript.

If complex data, like Objects, need to be passed to Web Components by **attribute**, they must be serialized before they are passed to the component and then deserialized inside the Web Component. This is usually done with JSON serialization / deserialization.

```html
<my-user id="mycomp"></my-user>

<script>
  const currentUser = {
    name: 'John Doe',
    age: 23
  };

  const currentUserAsJson = JSON.stringify(currentUser);
  
  document.getElementById('mycomp').setAttribute('user', currentUserAsJson);
</script>
```

```javascript
// Inside Web Component
...
const userAsJson = this.getAttribute('user');
const user = JSON.parse(userAsJson);
console.log(`User ${user.name} is ${user.age} years old`);
...
```

Although serialization and deserialization with JSON works, there are drawbacks:

- performance: serialization and deserialization is slow
- no functions: there is no simple way to serialize / deserialize functions. Of course it is possible (e.g. serialize the function definition to String and use `eval` in the Web Component), but it is complicated and error prone

### Properties allow arbitrary data

It is possible to pass arbitrary data to Web Components as property:

```html
<my-user id="mycomp"></my-user>

<script>
  const currentUser = {
    name: 'John Doe',
    age: 23
  };
  document.getElementById('mycomp').user = currentUser;
</script>
```

```javascript
// Inside Web Component
...
console.log(`User ${this.user.name} is ${this.user.age} years old`);
...
```

The problem with properties is, that there is no simple way to set properties on a Web Component, like there is with attributes. One needs to get a handle on the Web Component (e.g. as above using `document.getElementById('mycomp')`) and then use that handle to set the property. This is not very intuitive.

Fortunately many frameworks provide solutions to this. In [lit](https://lit.dev/), one just writes a dot (`.`) in front of an attribute name to signalize that the value should be passed as property.

```html
<script>
  const currentUser = {
    name: 'John Doe',
    age: 23
  };
</script>

<my-user .user="currentUser"></my-user>
```

Vue supports [custom directives](https://v3.vuejs.org/guide/custom-directive.html), that can be used to implement something similar.

## Browser build vs ES module

When working with Web Components, it is important to think about how those Web Components will be integrated into the website / application.

### Browser build

The most straight forward way is to have a browser build of the Web Component, that can be included with a script tag:

```html
<script src="https://__PATH_TO__/mycomponent.js"></script>

<my-component attrX="valueX"></my-component>
```

Although it is simple to include a Web Component like this, there are some problems:

- A Web Component must be registered with a name in order to be used in a website / application. In the example above, the Web Component found at `https://__PATH_TO__/mycomponent.js` has embedded code to register itself with the name `my-component`. It is not possible to prevent different Web Components to use the same name, in which case it comes to collisions and errors (note that a Web Component is not required to register itself but it is regarded as good practice to simplify their usage).
- Web Components that can be used like in the example above are usually self contained. That means, they provide all code and data to work without any further dependency. This is a nice property, but brings overhead for Web Components that share same code parts. For example, lets suppose there is a Web Component library and the website / application uses different Web Components out of it. In this example, the Web Components share the same code for validation. Since Web Components are (usually) self contained, that code is part of any of the Web Components and therefore duplicated.

### ES module

An alternative to the straight browser build is to have and include ES module builds of the Web Components. Usually, those ES modules get included as part of the website / application which in turn is bundled / minified before being released. During that cycle, the bundler tries to find and remove code duplications. In addition, when using ES modules, one can opt to register the Web Component with a custom name, reducing the possibility of name clashes.

## Shared variables and state

It can be complicated to pass relevant data / objects / state to a Web Component.

For example, lets suppose a Web Component needs to invoke a HTTP request in order to read some data. This is not very hard, a simple `window.fetch(...)` should suffice. Now lets suppose the request must be authenticated, e.g. an `Authorization` header must be present in order for the request to be accepted on the server side.

How do you pass that information to the Web Component? Do you pass the value of the authorization header to the Web Component as attribute? Do you pass a ready to use HTTP client as property? What about a Web Component deep down the DOM tree that needs that information? You would need to pass the necessary information to every component in between.

Frameworks (e.g. Vue) solve that problem with variables / state that is easily accessible by all of their components. For example, Vue components have access to a `this` object that provides `$axios` as HTTP client. Web Components have nothing similar out of the box. One needs to implement similar facilities manually or reuse a library, but that ties the Web Component to that facility / library, limiting its reuse.

Another example is state. Lets suppose, a Web Component should display the number of unread emails. How do you provide that data to the Web Component? Again, what if the component is buried deep down in the DOM? Frameworks usually provide ways to solve that problem, e.g. with state management tools and libraries (e.g. [vuex](https://vuex.vuejs.org/)). Something similar could be done with Web Components, but that again ties the Web Component to those tools and libraries.

## Functional components

The most straight forward use case for Web Components are functional components. Functional components are components whose behavior and visualization depend solely on their input parameters. This removes the necessity of shared variables / state, making them easier to be reused.

Of course it is possible to write more complicated Web Components, but there should be good reasons to create them as they may have drawbacks like shared variables / state and other dependencies.

## Summary

Web Components are an interesting technology with their use cases, but they have some drawbacks:

- data transfer by attribute / property non intuitive
- no application wide shared variables / state
- code duplication / in case of self sufficient browser builds

To be fair, Web Components were not created to solve those problems, they were created to enable developers to build HTML components that work like built-in HTML elements.

Some of the problems mentioned above can be avoided with the right tooling, e.g. bundler, web frameworks, ... But that raises the question, why to use Web Components with some custom / small / unknown framework rather than to use one of the more mature frameworks.

One answer may be that Web Components should be easily reusable and that they should have a well defined task to solve. It seems to be best to start with functional Web Components and to move from there on.
