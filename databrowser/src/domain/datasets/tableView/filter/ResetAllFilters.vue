<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <ButtonCustom
    class="flex items-center gap-2 p-2 py-1"
    :size="Size.xs"
    :variant="Variant.ghost"
    @click="emit('resetAllFilters')"
  >
    <IconDelete class="text-delete" />
    {{
      t(
        'datasets.listView.toolBox.searchAndFilter.otherFilters.resetAllFilters'
      )
    }}
  </ButtonCustom>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { Size, Variant } from '../../../../components/button/types';
import ButtonCustom from '../../../../components/button/ButtonCustom.vue';
import IconDelete from '../../../../components/svg/IconDelete.vue';

const { t } = useI18n();

const emit = defineEmits(['resetAllFilters']);
</script>
