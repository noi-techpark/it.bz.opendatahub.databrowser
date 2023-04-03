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
  mainImageCell,
  odhTagCategory,
  regionIdCell,
  shortnameCell,
  sourceSubCategory,
  textInfoCategory,
  webcamCategory,
} from '../../builder/tourism';

export const municipalitySharedView = ():
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
          name: 'Municipality Details',
          properties: [
            {
              title: 'CAP',
              component: CellComponent.StringCell,
              fields: {
                text: 'Plz',
              },
            },
            {
              title: 'Inhabitants',
              component: CellComponent.StringCell,
              fields: {
                text: 'Inhabitants',
              },
            },
          ],
        },
        {
          name: 'IDs',
          properties: [
            ...idAndCustomIdCells(),
            {
              title: 'Siag Id',
              component: CellComponent.StringCell,
              fields: { text: 'SiagId' },
              class: 'break-all',
            },
            {
              title: 'Tourismverein Id',
              component: CellComponent.StringCell,
              fields: { text: 'TourismvereinId' },
              class: 'break-all',
            },
            {
              title: 'Istat Number',
              component: CellComponent.StringCell,
              fields: { text: 'IstatNumber' },
              class: 'break-all',
            },
            regionIdCell('RegionId'),
            {
              title: 'HGV id',
              component: CellComponent.StringCell,
              fields: { text: 'Mapping.hgv.id' },
              class: 'break-all',
            },
          ],
        },
        dataStatesSubCategory({ hasVisibleInSearch: true }),
        sourceSubCategory(),
      ],
    },
    textInfoCategory(),
    imageGalleryCategory(),
    contactCategory(),
    gpsDataCategory(),
    webcamCategory(),
    odhTagCategory(),
  ],
});
