import { weatherInfoDetailView } from './weatherInfo.detailView';
import { weatherInfoEditView } from './weatherInfo.editView';
import { weatherInfoListView } from './weatherInfo.listView';
import { weatherInfoQuickView } from './weatherInfo.quickView';

export const weatherInfoViews = {
  table: weatherInfoListView,
  detail: weatherInfoDetailView,
  quick: weatherInfoQuickView,
  edit: weatherInfoEditView,
};
