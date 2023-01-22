import { webcamInfoListView } from './webcamInfo.listView';
import { webcamInfoSharedView } from './webcamInfo.sharedView';

export const webcamInfoViews = {
  table: webcamInfoListView,
  detail: webcamInfoSharedView(),
  edit: webcamInfoSharedView(),
};
