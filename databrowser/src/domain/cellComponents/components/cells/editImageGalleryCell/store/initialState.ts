export type EditImageGalleryNavigable = 'table' | 'tab' | 'upload';

export interface State {
  current: EditImageGalleryNavigable;
  previous: EditImageGalleryNavigable;
  tabIndex: number;
}

export const initialState: State = {
  current: 'table',
  previous: 'table',
  tabIndex: 0,
};
