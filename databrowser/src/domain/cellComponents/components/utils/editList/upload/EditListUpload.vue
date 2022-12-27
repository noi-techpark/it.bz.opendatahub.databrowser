<template>
  <div>
    <EditListHeader>
      <EditListBackButton label="Back" @click="navigateToPrevious" />
    </EditListHeader>
    <div v-if="isUploadError" class="bg-red-200">
      {{ uploadError }}
    </div>
    <div
      ref="dropZoneRef"
      class="my-5 flex h-24 w-full items-center justify-center rounded border-2 border-dashed"
      :class="{ 'border-green-400': isOverDropZone, hidden: uploading }"
    >
      Drop your images / files here or &nbsp;
      <button type="button" class="text-green-500" @click="open()">
        browse
      </button>
    </div>
    <div
      v-if="uploading"
      class="flex h-24 w-full flex-col justify-between rounded border-2 p-3"
    >
      <div class="flex w-full items-center justify-between">
        <span class="font-semibold">{{ files?.length }} Files Uploading</span>
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
import { useDropZone, useFileDialog } from '@vueuse/core';
import { computed, defineProps, ref, watch } from 'vue';
import IconDelete from '../../../../../../components/svg/IconDelete.vue';
import ProgressBar from '../../../../../../components/progress/ProgressBar.vue';
import EditListBackButton from '../EditListBackButton.vue';
import EditListHeader from '../EditListHeader.vue';
import { useUploadForType } from './useUpload';
import { useInjectNavigation } from '../actions/useNavigation';
import { useInjectActionTriggers } from '../actions/useActions';

const props = defineProps<{ type: 'image' | 'file' }>();

const dropZoneRef = ref<HTMLDivElement>();

const onDrop = (filesFromDropZone: File[] | null) => {
  if (filesFromDropZone == null) {
    return;
  }
  uploadFiles(filesFromDropZone);
};

const { isOverDropZone } = useDropZone(dropZoneRef, onDrop);

const { files, open } = useFileDialog();

const uploadType = computed(() => props.type);

const {
  isUploadError,
  uploading,
  uploadAbortController,
  uploadError,
  uploadProgress,
  uploadFiles,
  onUploadSuccess,
} = useUploadForType(uploadType);

watch(files, (filesFromFileDialog) => {
  if (filesFromFileDialog == null) {
    return;
  }

  const filesToUpload = Array.from(filesFromFileDialog);

  // Trigger file upload
  uploadFiles(filesToUpload);
});

const { navigateToPrevious } = useInjectNavigation();

const { addItems } = useInjectActionTriggers();

onUploadSuccess((urls: string[]) => {
  const items = urls.map((url) => ({ src: url }));
  addItems(items);
  navigateToPrevious();
});
</script>
