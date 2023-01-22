import { weatherRealTimeListView } from './weatherRealTime.listView';
import { weatherRealTimeSharedView } from './weatherRealTime.sharedView';

export const weatherRealTimeViews = {
  table: weatherRealTimeListView,
  detail: weatherRealTimeSharedView(),
  edit: weatherRealTimeSharedView(),
};
