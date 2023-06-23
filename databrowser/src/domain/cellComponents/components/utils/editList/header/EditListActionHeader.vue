<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <div>
    <!--
      The dialog can be hidden here using class "hidden"
      because it uses a teleport to be rendered elsewhere 
    -->
    <EditListDeleteDialog
      class="hidden"
      title="Confirm deletion"
      description="Are you sure you want to delete all selected items?"
      :show-dialog="showDialog"
      @close="showDialog = false"
      @confirm-delete="deleteSelectedItems"
    />

    <slot name="addItems"></slot>

    <EditListDeleteButton
      :disabled="!anyItemSelected"
      :text="deleteLabel"
      @click="showDialog = true"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import EditListDeleteButton from '../EditListDeleteButton.vue';
import EditListDeleteDialog from '../dialogs/EditListDeleteDialog.vue';

const emit = defineEmits(['confirmDelete']);

const showDialog = ref(false);

defineProps<{ anyItemSelected: boolean; deleteLabel: string }>();

const deleteSelectedItems = () => {
  showDialog.value = false;
  emit('confirmDelete');
};
</script>
