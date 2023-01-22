import { eventTopicsListView } from './eventTopics.listView';
import { eventTopicsSharedView } from './eventTopics.sharedView';

export const eventTopicsViews = {
  table: eventTopicsListView,
  detail: eventTopicsSharedView(),
  edit: eventTopicsSharedView(),
};
