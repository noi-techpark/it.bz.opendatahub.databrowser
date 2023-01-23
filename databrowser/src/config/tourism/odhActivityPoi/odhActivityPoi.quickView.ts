import {
  QuickViewConfig,
  QuickViewSectionType,
} from '../../../domain/datasetConfig/types';

export const odhActivityPoiQuickView: QuickViewConfig = {
  showTopGallery: true,
  elements: [
    {
      sectionType: QuickViewSectionType.INFO,
    },
    {
      sectionType: QuickViewSectionType.CONTACTS,
    },
    {
      sectionType: QuickViewSectionType.WEBCAMS,
    },
    {
      sectionType: QuickViewSectionType.MAP,
      // NOTE: here can be added eg. custom default zoom etc.
    },
    {
      sectionType: QuickViewSectionType.OPENING_HORUS,
    },
    {
      sectionType: QuickViewSectionType.RECORD_INFO,
    },
  ],
};
