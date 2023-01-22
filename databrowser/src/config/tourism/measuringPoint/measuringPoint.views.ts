import { measuringPointListView } from './measuringPoint.listView';
import { measuringPointSharedView } from './measuringPoint.sharedView';

export const measuringPointViews = {
  table: measuringPointListView,
  detail: measuringPointSharedView(),
  edit: measuringPointSharedView(),
};
