<template>
  <router-link :to="to" :class="className"><slot></slot></router-link>
</template>

<script lang="ts">
import { defineComponent } from '@vue/runtime-core';
import { Tone } from './types';
import { computed } from 'vue';

const toneClass: Record<Tone, string> = {
  [Tone.primary]: 'text-green-500',
};

export default defineComponent({
  props: {
    to: {
      required: true,
      type: String,
    },
    tone: {
      type: String,
    },
  },
  setup(props) {
    const className = computed(() => {
      const tone = props.tone as Tone;
      const customClass = tone ? toneClass[tone] : '';

      return (
        'flex items-center space-x-2 font-semibold hover:underline ' +
        customClass
      );
    });

    return { className };
  },
});
</script>
