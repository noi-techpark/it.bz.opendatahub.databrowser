<template>
  <!-- Mobile toolbox open button -->
  <ButtonCustom
    v-if="!toolboxStore.visible"
    class="absolute right-[20px] bottom-16 z-20 flex items-center justify-center shadow-[0_10px_15px_-3px_rgba(0,0,0,0.4)] md:hidden"
    data-test="mobile-open-toolbox"
    @click="toolboxStore.visible = !toolboxStore.visible"
  >
    <IconClose class="just mr-2 h-5 w-5 rotate-45" /><span>Toolbox</span>
  </ButtonCustom>

  <!-- Toolbox content -->
  <div
    class="absolute top-0 z-30 flex h-full flex-col overflow-x-auto bg-white transition-all md:relative"
    :class="{
      'w-full md:w-1/3': toolboxStore.visible,
      'w-0 md:w-16': !toolboxStore.visible,
    }"
  >
    <div
      class="flex flex-1 overflow-y-auto md:block"
      :class="{ block: toolboxStore.visible, hidden: !toolboxStore.visible }"
    >
      <Transition
        @after-enter="(el: HTMLElement) => (el.classList.value = 'block h-full w-full')"
        @before-leave="(el: HTMLElement) => (el.classList.value = 'hidden')"
      >
        <div v-if="toolboxStore.visible" :class="{ hidden: !mdAndLarger }">
          <ContentAlignmentX class="h-full">
            <div class="flex flex-col justify-between">
              <TabGroup :default-index="defaultIndex">
                <div
                  class="sticky top-0 z-10 flex flex-col justify-end bg-white"
                >
                  <!-- Close button at the top right -->
                  <ButtonCustom
                    variant="ghost"
                    size="xs"
                    class="mt-6 mr-2 flex h-8 w-8 items-center justify-center self-end md:hidden"
                    data-test="mobile-close-toolbox"
                    @click="toolboxStore.visible = false"
                  >
                    <IconClose class="h-5 w-5" />
                  </ButtonCustom>

                  <!-- Tab navigation -->
                  <TabList class="mt-2 mb-8 flex justify-around md:mt-0">
                    <Tab
                      v-for="(tabName, index) in tabNames"
                      :key="tabName"
                      v-slot="{ selected }"
                      as="template"
                    >
                      <TabButton
                        :active="selected"
                        class="mt-px"
                        :data-test="`toolbox-tab-${index}`"
                      >
                        {{ tabName }}
                      </TabButton>
                    </Tab>
                  </TabList>
                </div>

                <TabPanels class="mb-4">
                  <slot></slot>
                </TabPanels>
              </TabGroup>
            </div>
          </ContentAlignmentX>
        </div>
      </Transition>
    </div>

    <!-- Open / close button -->
    <div class="my-6 ml-4 hidden md:block">
      <ButtonCustom
        size="xs"
        class="hidden h-8 w-8 items-center justify-center md:flex"
        :data-test="
          toolboxStore.visible
            ? 'desktop-close-toolbox'
            : 'desktop-open-toolbox'
        "
        @click="toolboxStore.visible = !toolboxStore.visible"
      >
        <IconStrokedArrowDown
          class="h-5 w-5 stroke-current"
          :class="{
            '-rotate-90': toolboxStore.visible,
            'rotate-90': !toolboxStore.visible,
          }"
        />
      </ButtonCustom>
    </div>
  </div>
</template>

<script setup lang="ts">
import { toRefs, watch } from 'vue';
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core';
import { TabGroup, TabList, TabPanels, Tab } from '@headlessui/vue';
import ButtonCustom from '../../../components/button/ButtonCustom.vue';
import IconClose from '../../../components/svg/IconClose.vue';
import ContentAlignmentX from '../../../components/content/ContentAlignmentX.vue';
import IconStrokedArrowDown from '../../../components/svg/IconStrokedArrowDown.vue';
import TabButton from '../../../components/tab/TabButton.vue';
import { useToolboxStore } from './toolboxStore';

const props = withDefaults(
  defineProps<{
    tabNames: string[];
    defaultIndex?: number;
    visible?: boolean;
  }>(),
  {
    defaultIndex: 0,
    visible: true,
  }
);

const { visible } = toRefs(props);

const toolboxStore = useToolboxStore();

const breakpoints = useBreakpoints(breakpointsTailwind);
const mdAndLarger = breakpoints.greater('md');

watch(
  [visible, mdAndLarger],
  ([visible, mdAndLargerValue], [oldVisible, oldMdAndLargerValue]) => {
    if (visible !== oldVisible && mdAndLargerValue) {
      toolboxStore.visible = visible;
    } else if (mdAndLargerValue) {
      toolboxStore.visible = true;
    } else if (
      oldMdAndLargerValue != null &&
      mdAndLargerValue !== oldMdAndLargerValue
    ) {
      toolboxStore.visible = false;
    }
  },
  { immediate: true }
);
</script>

<style scoped>
.v-enter-active {
  transition: all 0.2s ease;
}
</style>
