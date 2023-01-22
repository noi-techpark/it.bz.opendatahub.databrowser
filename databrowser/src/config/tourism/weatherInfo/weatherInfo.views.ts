import { weatherInfoListView } from './weatherInfo.listView';
import { weatherInfoSharedView } from './weatherInfo.sharedView';

export const weatherInfoViews = {
  table: weatherInfoListView,
  detail: weatherInfoSharedView(),
  edit: weatherInfoSharedView(),
};
