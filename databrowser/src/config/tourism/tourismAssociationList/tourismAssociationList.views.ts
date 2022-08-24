import { tourismAssociationListDetailView } from './tourismAssociationList.detailView';
import { tourismAssociationListEditView } from './tourismAssociationList.editView';
import { tourismAssociationListListView } from './tourismAssociationList.listView';
import { tourismAssociationListQuickView } from './tourismAssociationList.quickView';

export const tourismAssociationListViews = {
  table: tourismAssociationListListView,
  detail: tourismAssociationListDetailView,
  quick: tourismAssociationListQuickView,
  edit: tourismAssociationListEditView,
};
