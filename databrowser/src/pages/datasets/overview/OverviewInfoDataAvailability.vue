<template>
  <CardIconGrid>
    <IconAvailibilityOfData class="mt-0.5" />
    <div class="flex flex-col gap-2 leading-tight text-gray-600">
      <span class="font-semibold">
        {{ t('overview.info.dataAvailability.availability') }}
      </span>
      <TagCustom
        v-if="dataset.access === 'opendata'"
        size="xs"
        type="blue"
        :text="t('overview.info.dataAvailability.accessFull')"
        has-dot
      />
      <TagCustom
        v-if="dataset.access === 'limited' || dataset.access === 'closed'"
        size="xs"
        type="yellow"
        :text="t('overview.info.dataAvailability.accessLimited')"
        has-dot
      />
    </div>
  </CardIconGrid>
</template>

<script setup lang="ts">
import { TourismMetaData } from '../../../domain/metaDataConfig/tourism/types';
import CardIconGrid from '../../../components/card/CardIconGrid.vue';
import IconAvailibilityOfData from '../../../components/svg/IconAvailibilityOfData.vue';
import TagCustom from '../../../components/tag/TagCustom.vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

defineProps<{ dataset: TourismMetaData }>();
</script>
