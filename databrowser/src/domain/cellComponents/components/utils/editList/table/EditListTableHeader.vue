<template>
  <div
    class="flex gap-5 justify-between mt-2 mb-5 md:justify-end"
    :class="anyItemSelected ? 'text-default' : 'text-disabled'"
  >
    <EditListDeleteDialog
      title="Confirm deletion"
      description="Are you sure you want to delete all selected items?"
      @confirm-delete="emit('deleteSelectedItems')"
    />

    <slot name="addItems"></slot>

    <EditListDeleteButton
      :disabled="!anyItemSelected"
      text="Delete"
      @click="dialogsStore.dialogVisible = true"
    />
  </div>
</template>

<script setup lang="ts">
import { defineEmits, defineProps } from 'vue';
import EditListDeleteButton from '../EditListDeleteButton.vue';
import EditListDeleteDialog from '../dialogs/EditListDeleteDialog.vue';
import { useDeleteDialogStore } from '../dialogs/editListDeleteDialogStore';

const emit = defineEmits(['deleteSelectedItems']);

defineProps<{ anyItemSelected: boolean }>();

const dialogsStore = useDeleteDialogStore();
</script>
