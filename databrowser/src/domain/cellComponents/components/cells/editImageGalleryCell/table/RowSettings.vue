<template>
  <div class="flex gap-2">
    <EditPopup
      @duplicate="emit('duplicateImage')"
      @push="emit('pushImage')"
      @delete="emit('deleteImage')"
    />
    <ButtonCustom
      variant="ghost"
      size="xs"
      class="flex justify-center items-center w-8 h-6 md:w-10"
      @click="navigateToTab(index)"
    >
      <IconEdit class="stroke-current" />
    </ButtonCustom>
  </div>
</template>

<script setup lang="ts">
import { defineEmits, defineProps } from 'vue';
import EditPopup from './EditPopup.vue';
import ButtonCustom from '../../../../../../components/button/ButtonCustom.vue';
import IconEdit from '../../../../../../components/svg/IconEdit.vue';
import { useEditImageGalleryNavigation } from '../store/useEditImageGalleryNavigation';

const emit = defineEmits(['deleteImage', 'duplicateImage', 'pushImage']);

defineProps<{ index: number }>();

const { navigateToTab } = useEditImageGalleryNavigation();
</script>
