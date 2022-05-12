<template>
  <PopoverCustom class="relative">
    <span ref="trigger">
      <PopoverCustomButton
        v-slot="{ open }"
        class="flex justify-center items-center w-6 h-6 text-green-500 focus:text-white hover:bg-green-500/10 focus:bg-green-500 rounded border hover:border-green-500"
      >
        <IconThreeDots
          class="transition-transform fill-current"
          :class="{ 'rotate-90': open }"
        />
      </PopoverCustomButton>
    </span>

    <Teleport to="body">
      <div ref="container" class="z-20 w-screen max-w-sm">
        <PopoverCustomPanel>
          <PopoverContentHeader>{{
            t('datasets.header.switchViews')
          }}</PopoverContentHeader>
          <PopoverContentDivider />
          <PopoverContent with-hover class="flex items-center">
            <RadioCustom
              v-model="internalPicked"
              value="embedded"
              :label="t('datasets.header.viewEmbeddedConfig')"
            />
          </PopoverContent>
          <PopoverContentDivider />
          <PopoverContent with-hover class="flex items-center">
            <RadioCustom
              v-model="internalPicked"
              value="generated"
              :label="t('datasets.header.viewGeneratedConfig')"
            />
          </PopoverContent>
          <PopoverContentHeader>{{
            t('datasets.header.selectColumnSize')
          }}</PopoverContentHeader>
          <PopoverContentDivider />
          <PopoverContent class="flex justify-between">
            <ButtonCustom
              :variant="columnWidth === 'small' ? 'solid' : 'ghost'"
              size="sm"
              class="w-28"
              @click="internalColumnWidth = 'small'"
              >{{ t('datasets.header.columnSizeSmall') }}</ButtonCustom
            >
            <ButtonCustom
              :variant="columnWidth === 'medium' ? 'solid' : 'ghost'"
              size="sm"
              class="w-28"
              @click="internalColumnWidth = 'medium'"
              >{{ t('datasets.header.columnSizeMedium') }}</ButtonCustom
            >
            <ButtonCustom
              :variant="columnWidth === 'large' ? 'solid' : 'ghost'"
              size="sm"
              class="w-28"
              @click="internalColumnWidth = 'large'"
              >{{ t('datasets.header.columnSizeLarge') }}</ButtonCustom
            >
          </PopoverContent>
        </PopoverCustomPanel>
      </div>
    </Teleport>
  </PopoverCustom>
</template>

<script setup lang="ts">
import { computed, defineEmits, defineProps, toRefs } from 'vue';
import ButtonCustom from '../../../components/button/ButtonCustom.vue';
import IconThreeDots from '../../../components/svg/IconThreeDots.vue';
import PopoverCustom from '../../../components/popover/PopoverCustom.vue';
import PopoverCustomButton from '../../../components/popover/PopoverCustomButton.vue';
import PopoverCustomPanel from '../../../components/popover/PopoverCustomPanel.vue';
import PopoverContentDivider from '../../../components/popover/PopoverContentDivider.vue';
import PopoverContent from '../../../components/popover/PopoverContent.vue';
import PopoverContentHeader from '../../../components/popover/PopoverContentHeader.vue';
import RadioCustom from '../../../components/radio/RadioCustom.vue';
import { usePopper } from '../../../components/utils/usePopper';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const props = defineProps<{ picked: string; columnWidth: string }>();
const { picked, columnWidth } = toRefs(props);

const emit = defineEmits(['pickedChange', 'columnWidthChange']);

const internalPicked = computed({
  get: () => picked.value,
  set: (value) => emit('pickedChange', value),
});

const internalColumnWidth = computed({
  get: () => columnWidth.value,
  set: (value) => emit('columnWidthChange', value),
});

let [trigger, container] = usePopper({
  placement: 'bottom-start',
  strategy: 'absolute',
  modifiers: [{ name: 'offset', options: { offset: [0, 8] } }],
});
</script>
