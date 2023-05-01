<template>
  <div
    class="flex items-center justify-between gap-2 rounded border border-gray-400 p-2 text-black focus-within:border-green-500"
  >
    <input
      :id="id"
      ref="inputRef"
      v-model="searchTerm"
      class="grow"
      placeholder="Insert search value ..."
      :disabled="disabled"
      :data-test="`${id}-input`"
      @keypress.enter="emitSearch"
    />
    <div class="flex items-center gap-2">
      <button
        v-if="hasText"
        class="p-1 text-delete"
        :data-test="`${id}-reset-search`"
        @click="deleteSearch"
      >
        <IconDelete />
      </button>
      <ButtonCustom
        size="xm"
        class="flex items-center gap-2 rounded p-2 md:px-3 md:py-0"
        aria-label="Search"
        :disabled="disabled"
        :data-test="`${id}-start-search`"
        @click="emitSearch"
      >
        <IconSearch />
        <span class="hidden md:inline">Search</span>
      </ButtonCustom>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue';
import ButtonCustom from '../button/ButtonCustom.vue';
import IconDelete from '../svg/IconDelete.vue';
import IconSearch from '../svg/IconSearch.vue';
import { randomId } from '../utils/random';

const emit = defineEmits(['search', 'update:modelValue']);

const props = withDefaults(
  defineProps<{
    modelValue?: string;
    disabled?: boolean;
    focus?: boolean;
    id?: string;
  }>(),
  {
    modelValue: undefined,
    disabled: undefined,
    focus: undefined,
    id: randomId(),
  }
);

const searchTerm = ref(props.modelValue);

watch(
  () => props.modelValue,
  (value) => {
    searchTerm.value = value;
  }
);

watch(
  () => searchTerm.value,
  (value) => emit('update:modelValue', value)
);

const inputRef = ref();
const focusInput = () =>
  setTimeout(() => {
    if (inputRef.value != null) {
      inputRef.value.focus();
    }
  }, 500);

onMounted(() => {
  if (props.focus === true) {
    focusInput();
  }
});

const hasText = computed(() => searchTerm.value?.length ?? 0 > 0);

const deleteSearch = () => {
  searchTerm.value = '';
  emitSearch();
  focusInput();
};

const emitSearch = () => emit('search', searchTerm.value);
</script>
