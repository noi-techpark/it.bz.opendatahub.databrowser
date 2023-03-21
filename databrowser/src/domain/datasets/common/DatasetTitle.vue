<template>
  <div class="flex items-baseline gap-2">
    <span>{{ name }}</span>
    <span v-if="showFrom" class="text-[0.6em]">
      {{ t('overview.dataset.titleJoiner') }} {{ parent }}
    </span>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const props = withDefaults(
  defineProps<{ name: string; parent?: string | null }>(),
  {
    parent: '',
  }
);

const showFrom = computed(
  () =>
    props.parent != null &&
    props.parent.length > 0 &&
    props.parent !== props.name
);
</script>
