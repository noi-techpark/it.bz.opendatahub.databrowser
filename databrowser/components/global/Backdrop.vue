<template>
  <transition
    enter-active-class="transition duration-300 ease-in-out"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="transition duration-300 ease-in-out"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div
      v-show="show"
      aria-hidden="true"
      class="fixed inset-0 z-10 bg-black bg-opacity-20"
      style="backdrop-filter: blur(14px); -webkit-backdrop-filter: blur(14px)"
      @click="close"
    ></div>
  </transition>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  props: {
    show: {
      type: Boolean,
      required: true,
    },
  },
  methods: {
    close() {
      this.$emit('close');
    },
  },
});
</script>
