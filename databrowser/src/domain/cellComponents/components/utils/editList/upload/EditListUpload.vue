<template>
  <div>
    <EditListHeader>
      <EditListBackButton label="Back" @click="navigateToPrevious" />
    </EditListHeader>
    <FileUpload :type="type" :multiple="true" @upload-success="uploadSuccess" />
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import EditListBackButton from '../EditListBackButton.vue';
import EditListHeader from '../EditListHeader.vue';
import { useInjectNavigation } from '../actions/useNavigation';
import { useInjectActionTriggers } from '../actions/useActions';
import FileUpload from '../../upload/FileUpload.vue';

defineProps<{ type: 'image' | 'file' }>();

const { navigateToPrevious } = useInjectNavigation();

const { addItems } = useInjectActionTriggers();

const uploadSuccess = (urls: string[]) => {
  const items = urls.map((url) => ({ src: url }));
  addItems(items);
  navigateToPrevious();
};
</script>