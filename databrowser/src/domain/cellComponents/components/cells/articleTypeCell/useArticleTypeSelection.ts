import { createEventHook } from '@vueuse/core';
import { ref, Ref, watch } from 'vue';
import { SelectOption } from '../../../../../components/select/types';

const buildSelectOption = (
  label?: string,
  value?: string,
  selected?: boolean
): SelectOption => ({ label: label ?? '', value: value ?? '', selected });

const buildSelectOptions = (options: string[], value?: string) =>
  options
    .map((option) => buildSelectOption(option, option, option === value))
    .sort((a, b) => a.label.localeCompare(b.label));

const getSelectedValue = (options: SelectOption[]) =>
  options.find((option) => option.selected)?.value;

export const useArticleTypeSelection = (
  type: Ref<string | undefined>,
  subType: Ref<string | undefined>,
  hierarchy: Ref<Record<string, string[] | undefined>>
) => {
  const initialType = type.value;
  const initialSubType = subType.value;

  const hasType = ref(false);
  const hasSubType = ref(false);
  const isTypeInHierarchy = ref(false);
  const isSubTypeInTypeHierarchy = ref(false);
  const typeSelectOptions = ref<SelectOption[]>([]);
  const subTypeSelectOptions = ref<SelectOption[]>([]);
  const currentTypeValue = ref<string>();
  const currentSubTypeValue = ref<string>();

  const lastSelectedSubTypeForType: Record<string, string | undefined> = {};

  const updateHook = createEventHook<{
    nextType?: string;
    nextSubType?: string;
  }>();

  // If type is null / undefined, then return the current sub type. Otherwise return
  // the sub type that was used the last time for this type
  const getLastSubTypeForType = (type?: string) =>
    type == null ? undefined : lastSelectedSubTypeForType[type];
  // type == null ? currentSubTypeValue.value : lastSelectedSubTypeForType[type];

  watch(
    () => [type.value, subType.value, hierarchy.value],
    () => {
      hasType.value = type.value != null;
      hasSubType.value = subType.value != null;

      isTypeInHierarchy.value =
        hasType.value && hierarchy.value[type.value!] != null;

      isSubTypeInTypeHierarchy.value =
        (hasType.value &&
          hasSubType.value &&
          hierarchy.value[type.value!]?.includes(subType.value!)) ??
        false;

      // Handle type computation

      typeSelectOptions.value = buildSelectOptions(
        Object.keys(hierarchy.value),
        type.value
      );
      const selectedType = getSelectedValue(typeSelectOptions.value);

      // Handle sub type computation

      const subTypesForCurrentType = hierarchy.value[type.value!] ?? [];

      // Find best matching sub type
      // - if sub type is in current type hierarchy then use it
      // - otherwise use previous selected sub type for type (may be undefined)
      const bestMatchingSubType =
        subType.value == null
          ? subType.value
          : isSubTypeInTypeHierarchy.value
          ? subType.value
          : lastSelectedSubTypeForType[type.value!];

      subTypeSelectOptions.value = buildSelectOptions(
        subTypesForCurrentType,
        bestMatchingSubType
      );
      const selectedSubType = getSelectedValue(subTypeSelectOptions.value);

      // Store old type and sub type values

      const oldTypeValue = currentTypeValue.value;
      const oldSubTypeValue = currentSubTypeValue.value;

      // Compute current type and sub type values

      currentTypeValue.value = selectedType ?? type.value;

      currentSubTypeValue.value =
        subType.value == null
          ? subType.value
          : // Use sub type selection if not undefined
            selectedSubType ??
            // Use previously set sub type if not undefined
            lastSelectedSubTypeForType[type.value!] ??
            // If initial values are the same as current values, then just
            // use the provided sub type. This covers an edge case where
            // the initial sub type value is unknown
            (type.value === initialType && subType.value === initialSubType
              ? subType.value
              : undefined);

      // If type or sub type changed, then trigger hook
      if (
        oldTypeValue != currentTypeValue.value ||
        oldSubTypeValue != currentSubTypeValue.value
      ) {
        // The trigger will be invoked in the process of running the useArticleTypeSelection the first time,
        // but since at this point no callback can be defined on the hook (we're still initializing useArticleTypeSelection),
        // it has no (side)effect
        updateHook.trigger({
          nextType: currentTypeValue.value,
          nextSubType: currentSubTypeValue.value,
        });
      }

      if (hasType.value) {
        // Store sub type for current type for later reuse
        lastSelectedSubTypeForType[type.value!] = currentSubTypeValue.value;
      }
    },
    { immediate: true }
  );

  return {
    hasType,
    hasSubType,
    isTypeInHierarchy,
    isSubTypeInTypeHierarchy,
    typeSelectOptions,
    subTypeSelectOptions,
    currentTypeValue,
    currentSubTypeValue,
    onUpdate: updateHook.on,
    getLastSubTypeForType,
  };
};
