import { weatherDistrictListView } from './weatherDistrict.listView';
import { weatherDistrictSharedView } from './weatherDistrict.sharedView';

export const weatherDistrictViews = {
  table: weatherDistrictListView,
  detail: weatherDistrictSharedView(),
  edit: weatherDistrictSharedView(),
};
