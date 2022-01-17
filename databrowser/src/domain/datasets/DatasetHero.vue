<template>
  <HeroContainer>
    <HeroTitle>{{ title }}</HeroTitle>
    <HeroSubTitle>{{ subtitle }}</HeroSubTitle>
    <CollapsibleContainer>
      <CollapsiblePanel> Text</CollapsiblePanel>
      <CollapsibleButton class="mt-4">
        {{ $t('datasets.header.moreInformation') }}
      </CollapsibleButton>
    </CollapsibleContainer>
  </HeroContainer>
</template>

<script lang="ts" setup>
import { defineProps, toRefs } from 'vue';
import HeroContainer from '../../components/hero/HeroContainer.vue';
import HeroTitle from '../../components/hero/HeroTitle.vue';
import HeroSubTitle from '../../components/hero/HeroSubTitle.vue';
import CollapsibleContainer from '../../components/collapsible/CollapsibleContainer.vue';
import CollapsibleButton from '../../components/collapsible/CollapsibleButton.vue';
import CollapsiblePanel from '../../components/collapsible/CollapsiblePanel.vue';

const props = defineProps<{
  title?: string;
  subtitle?: string;
}>();

const { title, subtitle } = toRefs(props);
</script>
