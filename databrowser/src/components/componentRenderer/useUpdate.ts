import { useDebounceFn } from '@vueuse/core';
import { Ref } from 'vue';
import {
  usePropertyMapping,
  useReplaceWithApiParameters,
} from '../../domain/api';
import { useEditStore } from '../../domain/datasets/editView/store/editStore';
import {
  PropertyUpdate,
  PropertyValue,
} from '../../domain/datasets/editView/store/types';
import * as R from 'ramda';

export const useUpdate = (
  tagName: Ref<string>,
  fields?: Ref<Record<string, string>>,
  listFields?: Ref<{ pathToParent: string; fields: Record<string, string> }>
) => {
  const { replace } = useReplaceWithApiParameters();
  const editStore = useEditStore();

  const computeSingleFieldsUpdates = (updates: PropertyValue[]) => {
    return updates
      .map(({ prop, value }) => {
        const field = fields?.value[prop];

        if (field == null) {
          const message = fieldUnknownMessage(prop, tagName, fields);
          console.error(message);
          return;
        }

        const fieldName = replace(field);

        console.debug(
          `Change for ${tagName.value}: prop "${prop}" becomes "${value}" for field ${fieldName}`
        );

        return { prop: fieldName, value };
      })
      .filter((entry): entry is PropertyValue => entry != null);
  };

  const computeListFieldsUpdates = (updates: PropertyValue[]) => {
    if (listFields?.value == null) {
      return [];
    }

    const getCurrentValue = (pathToParent: string, index: number) => {
      const path = replace(pathToParent).split('.');
      const lensePath = R.lensPath(path);
      const parent = R.view(lensePath, editStore.current);
      return parent?.at(index) ?? {};
    };

    const dataArray = updates[0].value as Record<string, unknown>[];

    const mappedDataArray = dataArray.map((entry, index) => {
      // Get current element value from store to be merged with incoming value.
      // This is necessary to support e.g. translations that are stored inside an object (like in ODH tourism domain)
      const currentValue = getCurrentValue(
        listFields.value.pathToParent,
        index
      );

      return Object.entries(entry).reduce<Record<string, unknown>>(
        (prev, [key, value]) => {
          // Get property name, e.g. ImageTitle.{language}
          const propertyName = listFields.value.fields[key];
          // Replace dynamic parts, e.g. if language === 'en', then ImageTitle.{language} becomes ImageTitle.en
          const propertyNameWithReplacements = replace(propertyName);
          const path = propertyNameWithReplacements.split('.');
          return R.assocPath(path, value, prev);
        },
        currentValue
      );
    });

    return {
      prop: listFields.value.pathToParent,
      value: mappedDataArray,
    };
  };

  return useDebounceFn((update: PropertyUpdate) => {
    const updates = Array.isArray(update) ? update : [update];

    if (fields?.value != null) {
      const singleFieldsUpdates = computeSingleFieldsUpdates(updates);
      editStore.updateProperties(singleFieldsUpdates);
    }

    if (listFields?.value != null) {
      const listFieldsUpdates = computeListFieldsUpdates(updates);
      editStore.updateProperties(listFieldsUpdates);
    }
  }, 200);
};

const fieldUnknownMessage = (
  prop: string,
  tagName: Ref<string>,
  fields?: Ref<Record<string, string>>
) => {
  const knownFields =
    fields?.value == null ? 'none' : JSON.stringify(fields.value);
  return `Got update event from component ${tagName.value} for field ${prop} but no field with that name could be found (known fields: ${knownFields})`;
};
