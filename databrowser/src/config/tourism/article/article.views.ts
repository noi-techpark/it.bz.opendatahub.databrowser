import { articleDetailView } from './article.detailView';
import { articleEditView } from './article.editView';
import { articleListView } from './article.listView';
import { articleQuickView } from './article.quickView';

export const articleViews = {
  table: articleListView,
  detail: articleDetailView,
  quick: articleQuickView,
  edit: articleEditView,
};
