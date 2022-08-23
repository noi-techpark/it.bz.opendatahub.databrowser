import { useDebounceFn } from '@vueuse/core';
import { Ref } from 'vue';
import { useReplaceWithApiParameters } from '../../domain/api';
import { useEditStore } from '../../domain/datasets/editView/store/editStore';
import {
  PropertyUpdate,
  PropertyValue,
} from '../../domain/datasets/editView/store/types';

export const useUpdate = (
  tagName: Ref<string>,
  fields?: Ref<Record<string, string>>
) => {
  const { replace } = useReplaceWithApiParameters();
  const editStore = useEditStore();

  return useDebounceFn((update: PropertyUpdate) => {
    const updates = Array.isArray(update) ? update : [update];

    const updatesWithReplacedKeys = updates
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

    editStore.updateProperties(updatesWithReplacedKeys);
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
