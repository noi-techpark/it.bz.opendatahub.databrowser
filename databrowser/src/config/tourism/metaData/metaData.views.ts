import { metaDataListView } from './metaData.listView';
import { metaDataSharedView } from './metaData.sharedView';

export const metaDataViews = {
  table: metaDataListView,
  detail: metaDataSharedView(),
  edit: metaDataSharedView(),
};
