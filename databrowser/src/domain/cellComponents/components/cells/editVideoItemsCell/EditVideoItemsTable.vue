<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <EditListTable :items="items">
    <template #colGroup>
      <col class="w-32 md:w-60" />
      <col class="w-32 md:w-60" />
      <col class="w-32 md:w-40" />
      <col class="w-32 md:w-40" />
      <col class="w-32 md:w-80" />
      <col class="w-32 md:w-40" />
      <col class="w-32 md:w-40" />
      <col class="w-32 md:w-32" />
    </template>
    <template #tableHeader>
      <TableHeaderCell>Name</TableHeaderCell>
      <TableHeaderCell>Video title</TableHeaderCell>
      <TableHeaderCell>Video source</TableHeaderCell>
      <TableHeaderCell>Streaming source</TableHeaderCell>
      <TableHeaderCell>URL</TableHeaderCell>
      <TableHeaderCell>Copyright</TableHeaderCell>
      <TableHeaderCell>License</TableHeaderCell>
      <TableHeaderCell>Resolution</TableHeaderCell>
    </template>
    <template #tableCols="{ item }">
      <TableCell>{{ item.name }} </TableCell>
      <TableCell>{{ item.videoTitle }}</TableCell>
      <TableCell>{{ item.videoSource }}</TableCell>
      <TableCell>{{ item.streamingSource }}</TableCell>
      <TableCell class="break-all">
        <a v-if="item.url?.startsWith('http')" :href="item.url" target="_blank">
          {{ item.url }}
        </a>
        <span v-else>{{ item.url }}</span>
      </TableCell>
      <TableCell>{{ item.copyright }}</TableCell>
      <TableCell>{{ item.license }}</TableCell>
      <TableCell>{{ getResolutionAsText(item) }}</TableCell>
    </template>
    <template #noItems>No videos</template>
    <template #addItems>
      <EditListAddButton :text="'Add video'" @click="addItems([{}])" />
    </template>
  </EditListTable>
</template>

<script setup lang="ts">
import TableCell from '../../../../../components/table/TableCell.vue';
import TableHeaderCell from '../../../../../components/table/TableHeaderCell.vue';
import { getResolutionAsText } from '../../../../image';
import { useInjectActionTriggers } from '../../utils/editList/actions/useActions';
import EditListAddButton from '../../utils/editList/EditListAddButton.vue';
import EditListTable from '../../utils/editList/table/EditListTable.vue';
import { VideoItemsEntry } from './types';

defineProps<{ items: VideoItemsEntry[] }>();

const { addItems } = useInjectActionTriggers<VideoItemsEntry>();
</script>
