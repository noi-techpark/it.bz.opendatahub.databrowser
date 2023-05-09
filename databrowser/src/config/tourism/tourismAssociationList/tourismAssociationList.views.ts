import { tourismAssociationListListView } from './tourismAssociationList.listView';
import { tourismAssociationListSharedView } from './tourismAssociationList.sharedView';

export const tourismAssociationListViews = {
  table: tourismAssociationListListView,
  detail: tourismAssociationListSharedView(),
  edit: tourismAssociationListSharedView(),
  new: tourismAssociationListSharedView(),
};
