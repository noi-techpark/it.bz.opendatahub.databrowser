<template>
  <ButtonLink
    :to="to"
    variant="ghost"
    size="xs"
    class="flex justify-center items-center w-8 h-8 md:w-10"
    ><slot></slot
  ></ButtonLink>
</template>

<script setup lang="ts">
import { defineProps, toRefs } from 'vue';
import { RouteLocationRaw } from 'vue-router';
import ButtonLink from '../../../components/button/ButtonLink.vue';

const props = defineProps<{ to: RouteLocationRaw }>();

const { to } = toRefs(props);
</script>
