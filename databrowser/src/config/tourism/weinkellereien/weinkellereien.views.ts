import { weinkellereienDetailView } from './weinkellereien.detailView';
import { weinkellereienEditView } from './weinkellereien.editView';
import { weinkellereienListView } from './weinkellereien.listView';
import { weinkellereienQuickView } from './weinkellereien.quickView';

export const weinkellereienViews = {
  table: weinkellereienListView,
  detail: weinkellereienDetailView,
  quick: weinkellereienQuickView,
  edit: weinkellereienEditView,
};
