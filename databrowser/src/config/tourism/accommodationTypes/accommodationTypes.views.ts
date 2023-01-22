import { accommodationTypesListView } from './accommodationTypes.listView';
import { accommodationTypesSharedView } from './accommodationTypes.sharedView';

export const accommodationTypesViews = {
  table: accommodationTypesListView,
  detail: accommodationTypesSharedView(),
  edit: accommodationTypesSharedView(),
};
