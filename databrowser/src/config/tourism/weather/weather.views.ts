import { weatherDetailView } from './weather.detailView';
import { weatherEditView } from './weather.editView';
import { weatherListView } from './weather.listView';
import { weatherQuickView } from './weather.quickView';

export const weatherViews = {
  table: weatherListView,
  detail: weatherDetailView,
  quick: weatherQuickView,
  edit: weatherEditView,
};
