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
        <!-- Dirty workaround to reset component state when popup is re-opened -->
        {{ resetComponentState() }}

        <span class="line-height-1">
          {{ t('components.pushData.sendPushNotifications') }}
        </span>
        <IconStrokedArrowDown
          class="h-5 w-5 stroke-current"
          :class="{ 'rotate-180': open }"
        />
      </PopoverCustomButton>
    </template>
    <template #container>
      <PopoverCustomPanel>
        <PopoverContent class="max-w-lg">
          <div>
            <div
              class="mb-2 mr-1 text-sm font-bold text-black md:w-auto md:text-base"
            >
              {{ t('components.pushData.popup.title') }}
            </div>

            <div class="mb-4">
              {{ t('components.pushData.popup.selectChannel') }}
            </div>

            <PublisherSelection
              class="mb-5"
              :publishers="publishers"
              :disabled="isPushed"
              @selection-change="updateSelection"
            />

            <div class="mb-5">
              {{ t('components.pushData.popup.pushSendImmediately') }}
            </div>

            <ButtonCustom
              :variant="Variant.ghost"
              :tone="Tone.primary"
              :disabled="selectedPublishers.length === 0 || isPushed"
              class="mb-4 w-full"
              @click="sendPushes"
            >
              {{
                isPushed
                  ? t('components.pushData.popup.buttonAfterSend')
                  : t('components.pushData.popup.buttonBeforeSend')
              }}
            </ButtonCustom>

            <PushResult :push-results="pushResults" />
          </div>
        </PopoverContent>
      </PopoverCustomPanel>
    </template>
  </PopoverCustom>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import ButtonCustom from '../../../../../components/button/ButtonCustom.vue';
import { computeButtonClasses } from '../../../../../components/button/styles';
import { Size, Tone, Variant } from '../../../../../components/button/types';
import PopoverContent from '../../../../../components/popover/PopoverContent.vue';
import PopoverCustom from '../../../../../components/popover/PopoverCustom.vue';
import PopoverCustomButton from '../../../../../components/popover/PopoverCustomButton.vue';
import PopoverCustomPanel from '../../../../../components/popover/PopoverCustomPanel.vue';
import IconStrokedArrowDown from '../../../../../components/svg/IconStrokedArrowDown.vue';
import PublisherSelection from './PublisherSelection.vue';
import PushResult from './PushResult.vue';
import { sendPushNotifications } from './pushNotification';
import { Publisher, PublisherWithPushResult } from './types';
import { useAuth } from '../../../../auth/store/auth';

const { t } = useI18n();

const props = defineProps<{ publishers: Publisher[] }>();

const auth = useAuth();
const disabled = computed(() => !auth.isAuthenticated);

// Array of selected publishers that is updated when the component properties
// change or when the user selects a publisher
const selectedPublishers = ref<Publisher[]>([]);
// Update the selected publishers when the component properties change
watch(
  () => props.publishers,
  () =>
    (selectedPublishers.value =
      props.publishers.length === 1 ? [props.publishers[0]] : [])
);
// Update the selected publishers when the publishers change
const updateSelection = (selected: boolean[]) =>
  (selectedPublishers.value = props.publishers.filter(
    (_, index) => selected[index]
  ));

// Keep track whether the push notifications have been sent
// It is not possible to send push notifications when they are already sent, until the popup is closed
const isPushed = ref(false);

// Array of push results that is updated when the push notifications are sent
const pushResults = ref<PublisherWithPushResult[]>([]);
const sendPushes = async () => {
  try {
    pushResults.value = await sendPushNotifications(selectedPublishers.value);
  } catch (err) {
    console.error(err);
  }

  isPushed.value = true;
};

// Reset the component state when the popup is re-opened,
// which enables the user to send push notifications again
const resetComponentState = () => {
  isPushed.value = false;
  pushResults.value = [];
};

// Compute the button classes
const buttonClasses = computed(() =>
  computeButtonClasses({
    size: Size.xs,
    variant: Variant.ghost,
    disabled: disabled.value,
  })
);
</script>
