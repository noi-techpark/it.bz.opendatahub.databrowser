<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <div>
    <PushDataPopup :publishers="publishersWithUrl" />
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { usePublisherStore } from '../../../../publisher/publisherStore';
import PushDataPopup from './PushDataPopup.vue';
import { computed } from 'vue';
import { Publisher } from './types';

const props = defineProps<{ id?: string; type?: string }>();

const { publishers } = storeToRefs(usePublisherStore());

// Compute the publishers with the URL to push data to
const publishersWithUrl = computed(() =>
  publishers.value.map<Publisher>((publisher) => ({
    id: publisher.id,
    name: publisher.name,
    url: publisher.buildUrl(props.id, props.type),
  }))
);
</script>
