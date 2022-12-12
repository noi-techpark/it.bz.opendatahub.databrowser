<template>
  <div v-if="icon">
    <component :is="icon" />
  </div>
</template>

<script>
import { defineComponent, shallowRef } from 'vue';

export default defineComponent({
  props: {
    name: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    // use shallowRef to remove unnecessary optimizations
    const icon = shallowRef('');

    import(`../svg/${props.name}.vue`).then((val) => {
      // val is a Module has default
      icon.value = val.default;
    });

    return {
      icon,
    };
  },
});
</script>
