# ICONS

The SVG icons are taken partially from the [original base template](https://github.com/Kamona-WD/starter-dashboard-layout-vue) and partially from [heroicons](https://heroicons.com/); the original base template icons where renamed to align to the heroicon names.

## Add icons

In general, if you want to add an icon, please create a new Vue component file inside the `components/icons` folder with the name of the icon and `Icon` appended, for example lets suppose your icon name is `Pencil`, then you would create a file `components/icons/PencilIcon.vue` with the following content:

```html
<template>
  <svg ...>...YOUR SVG CONTENT...</svg>
</template>
```

Please take a look at the current icon components to get a better idea on how an icon component should look like.
