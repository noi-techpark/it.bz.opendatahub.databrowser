// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { useDebounceFn } from '@vueuse/core';
import { Ref } from 'vue';
import { useReplaceWithApiParameters } from '../../domain/api';
import { useEditStore } from '../../domain/datasets/editView/store/editStore';
import {
  PropertyUpdate,
  PropertyValue,
} from '../../domain/datasets/editView/store/types';
import * as R from 'ramda';
import { BaseListFields } from '../../domain/datasetConfig/types';
import { isFieldsEmpty } from '../../domain/api';

export const useUpdate = (
  tagName: Ref<string>,
  fields: Ref<Record<string, string> | undefined>,
  listFields: Ref<BaseListFields | undefined>
) => {
  const { replace } = useReplaceWithApiParameters();
  const editStore = useEditStore();

  const computeSingleFieldsUpdates = (
    updates: PropertyValue[],
    fieldsValue: Record<string, string>
  ) => {
    return updates
      .map(({ prop, value }) => {
        const field = fieldsValue[prop];

        if (field == null) {
          const message = fieldUnknownMessage(prop, tagName.value, fieldsValue);
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

  const computeListFieldsUpdates = (
    updates: PropertyValue[],
    listFieldsValue: BaseListFields
  ) => {
    const getCurrentValue = (pathToParent: string, index: number) => {
      const path = replace(pathToParent).split('.');
      const lensePath = R.lensPath(path);
      const parent = R.view(lensePath, editStore.current);
      return parent?.at(index) ?? {};
    };

    const pathToParentWithReplacements = replace(listFieldsValue.pathToParent);

    const dataArray = updates[0].value as unknown[];

    // If fields is undefined or empty, then the data consist of an
    // array of simple types (strings, number or booleans). We can
    // return it as it is
    if (isFieldsEmpty(listFieldsValue.fields)) {
      return {
        prop: pathToParentWithReplacements,
        value: dataArray,
      };
    }

    const complexDataArray = dataArray as Record<string, unknown>[];

    // Handle array of objects
    const mappedDataArray = complexDataArray.map((entry, index) => {
      // Get current element value from store to be merged with incoming value.
      // This is necessary to support e.g. translations that are stored inside an object (like in ODH tourism domain)
      const currentValue = getCurrentValue(pathToParentWithReplacements, index);

      return Object.entries(entry).reduce<Record<string, unknown>>(
        (prev, [key, value]) => {
          // Get property name, e.g. ImageTitle.{language}
          // listFieldsValue.fields can not be undefined,
          // because we checked it at the top of computeListFieldsUpdates
          const propertyName = listFieldsValue.fields![key];
          // Replace dynamic parts, e.g. if language === 'en', then ImageTitle.{language} becomes ImageTitle.en
          const propertyNameWithReplacements = replace(propertyName);
          const path = propertyNameWithReplacements.split('.');
          return R.assocPath(path, value, prev);
        },
        currentValue
      );
    });

    return {
      prop: pathToParentWithReplacements,
      value: mappedDataArray,
    };
  };

  return useDebounceFn((update: PropertyUpdate) => {
    const updates = Array.isArray(update) ? update : [update];

    if (fields.value != null) {
      const singleFieldsUpdates = computeSingleFieldsUpdates(
        updates,
        fields.value
      );
      editStore.updateProperties(singleFieldsUpdates);
    }

    if (listFields.value != null) {
      const listFieldsUpdates = computeListFieldsUpdates(
        updates,
        listFields.value
      );
      editStore.updateProperties(listFieldsUpdates);
    }
  }, 200);
};

const fieldUnknownMessage = (
  prop: string,
  tagName: string,
  fields: Record<string, string>
) => {
  const knownFields = fields == null ? 'none' : JSON.stringify(fields);
  return `Got update event from component ${tagName} for field ${prop} but no field with that name could be found (known fields: ${knownFields})`;
};
