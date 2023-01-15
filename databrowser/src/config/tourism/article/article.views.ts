import { articleDetailView } from './article.detailView';
import { articleEditView } from './article.editView';
import { articleListView } from './article.listView';
import { articleNewView } from './article.newView';

export const articleViews = {
  table: articleListView,
  detail: articleDetailView,
  edit: articleEditView,
  new: articleNewView,
};
