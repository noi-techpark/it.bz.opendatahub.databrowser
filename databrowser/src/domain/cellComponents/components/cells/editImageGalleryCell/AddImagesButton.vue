<template>
  <ButtonCustom
    size="xs"
    class="flex h-6 items-center py-1 px-3"
    @click="navigateToUpload"
  >
    Add images
  </ButtonCustom>
</template>

<script setup lang="ts">
import ButtonCustom from '../../../../../components/button/ButtonCustom.vue';
import { useEditImageGalleryNavigation } from './store/useEditImageGalleryNavigation';

const { navigateToUpload } = useEditImageGalleryNavigation();
</script>
