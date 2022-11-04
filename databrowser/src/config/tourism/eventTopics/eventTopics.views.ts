import { eventTopicsDetailView } from './eventTopics.detailView';
import { eventTopicsEditView } from './eventTopics.editView';
import { eventTopicsListView } from './eventTopics.listView';

export const eventTopicsViews = {
  table: eventTopicsListView,
  detail: eventTopicsDetailView,
  edit: eventTopicsEditView,
};
