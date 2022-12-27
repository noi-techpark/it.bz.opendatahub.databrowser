<template>
  <div class="flex gap-2">
    <EditPopup
      @duplicate="emit('duplicate')"
      @push="emit('push')"
      @delete="emit('delete')"
    />
    <ButtonCustom
      variant="ghost"
      size="xs"
      class="flex justify-center items-center w-8 h-6 md:w-10"
      @click="emit('navigateToTab')"
    >
      <IconEdit class="stroke-current" />
    </ButtonCustom>
  </div>
</template>

<script setup lang="ts">
import { defineEmits } from 'vue';
import EditPopup from './EditPopup.vue';
import ButtonCustom from '../../../../../../components/button/ButtonCustom.vue';
import IconEdit from '../../../../../../components/svg/IconEdit.vue';

const emit = defineEmits(['delete', 'duplicate', 'push', 'navigateToTab']);
</script>
