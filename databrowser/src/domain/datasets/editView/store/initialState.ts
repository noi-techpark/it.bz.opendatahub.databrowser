export type EditData = Record<string, unknown>;

export interface State {
  initial: EditData;
  current: EditData;
}

export const initialState: State = {
  initial: {},
  current: {},
};
