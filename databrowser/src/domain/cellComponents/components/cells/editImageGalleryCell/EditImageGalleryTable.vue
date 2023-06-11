<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <EditListTable :items="items">
    <template #colGroup>
      <col class="w-32 md:w-40" />
      <col class="w-32 md:w-40" />
      <col class="w-32 md:w-40" />
      <col class="w-32 md:w-40" />
      <col class="w-32 md:w-40" />
      <col class="w-32 md:w-40" />
      <col class="w-20 md:w-28" />
    </template>
    <template #tableHeader>
      <TableHeaderCell>IMAGE</TableHeaderCell>
      <TableHeaderCell>POSITION</TableHeaderCell>
      <TableHeaderCell>Titel</TableHeaderCell>
      <TableHeaderCell>Description</TableHeaderCell>
      <TableHeaderCell>Copyright</TableHeaderCell>
      <TableHeaderCell>License</TableHeaderCell>
      <TableHeaderCell>Resolution</TableHeaderCell>
    </template>

    <template #tableCols="{ item }">
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
            <img
              :src="resizeImageWidth(200, item.src, isFullscreen)"
              :alt="item.alt"
              class="object-fit"
            />
            <IconExpanded
              v-if="!isFullscreen"
              class="absolute text-white transition-all group-hover:scale-125"
            />
          </div>
        </UseFullscreen>
      </TableCell>
      <TableCell>{{ item.listPosition }}</TableCell>
      <TableCell>{{ item.title }}</TableCell>
      <TableCell>{{ item.description }}</TableCell>
      <TableCell>{{ item.copyright }}</TableCell>
      <TableCell>{{ item.license }}</TableCell>
      <TableCell>{{ getResolutionAsText(item) }}</TableCell>
    </template>
    <template #noItems>No images have been uploaded yet</template>
    <template #addItems>
      <EditListAddButton :text="'Add new image'" @click="navigateToAdd" />
    </template>
  </EditListTable>
</template>

<script setup lang="ts">
import TableHeaderCell from '../../../../../components/table/TableHeaderCell.vue';
import TableCell from '../../../../../components/table/TableCell.vue';
import UseFullscreen from '../../../../../components/fullscreen/UseFullscreen.vue';
import IconExpanded from '../../../../../components/svg/IconExpanded.vue';
import { resizeImageWidth } from '../../../../image';
import EditListTable from '../../utils/editList/table/EditListTable.vue';
import EditListAddButton from '../../utils/editList/EditListAddButton.vue';
import { getResolutionAsText } from '../../../../image';
import { useInjectNavigation } from '../../utils/editList/actions/useNavigation';
import { ImageGalleryEntry } from './types';

defineProps<{ items: ImageGalleryEntry[] }>();

const { navigateToAdd } = useInjectNavigation();
</script>
