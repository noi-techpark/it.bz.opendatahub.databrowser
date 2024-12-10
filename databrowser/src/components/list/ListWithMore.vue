<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <div class="flex">
    {{ dataset.sources[0] }}
    <PopoverCustom v-if="dataset.sources.length > 0" has-arrow>
      <template #trigger>
        <PopoverCustomButton
          v-if="dataset.sources.length > 1"
          class="ml-1 text-green-700"
        >
          +{{ dataset.sources.length - 1 }} others
        </PopoverCustomButton>
      </template>
      <template #container>
        <PopoverCustomPanel>
          <PopoverContent class="text-sm text-dialog">
            <span>
              {{ dataset.sources.slice(1).join(', ') }}
            </span>
          </PopoverContent>
        </PopoverCustomPanel>
      </template>
    </PopoverCustom>
  </div>
</template>

<script setup lang="ts">
import { TourismMetaData } from '../../domain/metaDataConfig/tourism/types';
import PopoverCustom from '../popover/PopoverCustom.vue';
import PopoverCustomPanel from '../popover/PopoverCustomPanel.vue';
import PopoverContent from '../popover/PopoverContent.vue';
import PopoverCustomButton from '../popover/PopoverCustomButton.vue';

defineProps<{ dataset: TourismMetaData }>();
</script>
