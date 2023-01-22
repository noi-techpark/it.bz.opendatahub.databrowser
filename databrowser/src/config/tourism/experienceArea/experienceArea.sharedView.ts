import { CellComponent } from '../../../domain/cellComponents/types';
import {
  DetailViewConfig,
  EditViewConfig,
} from '../../../domain/datasetConfig/types';
import {
  dataStatesSubCategory,
  gpsDataCategory,
  idAndCustomIdCells,
  imageGalleryCategory,
  mainImageCell,
  odhTagCategory,
  shortnameCell,
  sourceSubCategory,
  textInfoCategory,
} from '../../builder/tourism';

export const experienceAreaSharedView = ():
  | DetailViewConfig
  | EditViewConfig => ({
  elements: [
    {
      name: 'Main data',
      slug: 'main-data',
      subcategories: [
        {
          name: 'General data',
          properties: [shortnameCell(), mainImageCell()],
        },
        {
          name: 'IDs',
          properties: [
            ...idAndCustomIdCells(),
            {
              title: 'Company Id',
              component: CellComponent.StringCell,
              fields: { text: 'CompanyId' },
              class: 'break-all',
            },
            {
              title: 'Tourismverein IDs',
              component: CellComponent.ArrayCell,
              class: 'w-40',
              fields: {
                items: 'TourismvereinIds',
              },
              params: {
                separator: ', ',
              },
            },
            {
              title: 'District IDs',
              component: CellComponent.ArrayCell,
              class: 'w-40',
              fields: {
                items: 'DistrictIds',
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
    imageGalleryCategory(),
    {
      name: 'Location',
      slug: 'location',
      subcategories: [
        {
          name: 'Locations',
          properties: [
            {
              title: 'Districts',
              component: CellComponent.ArrayCell,
              fields: { items: 'Districts' },
              params: { separator: ', ' },
            },
          ],
        },
      ],
    },
    gpsDataCategory(),
    odhTagCategory(),
  ],
});
