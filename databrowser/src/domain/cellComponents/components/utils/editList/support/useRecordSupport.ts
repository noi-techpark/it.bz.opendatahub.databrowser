// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { computed, Ref } from 'vue';
import {
  useInjectActionHooks,
  useInjectActionTriggers,
} from '../actions/useActions';

/**
 * This hook provides a way to define the mapping between
 * a record (with values of type S) and the items that are
 * used in the EditCell Table implementations of type T.
 */
export const useRecordSupportForCell = <S, T>(options: {
  record: Ref<Record<string, S> | null | undefined> | undefined;
  prop: string;
  emit: (event: 'update', value: unknown) => void;
  mapRecordToItems: (record: Record<string, S>) => T[];
  mapUpdateToRecord: (items: T[]) => Record<string, T>;
}) => {
  const { record, prop, emit, mapRecordToItems, mapUpdateToRecord } = options;

  const recordAsItems = computed(() => mapRecordToItems(record?.value ?? {}));

  const update = (updateValue: { prop: string; value: T[] }) => {
    const value = mapUpdateToRecord(updateValue.value);
    emit('update', { prop, value });
  };

  return { recordAsItems, update };
};

/**
 * This hook provides a way to define the duplication algorithm
 * for EditCell Table implementations.
 */
export const useRecordSupportForTable = <T>(options: {
  items: Ref<T[]>;
  duplication: (items: T[], index: number) => T;
}) => {
  const { items, duplication } = options;

  const { updateItems } = useInjectActionTriggers<T>();
  const { onDuplicateItem } = useInjectActionHooks<T>();

  onDuplicateItem((index) => {
    const duplicatedEntry = duplication(items.value, index);

    const links = [
      ...items.value.slice(0, index + 1),
      { ...duplicatedEntry },
      ...items.value.slice(index + 1),
    ];
    updateItems(links);
  });
};
