<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <ToolBoxPanel>
    <ToolBoxSectionLabel>{{
      t('datasets.toolBox.settings.defineViewPreferences')
    }}</ToolBoxSectionLabel>

    <div class="flex flex-col gap-3">
      <ShowEmptyFields
        v-model="showAll"
        custom-text-classes="font-semibold"
        has-description
      />
      <ShowDeprecatedFields
        v-model="showDeprecated"
        custom-text-classes="font-semibold"
        has-description
      />
      <ShowReferencesFields
        v-model="showReferencesFields"
        custom-text-classes="font-semibold"
        has-description
      />
    </div>
  </ToolBoxPanel>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import { useI18n } from 'vue-i18n';
import ToolBoxPanel from './ToolBoxPanel.vue';
import ToolBoxSectionLabel from './ToolBoxSectionLabel.vue';
import ShowDeprecatedFields from '../common/showDeprecatedFields/ShowDeprecatedFields.vue';
import ShowEmptyFields from '../common/showEmptyFields/ShowEmptyFields.vue';
import ShowReferencesFields from '../common/showReferencesFields/ShowReferencesFields.vue';

const { t } = useI18n();

const showAll = ref(false);
const showDeprecated = ref(false);
const showReferencesFields = ref(true);
</script>
