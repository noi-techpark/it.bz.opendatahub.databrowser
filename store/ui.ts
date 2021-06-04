export interface UiState {
  isSidebarOpen: boolean;
  isSearchPanelOpen: boolean;
  isSettingsPanelOpen: boolean;
}

export const state: () => UiState = () => ({
  isSidebarOpen: false,
  isSearchPanelOpen: false,
  isSettingsPanelOpen: false,
});

export const mutations = {
  closeSearchPanel(state: UiState) {
    state.isSearchPanelOpen = false;
  },
  openSearchPanel(state: UiState) {
    state.isSearchPanelOpen = true;
  },
  closeSettingsPanel(state: UiState) {
    state.isSettingsPanelOpen = false;
  },
  openSettingsPanel(state: UiState) {
    state.isSettingsPanelOpen = true;
  },
  toggleSidebar(state: UiState) {
    state.isSidebarOpen = !state.isSidebarOpen;
  },
};
