// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { computed, inject, provide, ref, Ref } from 'vue';

type EditListNavigable = 'table' | 'tab' | 'add';

interface State {
  current: Ref<EditListNavigable>;
  previous: Ref<EditListNavigable>;
  activeTab: Ref<number>;
  isDialogOpen: Ref<boolean>;
}

export const useNavigation = () => {
  const state: State = {
    current: ref('table'),
    previous: ref('table'),
    activeTab: ref(0),
    isDialogOpen: ref(false),
  };

  const navigateTo = (next: EditListNavigable) => {
    state.previous.value = state.current.value;
    state.current.value = next;
  };

  const navigateToTable = () => {
    navigateTo('table');
  };

  const navigateToTab = (index?: number) => {
    navigateTo('tab');
    setActiveTab(index);
  };

  const navigateToAdd = () => {
    navigateTo('add');
  };

  const closeDialog = () => {
    state.isDialogOpen.value = false;
  };

  const openDialog = () => {
    state.isDialogOpen.value = true;
  };

  const navigateToPrevious = () => (state.current.value = state.previous.value);

  const setActiveTab = (index?: number) => (state.activeTab.value = index ?? 0);

  const activeTab = computed(() => state.activeTab.value);

  const isCurrentAdd = computed(() => state.current.value === 'add');

  const isCurrentTab = computed(() => state.current.value === 'tab');

  const isCurrentTable = computed(() => state.current.value === 'table');

  const isCurrentDialog = computed(() => state.isDialogOpen.value);

  return {
    activeTab,
    isCurrentAdd,
    isCurrentTab,
    isCurrentTable,
    isCurrentDialog,
    navigateToAdd,
    navigateToTab,
    navigateToTable,
    closeDialog,
    openDialog,
    navigateToPrevious,
    setActiveTab,
  };
};

type Navigation = ReturnType<typeof useNavigation>;

const navigationKey = Symbol('edit-list-navigation-key');

export const useProvideNavigation = () => {
  const navigation = useNavigation();
  provide(navigationKey, navigation);
  return navigation;
};

export const useInjectNavigation = () => inject<Navigation>(navigationKey)!;
