<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <div>
    <PushDataPopup :id="id" :publishers="publishersWithUrl" />
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { computed } from 'vue';
import { usePublisherStore } from '../../../../publisher/publisherStore';
import PushDataPopup from './PushDataPopup.vue';
import { Publisher } from './types';

const props = defineProps<{
  id?: string;
  type?: string;
  publishedOn?: string[];
}>();

const { publishers } = storeToRefs(usePublisherStore());

// Compute the publishers with the URL to push data to
const publishersWithUrl = computed(() => {
  if (props.publishedOn == null || props.publishedOn.length === 0) {
    return [];
  }

  return (
    publishers.value
      // Use only publishers that are in the publishedOn list
      .filter(
        (publisher) =>
          props.publishedOn?.find((pon) => pon === publisher.id) != null
      )
      .map<Publisher>((publisher) => ({
        id: publisher.id,
        name: publisher.name,
        url: publisher.buildUrl(props.id, props.type),
      }))
  );
});
</script>
