<template>
  <InfoPopover>
    <PopoverCustomPanel>
      <PopoverContentHeader class="pb-0">
        {{
          t(
            'datasets.listView.toolBox.searchAndFilter.otherFilters.infoPopup.header'
          )
        }}
      </PopoverContentHeader>
      <PopoverContent class="flex max-w-sm flex-col gap-3 pt-2">
        {{
          t(
            'datasets.listView.toolBox.searchAndFilter.otherFilters.infoPopup.body'
          )
        }}
        <ButtonExternalLink
          class="flex items-center justify-center p-2"
          target="_blank"
          :href="
            t(
              'datasets.listView.toolBox.searchAndFilter.otherFilters.infoPopup.linkHref'
            )
          "
          :size="Size.xs"
          :variant="Variant.ghost"
        >
          {{
            t(
              'datasets.listView.toolBox.searchAndFilter.otherFilters.infoPopup.linkText'
            )
          }}
        </ButtonExternalLink>
      </PopoverContent>
    </PopoverCustomPanel>
  </InfoPopover>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import ButtonExternalLink from '../../../../components/button/ButtonExternalLink.vue';
import { Size, Variant } from '../../../../components/button/types';
import InfoPopover from '../../../../components/popover/InfoPopover.vue';
import PopoverContent from '../../../../components/popover/PopoverContent.vue';
import PopoverContentHeader from '../../../../components/popover/PopoverContentHeader.vue';
import PopoverCustomPanel from '../../../../components/popover/PopoverCustomPanel.vue';

const { t } = useI18n();
</script>
