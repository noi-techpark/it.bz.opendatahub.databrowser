<template>
  <ButtonCustom variant="ghost" size="sm" :class="classes">
    <slot></slot>
  </ButtonCustom>
</template>

<script lang="ts" setup>
import { defineProps, toRefs } from 'vue';
import ButtonCustom from '../button/ButtonCustom.vue';
import { useTabClasses } from './useTabClasses';

const props = defineProps<{ active?: boolean }>();

const { active } = toRefs(props);

const classes = useTabClasses(active);
</script>

<style scoped>
@import './styles.css';
</style>
