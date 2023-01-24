<template>
  <div
    class="flex items-center justify-between gap-2 rounded border border-gray-400 p-2 text-black focus:border-green-500"
  >
    <input
      ref="inputRef"
      v-model="searchTerm"
      class="grow"
      placeholder="Insert search value ..."
      :disabled="disabled"
      @keypress.enter="emitSearch"
    />
    <div class="flex items-center gap-2">
      <button v-if="hasText" class="p-1 text-delete" @click="deleteSearch">
        <IconDelete />
      </button>
      <ButtonCustom
        size="xm"
        class="flex items-center gap-2 rounded px-3"
        aria-label="Search"
        :disabled="disabled"
        @click="emitSearch"
      >
        <IconSearch />
        <span>Search</span>
      </ButtonCustom>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, defineEmits, defineProps, onMounted, ref, watch } from 'vue';
import ButtonCustom from '../button/ButtonCustom.vue';
import IconDelete from '../svg/IconDelete.vue';
import IconSearch from '../svg/IconSearch.vue';

const emit = defineEmits(['search', 'update:modelValue']);

const props = defineProps<{
  modelValue?: string;
  disabled?: boolean;
  focus?: boolean;
}>();

const searchTerm = ref(props.modelValue);

watch(
  () => searchTerm.value,
  (value) => emit('update:modelValue', value)
);

const inputRef = ref();
const focusInput = () => setTimeout(() => inputRef.value.focus(), 500);

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
