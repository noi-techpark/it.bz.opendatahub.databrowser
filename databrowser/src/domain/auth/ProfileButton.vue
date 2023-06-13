<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <div
    class="flex h-8 w-8 items-center justify-center rounded-full text-lg font-bold text-white"
    :class="bgColorClass"
    :title="username"
  >
    {{ letter }}
  </div>
</template>

<script setup lang="ts">
import { computed, toRefs } from 'vue';

const props = defineProps<{
  username?: string;
}>();

const { username } = toRefs(props);

const defaultLetter = '?';

const letter = computed(() =>
  username?.value != null && username.value.length > 0
    ? username.value.at(0)?.toUpperCase()
    : defaultLetter
);

const bgColorClasses = [
  'bg-blue-500',
  'bg-gray-500',
  'bg-green-500',
  'bg-red-500',
  'bg-yellow-500',
];
const bgColorClass = computed(() => {
  const ascii = letter.value?.charCodeAt(0) ?? 0;
  const colorIndex = ascii % bgColorClasses.length;
  return bgColorClasses[colorIndex];
});
</script>
