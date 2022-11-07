import { weatherDetailView } from './weather.detailView';
import { weatherEditView } from './weather.editView';
import { weatherListView } from './weather.listView';

export const weatherViews = {
  table: weatherListView,
  detail: weatherDetailView,
  edit: weatherEditView,
};
