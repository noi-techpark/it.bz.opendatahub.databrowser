import { articleDetailView } from './article.detailView';
import { articleEditView } from './article.editView';
import { articleListView } from './article.listView';

export const articleViews = {
  table: articleListView,
  detail: articleDetailView,
  edit: articleEditView,
};
