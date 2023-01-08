<template>
  <EditListTable :items="items">
    <template #colGroup>
      <col class="w-32 md:w-40" />
      <col class="w-32 md:w-40" />
      <col class="w-32 md:w-40" />
      <col class="w-32 md:w-40" />
      <col class="w-32 md:w-40" />
      <col class="w-32 md:w-40" />
      <col class="w-32 md:w-40" />
    </template>

    <template #tableHeader>
      <TableHeaderCell>Image</TableHeaderCell>
      <TableHeaderCell>Name</TableHeaderCell>
      <TableHeaderCell>URL</TableHeaderCell>
      <TableHeaderCell>Latitude</TableHeaderCell>
      <TableHeaderCell>Longitude</TableHeaderCell>
      <TableHeaderCell>Altitude</TableHeaderCell>
      <TableHeaderCell>Position</TableHeaderCell>
    </template>

    <template #tableCols="{ item }: { item: WebcamEntry }">
      <TableCell>
        <UseFullscreen
          v-slot="{ toggle, isFullscreen }"
          class="flex items-center justify-center md:items-stretch"
        >
          <div
            class="group relative flex cursor-pointer justify-center"
            :class="{ 'items-center': !isFullscreen }"
            @click="toggle()"
          >
            <img :src="item.imageUrl" :alt="item.name" class="object-fit" />
            <IconExpanded
              v-if="!isFullscreen"
              class="absolute text-white transition-all group-hover:scale-125"
            />
          </div>
        </UseFullscreen>
      </TableCell>
      <TableCell>{{ item.name }}</TableCell>
      <TableCell>{{ item.imageUrl }}</TableCell>
      <TableCell>{{ item.latitude }}</TableCell>
      <TableCell>{{ item.longitude }}</TableCell>
      <TableCell>{{ item.altitude }}</TableCell>
      <TableCell>{{ item.listPosition }}</TableCell>
    </template>

    <template #addItems>
      <EditListAddButton :text="'Add new Webcam'" @click="addEmptyItem" />
    </template>
  </EditListTable>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import TableHeaderCell from '../../../../../components/table/TableHeaderCell.vue';
import TableCell from '../../../../../components/table/TableCell.vue';
import EditListTable from '../../utils/editList/table/EditListTable.vue';
import EditListAddButton from '../../utils/editList/EditListAddButton.vue';
import { useInjectActionTriggers } from '../../utils/editList/actions/useActions';
import UseFullscreen from '../../../../../components/fullscreen/UseFullscreen.vue';
import IconExpanded from '../../../../../components/svg/IconExpanded.vue';

// Need to define interface in component because of Vue 3.2 bug (https://github.com/vuejs/core/issues/4294)
// Should be fixed in Vue 3.3
export interface WebcamEntry {
  name?: string;
  imageUrl?: string;
  latitude?: string;
  longitude?: string;
  altitude?: string;
  listPosition?: string;
}

defineProps<{ items: WebcamEntry[] }>();

const { addEmptyItem } = useInjectActionTriggers();
</script>
