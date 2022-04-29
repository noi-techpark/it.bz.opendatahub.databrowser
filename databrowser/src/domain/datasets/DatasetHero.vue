<template>
  <HeroContainer :class="{ 'animate-pulse': !isFinished }">
    <HeroTitle>{{ title }}</HeroTitle>
    <HeroSubTitle>{{ subtitle }}</HeroSubTitle>
    <CollapsibleContainer v-if="hasDescription">
      <CollapsiblePanel>{{ description }}</CollapsiblePanel>
      <CollapsibleButton
        :show-less-text="$t('datasets.header.lessInformation')"
        :show-more-text="$t('datasets.header.moreInformation')"
        class="mt-4"
      >
      </CollapsibleButton>
    </CollapsibleContainer>
  </HeroContainer>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import HeroContainer from '../../components/hero/HeroContainer.vue';
import HeroTitle from '../../components/hero/HeroTitle.vue';
import HeroSubTitle from '../../components/hero/HeroSubTitle.vue';
import CollapsibleContainer from '../../components/collapsible/CollapsibleContainer.vue';
import CollapsibleButton from '../../components/collapsible/CollapsibleButton.vue';
import CollapsiblePanel from '../../components/collapsible/CollapsiblePanel.vue';
import { useDatasetHeroDescription } from './hero/useDatasetHeroDescription';

const { title, subtitle, description, isFinished } =
  useDatasetHeroDescription();

const hasDescription = computed(
  () => description?.value != null && description.value.length > 0
);
</script>
