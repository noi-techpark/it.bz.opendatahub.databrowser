<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <div class="flex items-baseline gap-2">
    <span>{{ dataset.shortname }}</span>
    <template v-if="dataset.parent != null">
      <InternalLink
        v-if="linkToParent"
        :to="tableViewPathForId(dataset.parent.pathParam).value"
        class="text-[0.8em] font-normal"
      >
        {{ t('overview.dataset.titleJoiner') }} {{ dataset.parent.shortname }}
      </InternalLink>
      <span v-else class="text-[0.8em] font-normal">
        {{ t('overview.dataset.titleJoiner') }} {{ dataset.parent.shortname }}
      </span>
    </template>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { TourismMetaData } from '../../metaDataConfig/tourism/types';
import { usePaths } from '../header/usePaths';
import InternalLink from '../../../components/link/InternalLink.vue';

const { t } = useI18n();

withDefaults(
  defineProps<{
    dataset: { shortname: string; parent?: TourismMetaData };
    linkToParent?: boolean;
  }>(),
  { linkToParent: false }
);

const { tableViewPathForId } = usePaths();
</script>
