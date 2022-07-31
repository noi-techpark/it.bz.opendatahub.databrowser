# Dataset configuration

The dataset views of the Databrowser App are configured in files located at the [dataset configs](../../databrowser/src/config) folder.

For example, if you want to modify the detail view configuration of the `EventShort` dataset, adjust the config in [eventShort.detailView.ts](../../databrowser/src/config/tourism/eventShort/eventShort.detailView.ts) file.

## Config description

> Attention: the shape of the configuration is still work on progress and may change in the future.

Each view for each dataset is defined by the appropriate configuration.

Where no configuration for a dataset is provided, the Databrowser tries to generate a configuration on a best-effort basis with the information provided by the OpenAPI definitions provided by the Open Data Hub. This is referred to as `autoconfiguration` or `no-config`. Usually you do not have to bother with that system.

Each dataset configuration is of type `DatasetConfig` (see [types.ts](../../databrowser/src/domain/datasetConfig/types.ts)). It consists of properties common to all views of a given dataset:

- source (type: SourceType): describes the source of the configuration, possible values are 'embedded' and 'generated'
- baseUrl (type: string): defines the base URL of the endpoint where the dataset is loaded from
- route (type: DatasetRoute): gives additional routing information for the dataset, like domain (e.g. `tourism`) and path parameter (e.g. `['v1', 'EventShort']` for the EventShort dataset). Note that the optional `id` property is only used internally - do not set this in the configuration
- description (type: DatasetDescription): provides a description for the dataset with `title`, `subtitle` and `description` properties. The description is shown in different places of the Databrowser, e.g. in the upper left of the different views
- views (type: Record<string, *ViewConfig>): the `views` attribute contains the different view configurations of a dataset (`table`, `detail`, `raw`, `quick` and `edit`)
- operations (type: Record<string, Operation>): contains information for the different endpoint operations (`readAll`, `read`, `create`, `update` and `delete`). At the moment it contains only information about the roles necessary to invoke an operation (authorization). For example, to update a dataset a user must have a certain role like `DatasetWriter`.

## View configurations

The view configurations for `table`, `detail` and `edit` share a common type with an array - property called `elements`. Inside that property one can provide information on how to render parts of a dataset.

### Table view

The table view gives a list-like overview over the records of a dataset. The user can paginate through the data and jump to detail, raw, quick and edit view for a given record using the links on the right of the table view.

Let's take a look at table view configuration of the  `EventShort` dataset as an example, that can be found here: [eventShort.listView.ts](../../databrowser/src/config/tourism/eventShort/eventShort.listView.ts) (the result can be found at this URL [https://databrowser.opendatahub.testingmachine.eu/dataset/table/tourism/v1/EventShort](https://databrowser.opendatahub.testingmachine.eu/dataset/table/tourism/v1/EventShort)):

```javascript
elements: [
  {
    title: 'Description',
    component: CellComponent.StringCell,
    class: 'w-48',
    fields: {
      text: 'EventDescription',
    },
  },
  {
    title: 'Contact',
    component: CellComponent.TextHighlightCell,
    class: 'w-40',
    fields: {
      title: 'ContactEmail',
      subtitle: 'ContactPhone',
    },
  },
  ...
]
```

One can see how the first two columns of the table view are defined:

- title (type: string): this is the title of column, shown in the table header
- component (type: string): this is the name of the component that should render parts of a dataset. Components must be registered before they can be used in a configuration, see [Vue Components](./vue-components.md) and [Web Components](./web-components.md) on how to create and register new components
- class (type: string): additional CSS classes that should be applied to the table column. This is useful e.g. to define the width of a column
- fields (type: Record<string, string>): this property defines the mapping of dataset properties to component attributes. For the first entry we see that the value of property `EventDescription` of the `EventShort` dataset should be handed over to the `CellComponent.StringCell` component as attribute named `text`. For the second entry we see that two values should be passed to the component: the value of `ContactEmail` as attribute `title` and the value of `ContactPhone` as attribute `subtitle`. If you take a look at the [TextHighlightCell component](../../databrowser/src/domain/cellComponents/components/cells/textHighlightCell/TextHighlightCell.vue) you will see that that component expects the attributes (properties in Vue) `title` and `subtitle`. Using this mechanism it is possible to decouple dataset property names from component attributes

There is another optional property that can be used in the table view definition, called `params` (type: Record<string, string>). That property can be used to provide static data to a component, e.g. the `separator` for the [ArrayCell component](../../databrowser/src/domain/cellComponents/components/cells/arrayCell/ArrayCell.vue) that is used to join data.

> Another optional property called `filters` is also available but that will change. Please don't use it as of now.

### Detail view

The detail view shows categorized details for a given record of a dataset. The user can move through the categories using the navigable links on the left of the detail view.

Let's take a look at table view configuration of the `EventShort` dataset as an example, that can be found here: [eventShort.detailView.ts](../../databrowser/src/config/tourism/eventShort/eventShort.detailView.ts) (the result can be found e.g. at this URL [https://databrowser.opendatahub.testingmachine.eu/dataset/table/tourism/v1/EventShort](https://databrowser.opendatahub.testingmachine.eu/dataset/detail/tourism/v1/EventShort/eventshort-17534)).

```javascript
elements: [
  {
    name: 'Main data',
    slug: 'main-data',
    subcategories: [
      {
        name: 'General data',
        properties: [
          {
            title: 'Shortname',
            component: CellComponent.StringCell,
            fields: { text: 'Shortname' },
          },
        ],
      },
      {
        name: 'IDs',
        properties: [
          {
            title: 'ID',
            component: CellComponent.StringCell,
            fields: { text: 'Id' },
            class: 'break-all',
          },
        ],
      },
      ...
    ]
  }
  ...
]
```

One can see that the configuration is similar to the table view configuration and that is true for the entries inside the `properties` property. Please take a look at the [Table view](#table-view) section for an overview.

But there is more to the detail view config. Each `properties` property is part of structure that defines a category `name` (type: string), its `slug` (type: string) used as hash-part of the URL and the subcategory it belongs to.

The reason for the enhanced structure is, that the detail view has a concept of categories, subcategories and items that are shown under a subcategory.

The categories of a dataset are shown as navigable links at the left of the detail view. A click on a link changes the URL hash (slug), leading the detail view to show the contents of that category.

The subcategories are shown in bold on the main content part of the detail view. Each subcategory has one or many items that are shown below it.

### Raw view

The raw view shows the JSON data for a given record of a dataset. No further configuration is necessary for the raw view to work.

### Quick view

> Work in progress

The quick view shows a nice overview for a given record of a dataset.

### Edit view

> Work in progress

The edit view can be used to modify a given record of a dataset. 

