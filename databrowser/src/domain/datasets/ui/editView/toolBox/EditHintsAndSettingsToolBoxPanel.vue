<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <ToolBoxPanel>
    <ToolBoxSectionLabel>{{
      t('datasets.toolBox.settings.defineViewPreferences')
    }}</ToolBoxSectionLabel>
    <ToolBoxCard>
      <ShowDeprecatedFields
        v-model="showDeprecated"
        custom-text-classes="font-semibold"
        has-description
      />
    </ToolBoxCard>
    <ToolBoxCard>
      <ToolBoxCardHeader>
        {{ t('datasets.editView.toolBox.editHints.obligatory.header') }}
      </ToolBoxCardHeader>
      <ToolBoxCardBody>
        {{ t('datasets.editView.toolBox.editHints.obligatory.body') }}
      </ToolBoxCardBody>
    </ToolBoxCard>
  </ToolBoxPanel>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import { useI18n } from 'vue-i18n';
import ToolBoxCard from '../../toolBox/ToolBoxCard.vue';
import ToolBoxCardBody from '../../toolBox/ToolBoxCardBody.vue';
import ToolBoxCardHeader from '../../toolBox/ToolBoxCardHeader.vue';
import ToolBoxPanel from '../../toolBox/ToolBoxPanel.vue';
import ToolBoxSectionLabel from '../../toolBox/ToolBoxSectionLabel.vue';
import ShowDeprecatedFields from '../../common/showDeprecatedFields/ShowDeprecatedFields.vue';

const { t } = useI18n();

const showDeprecated = ref(false);
</script>
