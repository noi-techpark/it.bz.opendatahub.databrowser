<template>
  <div class="flex flex-none items-center gap-5 px-3">
    <EditListDeleteDialog
      title="Confirm deletion"
      description="Are you sure you want to delete all items?"
      :show-dialog="showDialog"
      @close="showDialog = false"
      @confirm-delete="deleteAllItems"
    />
    <EditListDeleteButton
      :disabled="false"
      text="Delete all items"
      @click="showDialog = true"
    />

    <slot name="addItems"></slot>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import EditListDeleteButton from '../EditListDeleteButton.vue';
import EditListDeleteDialog from '../dialogs/EditListDeleteDialog.vue';
import { useInjectActionTriggers } from '../actions/useActions';

const showDialog = ref(false);

const { deleteAllItems } = useInjectActionTriggers();
</script>
