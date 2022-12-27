<template>
  <EditListTab :items="items">
    <template #tabLabel="{ item, index }">
      <img
        :src="resizeImageWidth(30, (item as ImageGalleryEntry).src)"
        :alt="(item as ImageGalleryEntry).alt"
        class="h-5"
      />
      <span>Image {{ index + 1 }}</span>
    </template>

    <template #addItems>
      <EditListAddButton :text="'Add new image'" @click="navigateToAdd" />
    </template>

    <template #body="{ item, index }">
      <div class="flex flex-wrap gap-8 md:flex-nowrap">
        <div v-if="isUploadError" class="basis-full bg-red-200">
          {{ uploadError }}
        </div>
        <div class="basis-full md:order-1 md:basis-1/3">
          <SubCategoryItem title="Name">
            <InputSingleLineCell
              :text="item.name"
              @input="updateItem(index, { name: $event.target.value })"
            />
          </SubCategoryItem>
          <SubCategoryItem title="Title">
            <InputSingleLineCell
              :text="item.title"
              @input="updateItem(index, { title: $event.target.value })"
            />
          </SubCategoryItem>
          <SubCategoryItem title="Description">
            <InputSingleLineCell
              :text="item.description"
              @input="updateItem(index, { description: $event.target.value })"
            />
          </SubCategoryItem>
          <SubCategoryItem title="Copyright">
            <InputSingleLineCell
              :text="item.copyright"
              @input="updateItem(index, { copyright: $event.target.value })"
            />
          </SubCategoryItem>
          <SubCategoryItem title="License">
            <InputSingleLineCell
              :text="item.license"
              @input="updateItem(index, { license: $event.target.value })"
            />
          </SubCategoryItem>
          <SubCategoryItem title="Source">
            <InputSingleLineCell
              :text="item.source"
              @input="updateItem(index, { source: $event.target.value })"
            />
          </SubCategoryItem>
        </div>
        <div class="basis-full md:order-3 md:basis-1/3">
          <div class="rounded border">
            <div class="flex items-center justify-between bg-gray-50 py-3 px-4">
              <span class="font-semibold">Info &amp; action</span>
            </div>
            <div class="divide-y p-4">
              <div class="mb-3 font-semibold">
                <div>Resolution</div>
                <div class="text-black">
                  {{ getResolutionAsText(item) }} (W/H)
                </div>
              </div>
              <div>
                <button
                  class="m-3 flex items-center gap-3"
                  @click="changeImage"
                >
                  <IconUpload class="text-green-500" />
                  <span>Change image</span>
                </button>
              </div>
              <div>
                <button
                  class="m-3 flex items-center gap-3"
                  @click="downloadFile(item.src, item.title)"
                >
                  <IconDownload class="text-green-500" />
                  <span>Download image</span>
                </button>
              </div>
              <div>
                <button
                  class="m-3 flex items-center gap-3"
                  @click="duplicateItem(index)"
                >
                  <IconCopy class="text-green-500" />
                  <span>Duplicate</span>
                </button>
              </div>
              <div>
                <button
                  class="mx-3 mt-3 flex items-center gap-3"
                  @click="deleteItems([index])"
                >
                  <IconDelete class="text-delete" />
                  <span>Delete</span>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="basis-full md:order-2 md:basis-1/3">
          <div class="rounded border">
            <div class="flex items-center justify-between bg-gray-50 py-3 px-4">
              <span class="font-semibold">Preview of image</span>
              <button @click="toggle()">
                <IconExpanded
                  class="cursor-pointer text-green-500 transition-all hover:scale-125"
                />
              </button>
            </div>

            <div ref="target" class="flex justify-center">
              <img
                :src="resizeImageWidth(400, item.src, isFullscreen)"
                :alt="item.alt"
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
  </EditListTab>
</template>

<script setup lang="ts">
import { defineProps, ref, toRefs, watch } from 'vue';
import EditListTab from '../../utils/editList/tab/EditListTab.vue';
import { getResolutionAsText, resizeImageWidth } from '../../../../image';
import EditListAddButton from '../../utils/editList/EditListAddButton.vue';
import { useFileDialog, useFullscreen } from '@vueuse/core';
import { useImageUpload } from '../../utils/editList/upload/useUpload';
import { downloadFile } from '../../utils/editList/download/fileDownload';
import IconExpanded from '../../../../../components/svg/IconExpanded.vue';
import IconDelete from '../../../../../components/svg/IconDelete.vue';
import IconCopy from '../../../../../components/svg/IconCopy.vue';
import IconDownload from '../../../../../components/svg/IconDownload.vue';
import IconUpload from '../../../../../components/svg/IconUpload.vue';
import InputSingleLineCell from '../inputSingleLineCell/InputSingleLineCell.vue';
import SubCategoryItem from '../../../../datasets/category/SubCategoryItem.vue';
import { useInjectActionTriggers } from '../../utils/editList/actions/useActions';
import { useInjectNavigation } from '../../utils/editList/actions/useNavigation';

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

const props = defineProps<{ items: ImageGalleryEntry[] }>();

const { items } = toRefs(props);

const { activeTab, navigateToAdd } = useInjectNavigation();

const { deleteItems, duplicateItem, updateItem, updateItems } =
  useInjectActionTriggers();

const target = ref();
const { toggle, isFullscreen } = useFullscreen(target);

const { files, open } = useFileDialog({ multiple: false });

const {
  isUploadError,
  isUploadSuccess,
  uploadError,
  uploadResponse,
  uploadFiles,
} = useImageUpload();

watch(files, (filesFromFileDialog) => {
  if (filesFromFileDialog == null) {
    return;
  }

  const filesToUpload = Array.from(filesFromFileDialog);

  // Trigger file upload
  uploadFiles(filesToUpload);
});

watch([isUploadSuccess, uploadResponse], ([isSuccess, fileUrls]) => {
  if (isSuccess) {
    const currentImages = items.value;
    const currentImage = currentImages[activeTab.value];
    const nextImage = { ...currentImage, src: fileUrls[0] };
    const nextImages = [...currentImages];
    nextImages[activeTab.value] = nextImage;
    updateItems(nextImages);
  }
});

const changeImage = () => open();
</script>
