<template>
  <CardContainer no-padding>
    <div
      class="flex items-center justify-between bg-gray-50 py-2 text-xl uppercase"
    >
      <TabButton :active="true">More information</TabButton>
    </div>
    <TableCustom>
      <colgroup>
        <col class="w-10 md:w-12" />
        <col class="w-32 md:w-40" />
      </colgroup>
      <TableBody>
        <tr>
          <TableCell>Output</TableCell>
          <TableCell>{{ dataset.output }}</TableCell>
        </tr>
        <tr>
          <TableCell>API version</TableCell>
          <TableCell>{{ dataset.apiVersion }}</TableCell>
        </tr>
        <tr>
          <TableCell>Swagger URL</TableCell>
          <TableCell>
            <ExternalLink
              class="w-fit break-words"
              tone="primary"
              :href="dataset.swaggerUrl"
            >
              {{ dataset.swaggerUrl }}
            </ExternalLink>
          </TableCell>
        </tr>
        <tr>
          <TableCell>Sources</TableCell>
          <TableCell>{{ dataset.sources.join(', ') }}</TableCell>
        </tr>
        <tr>
          <TableCell>OpenData</TableCell>
          <TableCell>{{ dataset.access }}</TableCell>
        </tr>
        <tr>
          <TableCell>Contact and support</TableCell>
          <TableCell>
            <ExternalLink
              class="w-fit"
              href="mailto:info@opendatahub.com"
              tone="primary"
            >
              info@opendatahub.com
            </ExternalLink>
          </TableCell>
        </tr>
        <tr>
          <TableCell>Image licenses</TableCell>
          <TableCell>?</TableCell>
        </tr>
        <!-- <TableRo -->
      </TableBody>
    </TableCustom>
  </CardContainer>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import CardContainer from '../../../components/card/CardContainer.vue';
import TabButton from '../../../components/tab/TabButton.vue';
import TableCustom from '../../../components/table/TableCustom.vue';
import TableBody from '../../../components/table/TableBody.vue';
import TableCell from '../../../components/table/TableCell.vue';
import ExternalLink from '../../../components/link/ExternalLink.vue';
import { TourismMetaData } from '../../../domain/metaDataConfig/tourism/types';

defineProps<{ dataset: TourismMetaData }>();
</script>
