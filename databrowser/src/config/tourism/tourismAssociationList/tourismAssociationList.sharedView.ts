import { CellComponent } from '../../../domain/cellComponents/types';
import {
  DetailViewConfig,
  EditViewConfig,
} from '../../../domain/datasetConfig/types';
import {
  contactCategory,
  dataStatesSubCategory,
  gpsDataCategory,
  idAndCustomIdCells,
  imageGalleryCategory,
  odhTagCategory,
  regionIdCell,
  shortnameWithLogoAndMainImageSubCategory,
  sourceSubCategory,
  textInfoCategory,
} from '../../builder/tourism';

export const tourismAssociationListSharedView = ():
  | DetailViewConfig
  | EditViewConfig => ({
  elements: [
    {
      name: 'Main data',
      slug: 'main-data',
      subcategories: [
        shortnameWithLogoAndMainImageSubCategory(),
        {
          name: 'IDs',
          properties: [
            ...idAndCustomIdCells(),
            regionIdCell('RegionId'),
            {
              title: 'Ski Area Ids',
              component: CellComponent.ArrayCell,
              fields: {
                items: 'SkiAreaIds',
              },
              params: {
                separator: ', ',
              },
            },
          ],
        },
        dataStatesSubCategory({ hasVisibleInSearch: true }),
        sourceSubCategory(),
      ],
    },
    textInfoCategory(),
    contactCategory(),
    imageGalleryCategory(),
    gpsDataCategory(),
    odhTagCategory(),
  ],
});
