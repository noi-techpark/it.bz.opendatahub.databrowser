<template>
  <div class="flex flex-none gap-5 items-center px-3">
    <EditListDeleteDialog
      title="Confirm deletion"
      description="Are you sure you want to delete all items?"
      @confirm-delete="deleteAllItems"
    />
    <EditListDeleteButton
      :disabled="false"
      text="Delete all items"
      @click="dialogsStore.dialogVisible = true"
    />

    <slot name="addItems"></slot>
  </div>
</template>

<script setup lang="ts">
import EditListDeleteButton from '../EditListDeleteButton.vue';
import EditListDeleteDialog from '../dialogs/EditListDeleteDialog.vue';
import { useDeleteDialogStore } from '../dialogs/editListDeleteDialogStore';
import { useInjectActionTriggers } from '../actions/useActions';

const dialogsStore = useDeleteDialogStore();

const { deleteAllItems } = useInjectActionTriggers();
</script>
