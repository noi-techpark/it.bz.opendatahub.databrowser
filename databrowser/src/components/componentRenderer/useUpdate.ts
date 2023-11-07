// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { useDebounceFn } from '@vueuse/core';
import { Ref } from 'vue';
// import { useReplaceWithApiParameters } from '../../domain/api';
import { useEditStore } from '../../domain/datasets/editView/store/editStore';
import {
  PropertyUpdate,
  PropertyValue,
} from '../../domain/datasets/editView/store/types';
import * as R from 'ramda';
import {
  BaseListFields,
  PropertyMappings,
} from '../../domain/datasetConfig/types';
import { isPropertyMappingsEmpty } from '../../domain/api';
import { useReplaceWithApiParamsStore } from '../../domain/api/service/replaceWithApiParamsStore';

export const useUpdate = (
  tagName: Ref<string>,
  propertyMappings: Ref<PropertyMappings | undefined>,
  listFields: Ref<BaseListFields | undefined>
) => {
  const { replace } = useReplaceWithApiParamsStore();
  const editStore = useEditStore();

  const computeObjectValueUpdates = (
    updates: PropertyValue[],
    propertyMappings: PropertyMappings
  ) => {
    return updates
      .map(({ prop, value }) => {
        const targetPropertyName = propertyMappings[prop];

        if (targetPropertyName == null) {
          const message = propertyUnknownMessage(
            prop,
            tagName.value,
            propertyMappings
          );
          console.error(message);
          return;
        }

        console.debug(
          `Change for ${tagName.value}: prop "${prop}" becomes "${value}" for property ${targetPropertyName}`
        );

        return { prop: targetPropertyName, value };
      })
      .filter((entry): entry is PropertyValue => entry != null);
  };

  const computeListValueUpdates = (
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
    if (isPropertyMappingsEmpty(listFieldsValue.propertyMappings)) {
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
          const propertyName = listFieldsValue.propertyMappings![key];
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

  // TODO: take a look at immutable data (immer) and see if it can be used here
  // see https://vuejs.org/guide/extras/reactivity-in-depth.html#immutable-data
  return useDebounceFn((update: PropertyUpdate) => {
    const updates = Array.isArray(update) ? update : [update];

    if (propertyMappings.value != null) {
      const objectValueUpdates = computeObjectValueUpdates(
        updates,
        propertyMappings.value
      );
      editStore.updateProperties(objectValueUpdates);
    }

    if (listFields.value != null) {
      const listValueUpdates = computeListValueUpdates(
        updates,
        listFields.value
      );
      editStore.updateProperties(listValueUpdates);
    }
  }, 200);
};

const propertyUnknownMessage = (
  prop: string,
  tagName: string,
  propertyMappings: PropertyMappings
) => {
  const knownProperties =
    propertyMappings == null ? 'none' : JSON.stringify(propertyMappings);
  return `Got update event from component ${tagName} for property "${prop}" but no property with that name could be found (known properties: ${knownProperties})`;
};
