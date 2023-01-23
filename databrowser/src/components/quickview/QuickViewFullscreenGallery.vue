<template>
  <div class="gallery-ct">
    <div
      v-for="(image, i) in images"
      :id="`image-in-gallery-${i}`"
      :key="i"
      class="shrink-0 w-full bg-center bg-cover"
      :style="{
        maxWidth: `${imageWidth}px`,
        height: `250px`,
        backgroundImage: `url(${image.ImageUrl})`,
        marginLeft: i === 0 ? currentMarginLeft : ``,
      }"
    />
    <div
      v-if="currentMediaIndex > 0"
      class="control-ct flip-icon"
      @click="prevImage()"
    >
      <ChevronRight />
    </div>
    <div v-if="showNextIcon" class="control-ct" @click="nextImage()">
      <ChevronRight />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';

import ChevronRight from '../svg/ChevronRight.vue';

export default defineComponent({
  name: 'QuickViewFullScreenGallery',

  components: {
    ChevronRight,
  },

  props: {
    images: {
      type: Array,
      default: () => [],
    },
  },

  setup() {
    const imageWidth = 400;

    let currentMediaIndex = ref(0);
    let showNextIcon = ref(true);

    const currentMarginLeft = computed(() => {
      const currentImageWidth =
        imageWidth > window.innerWidth ? window.innerWidth : imageWidth;
      return `-${currentMediaIndex.value * currentImageWidth}px`;
    });

    return {
      imageWidth,
      showNextIcon,
      currentMediaIndex,
      currentMarginLeft,
    };
  },

  methods: {
    nextImage() {
      this.currentMediaIndex++;
      this.checkShowNextIcon(false);
    },

    prevImage() {
      this.currentMediaIndex--;
      this.checkShowNextIcon(true);
    },

    checkShowNextIcon(isPrev: Boolean) {
      const lastImage = document.getElementById(
        `image-in-gallery-${this.images.length - 1}`
      );

      if (lastImage) {
        const { right } = lastImage.getBoundingClientRect();

        this.showNextIcon = isPrev
          ? right + this.imageWidth > window.innerWidth
          : right - this.imageWidth > window.innerWidth;
      }
    },
  },
});
</script>

<style scoped>
.gallery-ct {
  @apply flex overflow-x-hidden relative md:gap-2 items-center;
}

.gallery-ct .control-ct {
  @apply flex items-center justify-center
  rounded-full bg-white cursor-pointer
  w-9 h-9
  absolute
  right-2;

  transform: translate(0, -50%);
  top: 50%;
}

.gallery-ct .control-ct.flip-icon {
  @apply left-2 right-auto;
}

.gallery-ct .control-ct.flip-icon svg {
  @apply -scale-x-100;
}

.gallery-ct .control-ct svg {
  @apply h-3;
}
</style>
