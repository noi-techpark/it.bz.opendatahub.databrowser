<template>
  <div>
    <EditImageGalleryHeader>
      <BackButton label="Back to overview" @navigate="navigateToTable" />
    </EditImageGalleryHeader>
    <EditImageGalleryTabHeaderButtons
      class="mb-5 flex justify-between md:hidden"
      @delete-all-images="emit('deleteAllImages')"
    />
    <div class="flex items-center justify-between bg-gray-50 text-sm">
      <div
        ref="tabWrapper"
        class="flex w-full flex-nowrap items-center overflow-auto"
      >
        <TabCustom
          v-for="(image, index) in images"
          :key="index"
          :active="currentIndex === index"
          class="w-36 flex-none gap-2"
          :class="[{ 'active-tab': currentIndex === index }]"
          @click="emit('changeCurrentIndex', index)"
        >
          <img
            :src="resizeImageWidth(30, image.src)"
            :alt="image.alt"
            class="h-5"
          />
          <span>Image {{ index + 1 }}</span>
        </TabCustom>
      </div>

      <EditImageGalleryTabHeaderButtons
        class="hidden md:flex"
        @delete-all-images="emit('deleteAllImages')"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineEmits, defineProps, ref } from 'vue';
import TabCustom from '../../../../../../components/tab/TabCustom.vue';
import { resizeImageWidth } from '../../../../../image';
import EditImageGalleryHeader from '../EditImageGalleryHeader.vue';
import EditImageGalleryTabHeaderButtons from './EditImageGalleryTabHeaderButtons.vue';
import BackButton from '../BackButton.vue';
import { useEditImageGalleryNavigation } from '../store/useEditImageGalleryNavigation';

const emit = defineEmits(['changeCurrentIndex', 'deleteAllImages']);

defineProps<{
  images: { src?: string; alt?: string }[];
  currentIndex: number;
}>();

const { navigateToTable } = useEditImageGalleryNavigation();

// Scroll active image tab into view in case there are many images
const tabWrapper = ref();
setTimeout(() =>
  tabWrapper.value.querySelector('.active-tab')?.scrollIntoView()
);
</script>
