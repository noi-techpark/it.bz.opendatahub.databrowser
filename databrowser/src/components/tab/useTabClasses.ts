import { computed, Ref } from 'vue';

export const useTabClasses = (active: Ref<boolean | undefined> | undefined) =>
  computed(() => [
    'relative flex h-10 items-center border-none px-3 font-semibold uppercase md:px-6',
    {
      'border-b-2 border-b-green-500 ': active?.value,
      'text-gray-500': !active?.value,
      'link-underlined': active?.value,
    },
  ]);
