import { weatherDistrictDetailView } from './weatherDistrict.detailView';
import { weatherDistrictEditView } from './weatherDistrict.editView';
import { weatherDistrictListView } from './weatherDistrict.listView';

export const weatherDistrictViews = {
  table: weatherDistrictListView,
  detail: weatherDistrictDetailView,
  edit: weatherDistrictEditView,
};
