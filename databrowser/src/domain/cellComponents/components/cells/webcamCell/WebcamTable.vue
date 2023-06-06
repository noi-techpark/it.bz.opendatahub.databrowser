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
      <TableCell>
        <UrlCell :text="item.imageUrl" :editable="editable" />
      </TableCell>
      <TableCell>{{ item.latitude }}</TableCell>
      <TableCell>{{ item.longitude }}</TableCell>
      <TableCell>{{ item.altitude }}</TableCell>
      <TableCell>{{ item.listPosition }}</TableCell>
    </template>
    <template #noItems>No webcams have been defined yet</template>
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
import { WebcamEntry } from './types';
import UrlCell from '../UrlCell/UrlCell.vue';
import { useInjectEditMode } from '../../utils/editList/actions/useEditMode';

defineProps<{ items: WebcamEntry[] }>();

const { addEmptyItem } = useInjectActionTriggers();

const { editable } = useInjectEditMode();
</script>
