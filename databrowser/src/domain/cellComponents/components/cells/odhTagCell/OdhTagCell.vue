<template>
  <EditListCell :items="odhTags">
    <template #table="{ items }">
      <OdhTagTable v-if="url" :items="items" :url="url" />
      <div v-else>
        <AlertError
          title="Can not display Open Data Hub Tags, no URL defined"
          content="This seems to be a configuration problem. Please contact support@opendatahub.com"
        />
      </div>
    </template>
  </EditListCell>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import AlertError from '../../../../../components/alert/AlertError.vue';
import EditListCell from '../../utils/editList/EditListCell.vue';
import OdhTagTable from './OdhTagTable.vue';

defineProps<{
  odhTags?: string[] | null;
  url?: string;
}>();
</script>
