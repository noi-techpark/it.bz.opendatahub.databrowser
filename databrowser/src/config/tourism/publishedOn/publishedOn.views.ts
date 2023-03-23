import { publishedOnListView } from './publishedOn.listView';
import { publishedOnNewView } from './publishedOn.newView';
import { publishedOnSharedView } from './publishedOn.sharedView';

export const publishedOnViews = {
  table: publishedOnListView,
  detail: publishedOnSharedView(),
  edit: publishedOnSharedView(),
  new: publishedOnNewView,
};
