import { eventTopicsDetailView } from './eventTopics.detailView';
import { eventTopicsQuickView } from './eventTopics.quickView';
import { eventTopicsEditView } from './eventTopics.editView';
import { eventTopicsListView } from './eventTopics.listView';

export const eventTopicsViews = {
  table: eventTopicsListView,
  detail: eventTopicsDetailView,
  quick: eventTopicsQuickView,
  edit: eventTopicsEditView,
};
