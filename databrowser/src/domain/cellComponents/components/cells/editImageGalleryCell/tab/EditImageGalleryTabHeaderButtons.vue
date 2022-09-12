<template>
  <div class="flex flex-none gap-5 items-center px-3">
    <DeleteImageDialog
      title="Confirm deletion"
      description="Are you sure you want to delete all images?"
      @confirm-delete="emit('deleteAllImages')"
    />
    <DeleteImagesButton
      :disabled="false"
      text="Delete all images"
      @delete-images="dialogsStore.dialogVisible = true"
    />
    <AddImagesButton @add-image="emit('addImage')" />
  </div>
</template>

<script setup lang="ts">
import { defineEmits } from 'vue';
import DeleteImagesButton from '../DeleteImagesButton.vue';
import AddImagesButton from '../AddImagesButton.vue';
import DeleteImageDialog from '../dialogs/DeleteImageDialog.vue';
import { useDeleteImageDialogStore } from '../dialogs/deleteImageDialogStore';

const emit = defineEmits(['addImage', 'deleteAllImages']);

const dialogsStore = useDeleteImageDialogStore();
</script>
