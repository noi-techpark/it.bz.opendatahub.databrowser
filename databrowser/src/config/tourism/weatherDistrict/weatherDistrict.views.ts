import { weatherDistrictDetailView } from './weatherDistrict.detailView';
import { weatherDistrictEditView } from './weatherDistrict.editView';
import { weatherDistrictListView } from './weatherDistrict.listView';
import { weatherDistrictQuickView } from './weatherDistrict.quickView';

export const weatherDistrictViews = {
  table: weatherDistrictListView,
  detail: weatherDistrictDetailView,
  quick: weatherDistrictQuickView,
  edit: weatherDistrictEditView,
};
