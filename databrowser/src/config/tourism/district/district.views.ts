import { districtDetailView } from './district.detailView';
import { districtEditView } from './district.editView';
import { districtListView } from './district.listView';
import { districtQuickView } from './district.quickView';

export const districtViews = {
  table: districtListView,
  detail: districtDetailView,
  quick: districtQuickView,
  edit: districtEditView,
};
