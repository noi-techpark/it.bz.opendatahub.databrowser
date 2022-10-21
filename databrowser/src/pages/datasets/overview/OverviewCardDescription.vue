<template>
  <CardContainer>
    <CardTitle>Description</CardTitle>
    <CardText>{{ dataset.description }}</CardText>
  </CardContainer>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import { DatasetDescription } from '../../../config/config-for-pages';
import CardContainer from '../../../components/card/CardContainer.vue';
import CardTitle from '../../../components/card/CardTitle.vue';
import CardText from '../../../components/card/CardText.vue';

defineProps<{ dataset: DatasetDescription }>();
</script>
