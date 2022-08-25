<template>
  <div class="flex flex-wrap gap-8 md:flex-nowrap">
    <div v-if="isUploadError" class="basis-full bg-red-200">
      {{ uploadError }}
    </div>
    <div class="basis-full md:basis-1/3 md:order-1">
      <SubCategoryItem title="Name">
        <InputSingleLineCell
          :value="image.name"
          @input="textChange('name', $event)"
        />
      </SubCategoryItem>
      <SubCategoryItem title="Title">
        <InputSingleLineCell
          :value="image.title"
          @input="textChange('title', $event)"
        />
      </SubCategoryItem>
      <SubCategoryItem title="Description">
        <InputSingleLineCell
          :value="image.description"
          @input="textChange('description', $event)"
        />
      </SubCategoryItem>
      <SubCategoryItem title="Copyright">
        <InputSingleLineCell
          :value="image.copyright"
          @input="textChange('copyright', $event)"
        />
      </SubCategoryItem>
      <SubCategoryItem title="License">
        <InputSingleLineCell
          :value="image.license"
          @input="textChange('license', $event)"
        />
      </SubCategoryItem>
      <SubCategoryItem title="Source">
        <InputSingleLineCell
          :value="image.source"
          @input="textChange('source', $event)"
        />
      </SubCategoryItem>
    </div>
    <div class="basis-full md:basis-1/3 md:order-3">
      <div class="rounded border">
        <div class="flex justify-between items-center py-3 px-4 bg-gray-50">
          <span class="font-semibold">Info &amp; action</span>
        </div>
        <div class="p-4 divide-y">
          <div class="mb-3 font-semibold">
            <div>Resolution</div>
            <div class="text-black">
              {{ image.width }} x {{ image.height }} PX (W/H)
            </div>
          </div>
          <div>
            <button class="flex gap-3 items-center m-3" @click="changeImage">
              <IconUpload class="text-green-500" />
              <span>Change image</span>
            </button>
          </div>
          <div>
            <button
              class="flex gap-3 items-center m-3"
              @click="downloadImage(image.src, image.title)"
            >
              <IconDownload class="text-green-500" />
              <span>Download image</span>
            </button>
          </div>
          <div>
            <button
              class="flex gap-3 items-center m-3"
              @click="emit('duplicateImage')"
            >
              <IconCopy class="text-green-500" />
              <span>Duplicate</span>
            </button>
          </div>
          <div>
            <button
              class="flex gap-3 items-center mx-3 mt-3"
              @click="emit('deleteImage')"
            >
              <IconDelete class="text-delete" />
              <span>Delete</span>
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="basis-full md:basis-1/3 md:order-2">
      <div class="rounded border">
        <div class="flex justify-between items-center py-3 px-4 bg-gray-50">
          <span class="font-semibold">Preview of image</span>
          <button @click="toggle()">
            <IconExpanded
              class="
                text-green-500
                transition-all
                hover:scale-125
                cursor-pointer
              "
            />
          </button>
        </div>

        <div ref="target" class="flex justify-center">
          <img
            :src="resizeImageWidth(400, image.src, isFullscreen)"
            :alt="image.alt"
            :class="{
              'object-contain': isFullscreen,
              'rounded-b': !isFullscreen,
            }"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineEmits, defineProps, ref, watch } from 'vue';
import IconExpanded from '../../../../../../components/svg/IconExpanded.vue';
import SubCategoryItem from '../../../../../datasets/category/SubCategoryItem.vue';
import InputSingleLineCell from '../../inputSingleLineCell/InputSingleLineCell.vue';
//import { useFileDialog, useFullscreen } from '@vueuse/core';
import IconUpload from '../../../../../../components/svg/IconUpload.vue';
import IconDownload from '../../../../../../components/svg/IconDownload.vue';
import IconCopy from '../../../../../../components/svg/IconCopy.vue';
import IconDelete from '../../../../../../components/svg/IconDelete.vue';
import { resizeImageWidth } from '../../../../../image';
import { useImageUpload } from '../useImageUpload';
import { downloadImage } from './imageDownload';

const emit = defineEmits(['deleteImage', 'duplicateImage', 'updateImage']);

// Need to define interface in component because of Vue 3.2 bug (https://github.com/vuejs/core/issues/4294)
// Should be fixed in Vue 3.3
interface ImageGalleryEntry {
  alt?: string;
  src?: string;
  name?: string;
  width?: string;
  height?: string;
  title?: string;
  description?: string;
  copyright?: string;
  license?: string;
  listPosition?: string;
  source?: string;
}

const props = defineProps<{ image: ImageGalleryEntry }>();

const textChange = (key: string, event: Event) => {
  const image = props.image;
  const value = (event.target as HTMLInputElement).value;
  emit('updateImage', { ...image, [key]: value });
};

const target = ref();
const { toggle, isFullscreen } = useFullscreen(target);

const { files, open } = useFileDialog({ multiple: false });

const {
  isUploadError,
  isUploadSuccess,
  uploadError,
  uploadResponse,
  uploadFile,
} = useImageUpload();

watch(files, (filesFromFileDialog) => {
  if (filesFromFileDialog == null) {
    return;
  }

  const filesToUpload = Array.from(filesFromFileDialog);

  // Trigger file upload
  uploadFile(filesToUpload);
});

watch([isUploadSuccess, uploadResponse], ([isSuccess, fileUrls]) => {
  if (isSuccess) {
    const image = props.image;
    emit('updateImage', { ...image, src: fileUrls[0] });
  }
});

const changeImage = () => open();
</script>
