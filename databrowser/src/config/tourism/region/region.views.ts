import { regionListView } from './region.listView';
import { regionSharedView } from './region.sharedView';

export const regionViews = {
  table: regionListView,
  detail: regionSharedView(),
  edit: regionSharedView(),
  new: regionSharedView(),
};
