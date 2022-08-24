import { weatherRealTimeDetailView } from './weatherRealTime.detailView';
import { weatherRealTimeEditView } from './weatherRealTime.editView';
import { weatherRealTimeListView } from './weatherRealTime.listView';
import { weatherRealTimeQuickView } from './weatherRealTime.quickView';

export const weatherRealTimeViews = {
  table: weatherRealTimeListView,
  detail: weatherRealTimeDetailView,
  quick: weatherRealTimeQuickView,
  edit: weatherRealTimeEditView,
};
