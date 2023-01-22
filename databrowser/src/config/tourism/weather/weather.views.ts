import { weatherListView } from './weather.listView';
import { weatherSharedView } from './weather.sharedView';

export const weatherViews = {
  table: weatherListView,
  detail: weatherSharedView(),
  edit: weatherSharedView(),
};
