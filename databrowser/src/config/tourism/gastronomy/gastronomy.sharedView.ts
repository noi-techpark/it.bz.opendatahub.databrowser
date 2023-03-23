import { CellComponent } from '../../../domain/cellComponents/types';
import {
  DetailViewConfig,
  EditViewConfig,
} from '../../../domain/datasetConfig/types';
import {
  contactCategory,
  dataStatesSubCategory,
  gpsDataCategory,
  idReadOnlyCell,
  imageGalleryCategory,
  locationCategory,
  logoWithMainImageCells,
  municipalityIdCell,
  odhTagCategory,
  regionIdCell,
  shortnameCell,
  sourceSubCategory,
  textInfoCategory,
} from '../../builder/tourism';

export const gastronomySharedView = (): EditViewConfig | DetailViewConfig => ({
  elements: [
    {
      name: 'Main data',
      slug: 'main-data',
      subcategories: [
        {
          name: 'General data',
          properties: [shortnameCell(), ...logoWithMainImageCells()],
        },
        {
          name: 'Gastronomy details',
          properties: [
            {
              title: 'Max Seating Capacity',
              component: CellComponent.StringCell,
              fields: { text: 'MaxSeatingCapacity' },
            },
            {
              title: 'Category',
              component: CellComponent.ArrayTagsCell,
              fields: {
                items: 'CategoryCodes',
              },
              params: {
                fieldName: 'Shortname',
                separator: ', ',
                max: '3',
              },
            },
            {
              title: 'Facilities',
              component: CellComponent.ArrayTagsCell,
              fields: {
                items: 'Facilities',
              },
              params: {
                fieldName: 'Shortname',
                separator: ', ',
                max: '3',
              },
            },
          ],
        },
        {
          name: 'IDs',
          properties: [
            idReadOnlyCell(),
            regionIdCell('LocationInfo.RegionInfo.Id'),
            {
              title: 'Area ID',
              component: CellComponent.StringCell,
              fields: { text: 'LocationInfo.AreaInfo.Id' },
              class: 'break-all',
            },
            municipalityIdCell('LocationInfo.MunicipalityInfo.Id'),
            {
              title: 'District ID',
              component: CellComponent.StringCell,
              fields: { text: 'DistrictId' },
              class: 'break-all',
            },
            {
              title: 'Accommodation ID',
              component: CellComponent.StringCell,
              fields: { text: 'AccommodationId' },
              class: 'break-all',
            },
            {
              title: 'Marketing group ID',
              component: CellComponent.StringCell,
              fields: { text: 'MarketinggroupId' },
              class: 'break-all',
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
    locationCategory(),
    gpsDataCategory(),
    odhTagCategory('gastronomy'),
  ],
});
