<template>
  <PillButton
    class="inline-flex md:hidden items-center"
    @click="showMobileSelect = true"
  >
    <span class="sr-only">Selected language</span>
    <span class="pr-2 uppercase">{{ $route.query.language }}</span>
    <ArrowDown />
  </PillButton>

  <PillLinkGroup :data="links" class="hidden md:inline-flex uppercase" />

  <Dialog
    :open="showMobileSelect"
    class="overflow-y-auto fixed inset-0 z-10"
    @close="closeDialog"
  >
    <div class="flex items-end w-full min-h-screen">
      <DialogOverlay class="fixed inset-0 bg-black opacity-30" />
      <div class="relative py-3 w-full bg-white rounded-t">
        <div class="flex flex-col justify-center px-3 space-y-3 w-full">
          <button class="mx-auto" @click="closeDialog">
            <IconClose />
          </button>
          <PillLink
            v-for="link in links"
            :key="link.label"
            :active="isSelected(link.url)"
            :to="link.url"
            class="uppercase"
            @click="closeDialog"
            >{{ link.label }}
          </PillLink>
        </div>
      </div>
    </div>
  </Dialog>
</template>

<script lang="ts" setup>
import { Dialog, DialogOverlay } from '@headlessui/vue';
import { FilterLanguage } from '../../domain/api/configFilter';
import IconClose from '../svg/IconClose.vue';
import ArrowDown from '../svg/ArrowDown.vue';
import PillButton from '../pill/PillButton.vue';
import { computed, defineProps, onMounted, ref, withDefaults } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import PillLinkGroup from '../pill/PillLinkGroup.vue';
import PillLink from '../pill/PillLink.vue';

const props = withDefaults(
  defineProps<{
    defaultLanguage: FilterLanguage;
  }>(),
  {
    defaultLanguage: FilterLanguage.EN,
  }
);

const route = useRoute();
const router = useRouter();
const supportedLanguages: Array<string> = Object.values(FilterLanguage);
const showMobileSelect = ref<boolean>(false);

onMounted(() => {
  if (route.query.language == undefined) {
    router.push({
      path: currentPath,
      query: { ...route.query, language: props.defaultLanguage },
    });
  }
});

const currentPath = route.path;
const links = computed(() => {
  const queries = Object.entries(route.query)
    .filter((obj) => obj[0] != 'language')
    .map((query) => `${query[0]}=${query[1]}`);

  return supportedLanguages.map((lang) => {
    const query = [...queries, `language=${lang}`];

    return {
      label: lang.toUpperCase(),
      url: `${currentPath}?${query.join('&')}`,
    };
  });
});

function closeDialog() {
  showMobileSelect.value = false;
}

function isSelected(url: string) {
  return url == route.fullPath;
}
</script>
