import { CellComponent } from '../../../domain/cellComponents/types';
import {
  DetailViewConfig,
  EditViewConfig,
} from '../../../domain/datasetConfig/types';
import {
  dataStatesWithInsertsSubCategory,
  gpsDataCategory,
  idAndCustomIdCells,
  imageGalleryCategory,
  locationCategoryDistrict,
  odhTagCategory,
  shortnameCell,
  sourceSubCategory,
  textInfoCategory,
  webcamCategory,
} from '../../builder/tourism';

export const districtSharedView = (): DetailViewConfig | EditViewConfig => ({
  elements: [
    {
      name: 'Main data',
      slug: 'main-data',
      subcategories: [
        {
          name: 'General data',
          properties: [shortnameCell()],
        },
        {
          name: 'IDs',
          properties: [
            ...idAndCustomIdCells(),
            {
              title: 'Siag ID',
              component: CellComponent.StringCell,
              fields: { text: 'SiagId' },
            },
            {
              title: 'HGV ID',
              component: CellComponent.StringCell,
              fields: { text: 'hgv.id' },
            },
          ],
        },
        {
          ...dataStatesWithInsertsSubCategory([
            {
              position: 1,
              properties: [
                {
                  title: 'Is comune',
                  component: CellComponent.ToggleCell,
                  fields: { enabled: 'IsComune' },
                },
                {
                  title: 'Visible in Search',
                  component: CellComponent.ToggleCell,
                  fields: { enabled: 'VisibleInSearch' },
                },
              ],
            },
          ]),
        },
        sourceSubCategory(),
      ],
    },
    textInfoCategory(),
    imageGalleryCategory(),
    locationCategoryDistrict(),
    gpsDataCategory(),
    webcamCategory(),
    odhTagCategory(),
  ],
});
