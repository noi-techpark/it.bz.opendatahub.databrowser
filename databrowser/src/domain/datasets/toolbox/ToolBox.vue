<template>
  <!-- Mobile toolbox open button -->
  <ButtonCustom
    v-if="!isToolboxVisible"
    class="flex absolute right-[20px] bottom-16 z-20 justify-center items-center shadow-[0_10px_15px_-3px_rgba(0,0,0,0.4)] md:hidden"
    @click="isToolboxVisible = !isToolboxVisible"
  >
    <IconClose class="mr-2 w-5 h-5 rotate-45 just" /><span>Toolbox</span>
  </ButtonCustom>

  <!-- Toolbox content -->
  <div
    class="flex overflow-x-auto absolute top-0 z-10 flex-col h-full bg-white transition-all md:relative"
    :class="{
      'w-full md:w-1/3': isToolboxVisible && isTableView,
      'w-full md:w-1/2': isToolboxVisible && !isTableView,
      'w-0': !isToolboxVisible,
      'md:w-16': !isToolboxVisible && isTableView,
    }"
  >
    <div
      class="flex overflow-y-auto flex-1 md:block"
      :class="{ block: isToolboxVisible, hidden: !isToolboxVisible }"
    >
      <Transition
        @after-enter="(el: HTMLElement) => (el.classList.value = 'block h-full w-full')"
        @before-leave="(el: HTMLElement) => (el.classList.value = 'hidden')"
      >
        <div
          v-if="isToolboxVisible"
          :class="{ hidden: isTableView || !mdAndLarger }"
        >
          <ContentAlignmentX class="h-full">
            <div class="flex flex-col justify-between">
              <TabGroup>
                <div
                  class="flex sticky top-0 z-10 flex-col justify-end bg-white"
                >
                  <!-- Close button at the top right -->
                  <ButtonCustom
                    variant="ghost"
                    size="xs"
                    class="flex justify-center items-center self-end mt-6 mr-2 w-8 h-8 md:hidden"
                    @click="isToolboxVisible = false"
                  >
                    <IconClose class="w-5 h-5" />
                  </ButtonCustom>

                  <!-- Tab navigation -->
                  <TabList class="flex justify-around mt-2 mb-8 md:mt-0">
                    <Tab
                      v-for="tabName in tabNames"
                      :key="tabName"
                      v-slot="{ selected }"
                    >
                      <TabButton
                        :label="tabName"
                        :active="selected"
                        class="uppercase"
                      />
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

    <!-- Table view open / close button -->
    <div v-if="isTableView" class="hidden my-6 ml-4 md:block">
      <ButtonCustom
        size="xs"
        class="hidden justify-center items-center w-8 h-8 md:flex"
        @click="isToolboxVisible = !isToolboxVisible"
      >
        <IconStrokedArrowDown
          class="w-5 h-5 stroke-current"
          :class="{
            '-rotate-90': isToolboxVisible,
            'rotate-90': !isToolboxVisible,
          }"
        />
      </ButtonCustom>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, ref, watch } from 'vue';
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core';
import { TabGroup, TabList, TabPanels, Tab } from '@headlessui/vue';
import ButtonCustom from '../../../components/button/ButtonCustom.vue';
import IconClose from '../../../components/svg/IconClose.vue';
import ContentAlignmentX from '../../../components/content/ContentAlignmentX.vue';
import IconStrokedArrowDown from '../../../components/svg/IconStrokedArrowDown.vue';
import TabButton from '../../../components/tab/TabButton.vue';

const props = defineProps<{
  isTableView: boolean;
  tabNames: string[];
}>();

const isToolboxVisible = ref(false);

const breakpoints = useBreakpoints(breakpointsTailwind);
const mdAndLarger = breakpoints.greater('md');

watch(
  () => mdAndLarger.value,
  (value, oldValue) => {
    if (value && !props.isTableView) {
      isToolboxVisible.value = true;
      return;
    }
    if (oldValue != null && value !== oldValue) {
      isToolboxVisible.value = false;
      return;
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
