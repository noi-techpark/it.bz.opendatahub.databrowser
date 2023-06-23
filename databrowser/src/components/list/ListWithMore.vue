<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <div class="flex">
    {{ dataset.sources[0] }}
    <TooltipCustom v-if="dataset.sources.length > 0">
      <template #default>
        <button v-if="dataset.sources.length > 1" class="ml-1 text-green-700">
          +{{ dataset.sources.length - 1 }} others
        </button>
      </template>
      <template #container>
        <span class="text-sm text-dialog">
          {{ dataset.sources.slice(1).join(', ') }}
        </span>
      </template>
    </TooltipCustom>
  </div>
</template>

<script setup lang="ts">
import { TourismMetaData } from '../../domain/metaDataConfig/tourism/types';
import TooltipCustom from '../tooltip/TooltipCustom.vue';

defineProps<{ dataset: TourismMetaData }>();
</script>
