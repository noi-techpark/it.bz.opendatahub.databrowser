<template>
  <div>
    <EditImageGalleryHeader>
      <BackButton label="Back" @navigate="navigateToPrevious" />
    </EditImageGalleryHeader>
    <div v-if="isUploadError" class="bg-red-200">
      {{ uploadError }}
    </div>
    <div
      ref="dropZoneRef"
      class="
        flex
        justify-center
        items-center
        my-5
        w-full
        h-24
        rounded
        border-2 border-dashed
      "
      :class="{ 'border-green-400': isOverDropZone, hidden: uploading }"
    >
      Drop your logos / files here or &nbsp;
      <button type="button" class="text-green-500" @click="open()">
        browse
      </button>
    </div>
    <div
      v-if="uploading"
      class="flex flex-col justify-between p-3 w-full h-24 rounded border-2"
    >
      <div class="flex justify-between items-center w-full">
        <span class="font-semibold">X Images Uploading</span>
        <button @click="uploadAbortController.abort()">
          <IconDelete class="text-delete" />
        </button>
      </div>
      <div>{{ uploadProgress }}%</div>
      <div class="w-full">
        <ProgressBar :percentage="uploadProgress" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
//import { useDropZone, useFileDialog } from '@vueuse/core';
import { defineEmits, ref, watch } from 'vue';
import IconDelete from '../../../../../../components/svg/IconDelete.vue';
import ProgressBar from '../../../../../../components/progress/ProgressBar.vue';
import EditImageGalleryHeader from '../EditImageGalleryHeader.vue';
import BackButton from '../BackButton.vue';
import { useEditImageGalleryNavigation } from '../store/useEditImageGalleryNavigation';
import { useImageUpload } from '../useImageUpload';

const emit = defineEmits(['uploadSuccess']);

const { navigateToPrevious } = useEditImageGalleryNavigation();

const dropZoneRef = ref<HTMLDivElement>();

const onDrop = (filesFromDropZone: File[] | null) => {
  if (filesFromDropZone == null) {
    return;
  }
  uploadFile(filesFromDropZone);
};

const { isOverDropZone } = useDropZone(dropZoneRef, onDrop);

const { files, open } = useFileDialog();

const {
  isUploadError,
  isUploadSuccess,
  uploading,
  uploadAbortController,
  uploadError,
  uploadProgress,
  uploadResponse,
  uploadFile,
} = useImageUpload();

watch(files, async (filesFromFileDialog) => {
  if (filesFromFileDialog == null) {
    return;
  }

  const filesToUpload = Array.from(filesFromFileDialog);

  // Trigger file upload
  await uploadFile(filesToUpload);
});

watch([isUploadSuccess, uploadResponse], ([isSuccess, fileUrls]) => {
  if (isSuccess) {
    emit('uploadSuccess', fileUrls);
  }
});
</script>
