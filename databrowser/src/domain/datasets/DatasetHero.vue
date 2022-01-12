<template>
  <HeroContainer>
    <HeroTitle>{{ title }}</HeroTitle>
    <HeroSubTitle>{{ subtitle }}</HeroSubTitle>
    <InternalLink to="/" tone="primary">More information</InternalLink>
  </HeroContainer>
</template>

<script setup lang="ts">
import { defineProps, toRefs } from 'vue';
import HeroContainer from '../../components/hero/HeroContainer.vue';
import HeroTitle from '../../components/hero/HeroTitle.vue';
import HeroSubTitle from '../../components/hero/HeroSubTitle.vue';
import InternalLink from '../../components/link/InternalLink.vue';

const props = defineProps<{
  title?: string;
  subtitle?: string;
}>();

const { title, subtitle } = toRefs(props);
</script>
