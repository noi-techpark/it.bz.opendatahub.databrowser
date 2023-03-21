<template>
  <CardIconGrid>
    <IconNumberOfRecords class="mt-0.5" />
    <div class="flex flex-col gap-2 leading-tight text-gray-600">
      <span class="font-semibold">
        {{ t('overview.info.recordCount.availableRecords') }}
      </span>
      <ul v-if="dataset.recordCount">
        <li v-if="dataset.recordCount.open" class="flex justify-between">
          <span>{{ t('overview.info.recordCount.open') }}</span>
          <span>{{ dataset.recordCount.open }}</span>
        </li>
        <li v-if="dataset.recordCount.reduced" class="flex justify-between">
          <span>{{ t('overview.info.recordCount.reduced') }}</span>
          <span>{{ dataset.recordCount.reduced }}</span>
        </li>
        <li v-if="dataset.recordCount.closed" class="flex justify-between">
          <span>{{ t('overview.info.recordCount.closed') }}</span>
          <span>{{ dataset.recordCount.closed }}</span>
        </li>
      </ul>
    </div>
  </CardIconGrid>
</template>

<script setup lang="ts">
import { TourismMetaData } from '../../../domain/metaDataConfig/tourism/types';
import CardIconGrid from '../../../components/card/CardIconGrid.vue';
import IconNumberOfRecords from '../../../components/svg/IconNumberOfRecords.vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

defineProps<{ dataset: TourismMetaData }>();
</script>
