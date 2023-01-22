import { skiAreaListView } from './skiArea.listView';
import { skiAreaSharedView } from './skiArea.sharedView';

export const skiAreaViews = {
  table: skiAreaListView,
  detail: skiAreaSharedView(),
  edit: skiAreaSharedView(),
};
