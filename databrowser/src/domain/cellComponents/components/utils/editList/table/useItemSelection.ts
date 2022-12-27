import { Ref, ref, watch } from 'vue';

export const useItemSelection = (items: Ref<unknown[]>) => {
  const allItemsSelected = ref(false);
  const anyItemSelected = ref(false);

  const itemsSelected = ref<boolean[]>([]);

  watch(
    () => items.value,
    (itemsValue) => {
      itemsSelected.value = [...Array(itemsValue.length)].map(() => false);
      allItemsSelected.value = false;
      anyItemSelected.value = false;
    },
    { immediate: true }
  );

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

  return {
    allItemsSelected,
    anyItemSelected,
    itemsSelected,
    toggleAllItemsSelected,
    toggleSingleItemSelection,
  };
};
