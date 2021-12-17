<template>
  <div
    v-for="(item, index) in data"
    :key="item"
    :class="{
      'text-green-500 bg-opacity-10 bg-green-500 border-green-500':
        isSelected(item),
      'hover:bg-gray-300': !isSelected(item),
      'rounded-l-full border-l': index == 0,
      'rounded-r-full border-r': index == data.length - 1,
    }"
    class="
      overflow-hidden
      last:pr-1
      first:pl-1
      border-t border-b border-gray-500
    "
  >
    <router-link
      :class="{
        'border-green-500': isSelected(item),
        'border-l': index != 0,
        'border-r': index != data.length - 1,
      }"
      :to="{ path: basePath, query: { ...$route.query, [query]: item } }"
      class="block border-transparent"
      role="button"
      tabindex="0"
    >
      <span class="block py-1 px-2 font-semibold">{{ item }}</span>
    </router-link>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@vue/runtime-core';
import { useUrlQueryParameter } from '../../lib/urlQuery/urlQueryParameter';

export default defineComponent({
  props: {
    data: {
      type: Array as PropType<Array<string>>,
      required: true,
    },
    basePath: {
      type: String,
      default: '',
    },
    query: {
      type: String,
      required: true,
    },
    defaultValue: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const languageParameter = useUrlQueryParameter(
      props.query,
      props.defaultValue,
      {
        defaultValue: props.defaultValue,
      }
    );

    function isSelected(current: string) {
      return languageParameter.value == current;
    }

    return {
      isSelected,
    };
  },
});
</script>
