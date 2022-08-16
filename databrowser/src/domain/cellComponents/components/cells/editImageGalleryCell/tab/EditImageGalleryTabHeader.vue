<template>
  <div>
    <EditImageGalleryHeader>
      <BackButton label="Back to overview" @navigate="navigateToTable" />
    </EditImageGalleryHeader>
    <EditImageGalleryTabHeaderButtons
      class="flex justify-between mb-5 md:hidden"
      @delete-all-images="emit('deleteAllImages')"
    />
    <div class="flex justify-between items-center text-sm bg-gray-50">
      <div
        ref="tabWrapper"
        class="flex overflow-auto flex-nowrap items-center w-full"
      >
        <TabCustom
          v-for="(image, index) in images"
          :key="index"
          :active="currentIndex === index"
          class="flex-none gap-2 w-36"
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
