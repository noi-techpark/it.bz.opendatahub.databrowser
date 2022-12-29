<template>
  <div v-if="imgSrc != null" class="flex">
    <div class="flex items-start gap-3 rounded border-2 p-2">
      <img :src="imgSrc" :alt="alt" :style="style" />
      <button type="button" title="Delete image" @click="deleteImage">
        <IconDelete class="text-delete" />
      </button>
    </div>
  </div>
  <FileUpload
    v-else
    type="image"
    text="Drop your image here"
    @upload-success="uploadSuccess"
  />
</template>

<script setup lang="ts">
import { defineEmits, defineProps, ref, watch, withDefaults } from 'vue';
import IconDelete from '../../../../../components/svg/IconDelete.vue';
import { resizeImageWidth } from '../../../../image';
import FileUpload from '../../utils/upload/FileUpload.vue';

const emit = defineEmits(['update']);

const props = withDefaults(
  defineProps<{
    width?: string;
    alt?: string;
    src?: string;
    editable?: boolean;
    readonly?: string | boolean;
  }>(),
  {
    width: '100%',
    alt: undefined,
    src: undefined,
    editable: true,
    readonly: false,
  }
);

const imgSrc = ref<string>();
const style = ref<Record<string, string>>();

watch(
  props,
  ({ src, width }) => {
    // Apply default settings
    imgSrc.value = src;
    style.value = undefined;

    // If no width is given, default settings are correct
    if (width == null) {
      return;
    }

    const isPercentageWidth = width.trim().endsWith('%');

    if (isPercentageWidth) {
      style.value = { width };
    } else {
      const widthAsNumber = Number(width);

      // If width is a number, than adapt URL
      if (!isNaN(widthAsNumber)) {
        imgSrc.value = resizeImageWidth(widthAsNumber, src);
      }
    }
  },
  { immediate: true }
);

const deleteImage = () => update();

const uploadSuccess = (urls: string[]) => {
  if (urls == null || urls[0] == null) {
    return;
  }
  update(urls[0]);
};

const update = (value?: string | undefined) =>
  emit('update', { prop: 'src', value });
</script>
