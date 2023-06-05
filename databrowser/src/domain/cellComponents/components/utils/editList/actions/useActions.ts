// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { inject, provide } from 'vue';
import { createEventHook } from '@vueuse/core';

export const useActions = () => {
  const addItemsEventHook = createEventHook<unknown[]>();
  const deleteAllItemsEventHook = createEventHook<void>();
  const deleteItemsEventHook = createEventHook<number[]>();
  const duplicateItemEventHook = createEventHook<number>();
  const pushItemEventHook = createEventHook<number>();
  const updateItemEventHook = createEventHook<{
    index: number;
    item: Record<string, unknown>;
  }>();
  const updateItemsEventHook = createEventHook<unknown[]>();

  const addEmptyItem = () => addItemsEventHook.trigger([{}]);
  const addItems = (items: unknown[]) => addItemsEventHook.trigger(items);
  const deleteAllItems = () => deleteAllItemsEventHook.trigger();
  const deleteItems = (indexes: number[]) =>
    deleteItemsEventHook.trigger(indexes);
  const duplicateItem = (index: number) =>
    duplicateItemEventHook.trigger(index);
  const pushItem = (index: number) => pushItemEventHook.trigger(index);
  const updateItem = (index: number, item: Record<string, unknown>) =>
    updateItemEventHook.trigger({ index, item });
  const updateItems = (items: unknown[]) => updateItemsEventHook.trigger(items);

  return {
    addEmptyItem,
    addItems,
    deleteAllItems,
    deleteItems,
    duplicateItem,
    pushItem,
    updateItem,
    updateItems,
    onAddItems: addItemsEventHook.on,
    onDeleteAllItems: deleteAllItemsEventHook.on,
    onDeleteItems: deleteItemsEventHook.on,
    onDuplicateItem: duplicateItemEventHook.on,
    onPushItem: pushItemEventHook.on,
    onUpdateItem: updateItemEventHook.on,
    onUpdateItems: updateItemsEventHook.on,
  };
};

type Actions = ReturnType<typeof useActions>;
type ActionTriggers = Omit<
  Actions,
  | 'onAddItems'
  | 'onDeleteAllItems'
  | 'onDeleteItems'
  | 'onDuplicateItem'
  | 'onPushItem'
  | 'onUpdateItem'
  | 'onUpdateItems'
>;
type ActionHooks = Omit<
  Actions,
  | 'addEmptyItem'
  | 'addItems'
  | 'deleteAllItemsEventHook'
  | 'deleteItems'
  | 'duplicateItem'
  | 'pushItem'
  | 'updateItem'
  | 'updateItems'
>;

const actionKey = Symbol('edit-list-action-key');

export const useProvideActions = () => {
  const actions = useActions();
  provide(actionKey, actions);
  return actions;
};

export const useInjectActions = () => inject<Actions>(actionKey)!;

export const useInjectActionTriggers = (): ActionTriggers => useInjectActions();

export const useInjectActionHooks = (): ActionHooks => useInjectActions();
