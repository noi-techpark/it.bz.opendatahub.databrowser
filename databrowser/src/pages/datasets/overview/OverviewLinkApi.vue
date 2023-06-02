<template>
  <ButtonExternalLink
    v-if="dataset.externalLink != null"
    target="_blank"
    :href="dataset.externalLink"
    :size="Size.xm2col"
    :variant="Variant.ghost"
    :data-test="`dataset-api-link-${dataset.id}`"
  >
    <IconLink />
    <span class="uppercase">
      {{ t('overview.cardItem.showDatasetApi') }}
    </span>
  </ButtonExternalLink>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import ButtonExternalLink from '../../../components/button/ButtonExternalLink.vue';
import { Size, Variant } from '../../../components/button/types';
import IconLink from '../../../components/svg/IconLink.vue';
import { TourismMetaData } from '../../../domain/metaDataConfig/tourism/types';

const { t } = useI18n();

defineProps<{ dataset: TourismMetaData }>();
</script>
