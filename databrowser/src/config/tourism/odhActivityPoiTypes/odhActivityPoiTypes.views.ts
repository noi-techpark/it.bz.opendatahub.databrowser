import { odhActivityPoiTypesListView } from './odhActivityPoiTypes.listView';
import { odhActivityPoiTypesSharedView } from './odhActivityPoiTypes.sharedView';

export const odhActivityPoiTypesViews = {
  table: odhActivityPoiTypesListView,
  detail: odhActivityPoiTypesSharedView(),
  edit: odhActivityPoiTypesSharedView(),
};
