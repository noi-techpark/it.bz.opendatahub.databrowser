<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <PopoverCustom>
    <template #trigger>
      <PopoverCustomButton
        v-slot="{ open }"
        :disabled="disabled"
        :class="buttonClasses"
        class="flex items-center justify-center gap-2 px-2 py-px"
      >
        {{ t('components.pushData.sendPushNotifications') }}
        <IconStrokedArrowDown
          class="size-5 stroke-current"
          :class="{ 'rotate-180': open }"
        />
      </PopoverCustomButton>
    </template>
    <template #container>
      <PopoverCustomPanel>
        <PopoverContentFrame class="max-w-lg">
          <PushDataPopupContent :id="id" :publishers="publishers" />
        </PopoverContentFrame>
      </PopoverCustomPanel>
    </template>
  </PopoverCustom>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { computeButtonClasses } from '../../../../../components/button/styles';
import { Size, Variant } from '../../../../../components/button/types';
import PopoverContentFrame from '../../../../../components/popover/PopoverContentFrame.vue';
import PopoverCustom from '../../../../../components/popover/PopoverCustom.vue';
import PopoverCustomButton from '../../../../../components/popover/PopoverCustomButton.vue';
import PopoverCustomPanel from '../../../../../components/popover/PopoverCustomPanel.vue';
import IconStrokedArrowDown from '../../../../../components/svg/IconStrokedArrowDown.vue';
import { useAuth } from '../../../../auth/store/auth';
import PushDataPopupContent from './PushDataPopupContent.vue';
import { Publisher } from './types';

const { t } = useI18n();

const props = defineProps<{ id?: string; publishers: Publisher[] }>();

const auth = useAuth();
const disabled = computed(
  () => !auth.isAuthenticated || props.publishers.length === 0
);

const buttonClasses = computed(() =>
  computeButtonClasses({
    size: Size.xs,
    variant: Variant.ghost,
    disabled: disabled.value,
  })
);
</script>
