<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: CC0-1.0
-->

# Vue Components

The Data Browser App provides different views to present the [Open Data Hub](https://opendatahub.com/) datasets, e.g.

- The table view shows a list of dataset entries
- The detail view shows the details for a single data entry
- The edit view allows authorized users to modify attributes of a record
- The raw view shows the raw data for a dataset
- The quick shows a concise overview of a record with a nice UI

Each view is build out of dynamically created components, that render parts of datasets. There is e.g. a component that knows how to render string data, another one knows how to render GPS data. The render configurations are defined in the [config](../../databrowser/src/config) folder.

## How to create Vue Components

All Vue Components are located at the [cellComponents](../../databrowser/src/domain/cellComponents/) folder inside the `components/cells` folder.

The easiest way to implement a new Vue Component that renders dataset properties is to use an existing Vue Component as template, adjust it to your needs and register it.

For example lets create a new Vue Component named `LinkCell` with the existing `StringCell` component as template. Lets suppose you use a bash terminal currently located at the `databrowser` folder.

Copy and rename the template `StringCell` component:

```bash
# Create a new folder for the Vue Component
mkdir -p src/domain/cellComponents/components/cells/linkCell

# Copy the template StringCell
cp src/domain/cellComponents/components/cells/stringCell/StringCell.vue src/domain/cellComponents/components/cells/linkCell/LinkCell.vue
```

This should provide you a new file `src/domain/cellComponents/components/cells/linkCell/LinkCell.vue`.

Then adjust the code of your `LinkCell` component as necessary, e.g.

```html
<template>
  <a v-if="title != null && url != null" :href="url">{{ title }}</a>
</template>

<script setup lang="ts">
  import { defineProps, withDefaults } from "vue";

  withDefaults(
    defineProps<{
      title?: string;
      url?: string;
    }>(),
    {
      text: undefined,
      url: undefined,
    }
  );
</script>
```

The next step is to register the new component to be usable by the Data Browser App:

1. add the component name to the [types.ts](../../databrowser/src/domain/cellComponents/types.ts) file to the enum `CellComponent`

2. register the component in the [registerCellComponents.ts](../../databrowser/src/domain/cellComponents/plugins/registerCellComponents.ts) file

After successful registration, you can use your Vue Component in the [dataset configs](../../databrowser/src/config).

To define the component to render parts of a dataset, assign them to the appropriate `component` property of your configuration (you can also extend the current configurations).

For example, if you want your component to render data of the `EventShort` detail view, adjust the config in [eventShort.detailView.ts](../../databrowser/src/config/tourism/eventShort/eventShort.detailView.ts) file.

> Take a look at [dataset-configuration.md](./dataset-configuration.md) for a description of the configuration.
