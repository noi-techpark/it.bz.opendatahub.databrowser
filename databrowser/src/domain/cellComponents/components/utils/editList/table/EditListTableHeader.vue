<template>
  <div
    class="mt-2 mb-5 flex justify-between gap-5 md:justify-end"
    :class="anyItemSelected ? 'text-default' : 'text-disabled'"
  >
    <EditListDeleteDialog
      title="Confirm deletion"
      description="Are you sure you want to delete all selected items?"
      :show-dialog="showDialog"
      @close="showDialog = false"
      @confirm-delete="emitItemsSelected"
    />

    <slot name="addItems"></slot>

    <EditListDeleteButton
      :disabled="!anyItemSelected"
      text="Delete"
      @click="showDialog = true"
    />
  </div>
</template>

<script setup lang="ts">
import { defineEmits, defineProps, ref } from 'vue';
import EditListDeleteButton from '../EditListDeleteButton.vue';
import EditListDeleteDialog from '../dialogs/EditListDeleteDialog.vue';

const emit = defineEmits(['deleteSelectedItems']);

const showDialog = ref(false);

defineProps<{ anyItemSelected: boolean }>();

const emitItemsSelected = () => {
  showDialog.value = false;
  emit('deleteSelectedItems');
};
</script>
