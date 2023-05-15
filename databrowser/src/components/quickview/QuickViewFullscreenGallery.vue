<template>
  <div class="relative flex items-center overflow-x-hidden md:gap-2">
    <div
      v-for="(image, i) in images"
      :id="`image-in-gallery-${i}`"
      :key="i"
      class="w-full shrink-0 bg-cover bg-center"
      :style="{
        maxWidth: `${imageWidth}px`,
        height: height + 'px',
        backgroundImage: `url(${image.ImageUrl})`,
        marginLeft: i === 0 ? currentMarginLeft : ``,
      }"
    />
    <div
      v-if="currentMediaIndex > 0"
      class="absolute top-1/2 left-2 right-auto flex h-9 w-9 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-gray-250 bg-white hover:bg-green-400/90 hover:text-white"
      @click="prevImage()"
    >
      <ChevronRight class="h-3 -scale-x-100" />
    </div>
    <div
      v-if="showNextIcon"
      class="absolute right-2 top-1/2 flex h-9 w-9 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-gray-250 bg-white hover:bg-green-400/90 hover:text-white"
      @click="nextImage()"
    >
      <ChevronRight class="h-3" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, withDefaults, ref, toRefs, computed } from 'vue';

import ChevronRight from '../svg/ChevronRight.vue';

interface Image {
  ImageUrl: string;
}

const props = withDefaults(
  defineProps<{
    images: Array<Image>;
    height?: number;
  }>(),
  {
    images: () => [],
    height: 250,
  }
);

const { images } = toRefs(props);
const imageWidth = 400;
const currentMediaIndex = ref(0);
const showNextIcon = ref(true);

const currentMarginLeft = computed(() => {
  const currentImageWidth =
    imageWidth > window.innerWidth ? window.innerWidth : imageWidth;
  return `-${currentMediaIndex.value * currentImageWidth}px`;
});

const nextImage = () => {
  currentMediaIndex.value++;
  checkShowNextIcon(false);
};

const prevImage = () => {
  currentMediaIndex.value--;
  checkShowNextIcon(true);
};

const checkShowNextIcon = (isPrev: boolean) => {
  const lastImage = document.getElementById(
    `image-in-gallery-${images.value.length - 1}`
  );

  const { right } = lastImage!.getBoundingClientRect();
  showNextIcon.value = isPrev
    ? right + imageWidth > window.innerWidth
    : right - imageWidth > window.innerWidth;
};
</script>
