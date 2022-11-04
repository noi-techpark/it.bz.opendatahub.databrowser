import { weatherInfoDetailView } from './weatherInfo.detailView';
import { weatherInfoEditView } from './weatherInfo.editView';
import { weatherInfoListView } from './weatherInfo.listView';

export const weatherInfoViews = {
  table: weatherInfoListView,
  detail: weatherInfoDetailView,
  edit: weatherInfoEditView,
};
