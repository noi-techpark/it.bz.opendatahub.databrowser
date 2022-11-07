import { measuringPointDetailView } from './measuringPoint.detailView';
import { measuringPointEditView } from './measuringPoint.editView';
import { measuringPointListView } from './measuringPoint.listView';

export const measuringPointViews = {
  table: measuringPointListView,
  detail: measuringPointDetailView,
  edit: measuringPointEditView,
};
