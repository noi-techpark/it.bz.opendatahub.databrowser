<template>
  <div
    class="flex gap-5 justify-between mt-2 mb-5 md:justify-end"
    :class="anyImageSelected ? 'text-default' : 'text-disabled'"
  >
    <DeleteImageDialog
      title="Confirm deletion"
      description="Are you sure you want to delete all selected images?"
      @confirm-delete="emit('deleteImages')"
    />
    <AddImagesButton class="md:hidden" />
    <DeleteImagesButton
      :disabled="!anyImageSelected"
      text="Delete"
      @delete-images="dialogsStore.dialogVisible = true"
    />
  </div>
</template>

<script setup lang="ts">
import { defineEmits, defineProps } from 'vue';
import AddImagesButton from '../AddImagesButton.vue';
import DeleteImagesButton from '../DeleteImagesButton.vue';
import { useDeleteImageDialogStore } from '../dialogs/deleteImageDialogStore';
import DeleteImageDialog from '../dialogs/DeleteImageDialog.vue';

const emit = defineEmits(['deleteImages']);

defineProps<{ anyImageSelected: boolean }>();

const dialogsStore = useDeleteImageDialogStore();
</script>
