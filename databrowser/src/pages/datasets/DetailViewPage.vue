<template>
  <AppLayout>
    <ContentArea>
      <div
        class="flex relative py-7 space-x-4 border-t border-b border-gray-300"
      >
        <ViewPills
          :view="view"
          :dataset-type="datasetType"
          :dataset-id="datasetId"
        />
        <div class="absolute right-0">
          <LanguagePicker />
        </div>
      </div>
      <div>
        Dataset Detail Page (type = {{ datasetType }}, ID = {{ datasetId }})
      </div>
    </ContentArea>
  </AppLayout>
</template>

<script class="ts">
import AppLayout from '../../layouts/AppLayout.vue';
import ContentArea from '../../components/content/ContentArea.vue';
import LanguagePicker from '../../components/languageSwitcher/LanguagePicker.vue';
import { useRoute } from 'vue-router';
import { defineComponent } from '@vue/runtime-core';
import ViewPills from '../../domain/datasets/navigation/ViewPills.vue';
import { ViewPill } from '../../domain/datasets/navigation/types';

export default defineComponent({
  components: {
    ViewPills,
    AppLayout,
    LanguagePicker,
    ContentArea,
  },
  setup() {
    const route = useRoute();
    const datasetType = route.params.datasetType;
    const datasetId = route.params.datasetId;

    return {
      view: ViewPill.detail,
      datasetType,
      datasetId,
    };
  },
});
</script>
