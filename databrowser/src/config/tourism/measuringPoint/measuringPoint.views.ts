import { measuringPointDetailView } from './measuringPoint.detailView';
import { measuringPointEditView } from './measuringPoint.editView';
import { measuringPointListView } from './measuringPoint.listView';
import { measuringPointQuickView } from './measuringPoint.quickView';

export const measuringPointViews = {
  table: measuringPointListView,
  detail: measuringPointDetailView,
  quick: measuringPointQuickView,
  edit: measuringPointEditView,
};
