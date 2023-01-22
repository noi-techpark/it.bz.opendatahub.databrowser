import { articleListView } from './article.listView';
import { articleNewView } from './article.newView';
import { articleSharedView } from './article.sharedView';

export const articleViews = {
  table: articleListView,
  detail: articleSharedView(),
  edit: articleSharedView(),
  new: articleNewView,
};
