<template>
  <div class="flex gap-3 items-center">
    <label v-if="hasLabel" :for="id">{{ label }}</label>
    <input
      :id="id"
      ref="inputRef"
      v-model="text"
      class="p-2 text-black rounded border border-gray-400 focus:border-green-500"
      :class="inputClasses"
      :placeholder="placeholder"
    />
    <span v-if="label != null" class="ml-3 font-semibold"></span>
  </div>
</template>

<script setup lang="ts">
import { computed, defineEmits, defineProps, onMounted, ref } from 'vue';
import { randomId } from '../utils/random';

const id = randomId();

const emit = defineEmits(['update:modelValue']);

const props = defineProps<{
  modelValue?: string | boolean | number;
  label?: string;
  placeholder?: string;
  inputClasses?: string;
  focus?: boolean;
}>();

const inputRef = ref();
onMounted(() => {
  if (props.focus === true) {
    setTimeout(() => inputRef.value.focus(), 50);
  }
});

const hasLabel = computed(() => props.label != null && props.label.length > 0);

const text = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
});
</script>

<style scoped>
.has-error input {
  @apply border-error text-error;
}
</style>
