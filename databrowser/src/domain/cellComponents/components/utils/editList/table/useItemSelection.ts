import { Ref, ref, watch } from 'vue';

export const useItemSelection = (items: Ref<unknown[]>) => {
  const allItemsSelected = ref(false);
  const anyItemSelected = ref(false);

  const itemsSelected = ref<boolean[]>([]);

  const toggleAllItemsSelected = (selected: boolean) => {
    itemsSelected.value = [...Array(items.value.length)].map(() => selected);
    allItemsSelected.value = selected;
    anyItemSelected.value = selected;
  };

  const toggleSingleItemSelection = (index: number) => {
    itemsSelected.value[index] = !itemsSelected.value[index];

    if (allItemsSelected.value === true) {
      if (itemsSelected.value.some((selected) => selected === false)) {
        allItemsSelected.value = false;
      }
    } else {
      if (
        itemsSelected.value.filter((selected) => selected === true).length ===
        itemsSelected.value.length
      ) {
        allItemsSelected.value = true;
      }
    }

    anyItemSelected.value = itemsSelected.value.some(
      (selected) => selected === true
    );
  };

  watch(
    () => items.value,
    () => toggleAllItemsSelected(false),
    { immediate: true }
  );

  return {
    allItemsSelected,
    anyItemSelected,
    itemsSelected,
    toggleAllItemsSelected,
    toggleSingleItemSelection,
  };
};
