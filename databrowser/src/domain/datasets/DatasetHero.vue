<template>
  <HeroContainer>
    <HeroTitle>All POIs</HeroTitle>
    <HeroSubTitle
      >Lorem ipsum dolor sit amen dolr sit amen dolr ist ist amen.
    </HeroSubTitle>
    <InternalLink to="/" tone="primary">More information</InternalLink>
  </HeroContainer>
</template>

<script lang="ts">
import HeroContainer from '../../components/hero/HeroContainer.vue';
import HeroTitle from '../../components/hero/HeroTitle.vue';
import HeroSubTitle from '../../components/hero/HeroSubTitle.vue';
import InternalLink from '../../components/link/InternalLink.vue';
import { defineComponent } from '@vue/runtime-core';

export default defineComponent({
  components: { HeroContainer, InternalLink, HeroSubTitle, HeroTitle },
});
</script>
