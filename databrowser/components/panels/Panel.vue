<template>
  <div>
    <!-- Backdrop -->
    <Backdrop :show="show" @close="close" />

    <!-- Panel -->
    <transition
      enter-active-class="transition duration-300 ease-in-out transform"
      :enter-from-class="left ? '-translate-x-full' : 'translate-x-full'"
      :enter-to-class="left ? '-translate-x-0' : 'translate-x-0'"
      leave-active-class="transition duration-300 ease-in-out transform"
      :leave-from-class="left ? '-translate-x-0' : 'translate-x-0'"
      :leave-to-class="left ? '-translate-x-full' : 'translate-x-full'"
    >
      <section
        v-if="show"
        :aria-labelledby="title"
        class="fixed inset-y-0 z-20 w-full max-w-xs bg-white sm:max-w-md"
        :class="{ 'right-0': !left, 'left-0': left }"
      >
        <div class="flex items-center justify-between flex-shrink-0 p-2">
          <h6 class="p-2 text-lg">{{ title }}</h6>
          <!-- Close button -->
          <button
            class="p-2 rounded-md focus:outline-none focus:ring"
            @click="close"
          >
            <IconsCloseIcon class="w-6 h-6 text-gray-600" />
          </button>
        </div>
        <!-- Panel content -->
        <slot></slot>
      </section>
    </transition>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.component('Panel', {
  props: {
    show: {
      type: Boolean,
      required: true,
    },
    left: {
      type: Boolean,
      default: false,
      required: false,
    },
    title: {
      type: String,
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
