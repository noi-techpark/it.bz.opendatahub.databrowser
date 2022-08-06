import { useDebounceFn } from '@vueuse/core';
import { Ref } from 'vue';
import { useEditStore } from '../../domain/datasets/editView/store/editStore';

export const useUpdate = (
  tagName: Ref<string>,
  fields?: Ref<Record<string, string>>
) => {
  const editStore = useEditStore();

  return useDebounceFn(({ prop, value }: { prop: string; value: unknown }) => {
    const field = fields?.value[prop];

    if (field == null) {
      console.error(
        `Got update event from component ${
          tagName.value
        } for field ${prop} but no field with that name could be found (known fields: ${JSON.stringify(
          fields?.value
        )})`
      );
      return;
    }

    console.log(
      `CHANGE for ${tagName.value}: prop "${prop}" becomes "${value}" for field ${field}`
    );

    editStore.updateCurrent(field, value);
  }, 200);
};
