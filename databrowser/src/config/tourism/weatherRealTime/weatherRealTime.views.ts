import { weatherRealTimeDetailView } from './weatherRealTime.detailView';
import { weatherRealTimeEditView } from './weatherRealTime.editView';
import { weatherRealTimeListView } from './weatherRealTime.listView';

export const weatherRealTimeViews = {
  table: weatherRealTimeListView,
  detail: weatherRealTimeDetailView,
  edit: weatherRealTimeEditView,
};
