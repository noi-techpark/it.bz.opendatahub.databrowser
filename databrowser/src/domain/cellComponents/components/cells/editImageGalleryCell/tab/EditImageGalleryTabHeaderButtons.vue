<template>
  <div class="flex flex-none gap-5 items-center px-3">
    <DeleteImagesButton
      :disabled="false"
      text="Delete all images"
      @delete-images="emit('deleteAllImages')"
    />
    <AddImagesButton @add-image="emit('addImage')" />
  </div>
</template>

<script setup lang="ts">
import { defineEmits } from 'vue';
import DeleteImagesButton from '../DeleteImagesButton.vue';
import AddImagesButton from '../AddImagesButton.vue';

const emit = defineEmits(['addImage', 'deleteAllImages']);
</script>
