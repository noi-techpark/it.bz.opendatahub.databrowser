<template>
  <div>
    <SubCategoryItem title="Main Type">
      <SelectCustom
        v-if="isWriteable"
        :options="typeSelectOptions"
        :value="currentTypeValue"
        :show-empty-value="showEmptyValueForType"
        @change="changeType"
      />
      <span v-else>{{ currentTypeValue }}</span>
    </SubCategoryItem>
    <SubCategoryItem title="Sub Type">
      <SelectCustom
        v-if="isWriteable"
        :options="subTypeSelectOptions"
        :value="currentSubTypeValue"
        :show-empty-value="true"
        @change="changeSubType"
      />
      <span v-else>{{ currentSubTypeValue }}</span>
    </SubCategoryItem>
  </div>
</template>

<script setup lang="ts">
import { computed, toRefs } from 'vue';
import SelectCustom from '../../../../../components/select/SelectCustom.vue';
import SubCategoryItem from '../../../../datasets/category/SubCategoryItem.vue';
import { useWriteable } from '../../utils/writeable/useWriteable';
import { useArticleTypeSelection } from './useArticleTypeSelection';
import { useFetchArticleTypes } from './useFetchArticleTypes';

const emit = defineEmits(['update']);

const props = withDefaults(
  defineProps<{
    type?: string;
    subType?: string;
    lookupUrl?: string;
    editable?: boolean;
    readonly?: string | boolean;
  }>(),
  {
    type: undefined,
    subType: undefined,
    lookupUrl: undefined,
    editable: true,
    readonly: false,
  }
);

const { type, subType, lookupUrl, editable, readonly } = toRefs(props);

// Show empty value options for type select if type and sub type
// are undefined / null, which is the case for new articles.
const showEmptyValueForType = computed(
  () => type.value == null && subType.value == null
);

const { articleTypesHierarchy } = useFetchArticleTypes(lookupUrl);

const {
  typeSelectOptions,
  subTypeSelectOptions,
  currentTypeValue,
  currentSubTypeValue,
  onUpdate,
  getLastSubTypeForType,
} = useArticleTypeSelection(type, subType, articleTypesHierarchy);

onUpdate(({ nextType, nextSubType }) =>
  changeTypeAndSubType(nextType, nextSubType)
);

const changeType = (nextType?: string) => {
  const nextSubType = getLastSubTypeForType(nextType);
  changeTypeAndSubType(nextType, nextSubType);
};

const changeSubType = (subType?: string) =>
  changeTypeAndSubType(currentTypeValue.value, subType);

const changeTypeAndSubType = (
  nextType: string | undefined,
  nextSubType: string | undefined
) => {
  // Emit update only if type or sub type changed
  if (
    currentTypeValue.value != nextType ||
    currentSubTypeValue.value != nextSubType
  ) {
    emit('update', [
      { prop: 'type', value: nextType },
      { prop: 'subType', value: nextSubType },
    ]);
  }
};

const isWriteable = useWriteable({ editable, readonly });
</script>
