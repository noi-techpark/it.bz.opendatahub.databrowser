import { accommodationListView } from './accommodation.listView';
import { accommodationSharedView } from './accommodation.sharedView';

export const accommodationViews = {
  table: accommodationListView,
  detail: accommodationSharedView(),
  edit: accommodationSharedView(),
};
