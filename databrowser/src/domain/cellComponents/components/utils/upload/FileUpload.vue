<template>
  <div>
    <div v-if="isUploadError" class="bg-red-200">
      {{ uploadError }}
    </div>
    <div
      ref="dropZoneRef"
      class="flex h-24 w-full items-center justify-center rounded border-2 border-dashed"
      :class="{ 'border-green-400': isOverDropZone, hidden: uploading }"
    >
      {{ uploadText }} or &nbsp;
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
        <button title="Abort upload" @click="uploadAbortController.abort()">
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
import { computed, defineEmits, defineProps, ref, watch } from 'vue';
import { toRefs, useDropZone, useFileDialog } from '@vueuse/core';
import { useUploadForType } from './useUpload';
import IconDelete from '../../../../../components/svg/IconDelete.vue';
import ProgressBar from '../../../../../components/progress/ProgressBar.vue';

const emit = defineEmits(['uploadSuccess', 'uploadError']);

const props = defineProps<{
  type: 'image' | 'file';
  text?: string;
  multiple?: boolean;
}>();

const { type: uploadType } = toRefs(props);

const uploadText = computed(() => {
  if (props.text != null) {
    return props.text;
  }

  if (props.multiple === true) {
    return 'Drop your files here';
  }

  return 'Drop your file here';
});

const dropZoneRef = ref<HTMLDivElement>();

const onDrop = (filesFromDropZone: File[] | null) => {
  if (filesFromDropZone == null) {
    return;
  }
  uploadFiles(filesFromDropZone);
};

const { isOverDropZone } = useDropZone(dropZoneRef, onDrop);

const { files, open } = useFileDialog({ multiple: props.multiple });

const {
  isUploadError,
  uploading,
  uploadAbortController,
  uploadError,
  uploadProgress,
  uploadFiles,
  onUploadSuccess,
  onUploadError,
} = useUploadForType(uploadType);

watch(files, (filesFromFileDialog) => {
  if (filesFromFileDialog == null) {
    return;
  }

  const filesToUpload = Array.from(filesFromFileDialog);

  // Trigger file upload
  uploadFiles(filesToUpload);
});

onUploadSuccess((urls: string[]) => emit('uploadSuccess', urls));

onUploadError((message: string) => emit('uploadError', message));
</script>
