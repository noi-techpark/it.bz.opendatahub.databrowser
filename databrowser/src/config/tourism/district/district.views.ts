import { districtListView } from './district.listView';
import { districtSharedView } from './district.sharedView';

export const districtViews = {
  table: districtListView,
  detail: districtSharedView(),
  edit: districtSharedView(),
};
