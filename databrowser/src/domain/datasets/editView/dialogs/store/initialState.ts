export type EditData = Record<string, unknown>;

export interface State {
  discardChangesDialogVisible: boolean;
  leaveSectionDialogVisible: boolean;
}

export const initialState: State = {
  discardChangesDialogVisible: false,
  leaveSectionDialogVisible: false,
};
