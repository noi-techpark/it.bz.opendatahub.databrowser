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
          properties: [
            shortnameCell(),
            {
              title: 'Max Seating Capacity',
              component: CellComponent.StringCell,
              fields: { text: 'MaxSeatingCapacity' },
            },
            {
              title: 'Category',
              component: CellComponent.ArrayCellTags,
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
              component: CellComponent.ArrayCellTags,
              fields: {
                items: 'Facilities',
              },
              params: {
                fieldName: 'Shortname',
                separator: ', ',
                max: '3',
              },
            },
            ...logoWithMainImageCells(),
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
        dataStatesSubCategory(),
        sourceSubCategory(),
      ],
    },
    textInfoCategory(),
    contactCategory(),
    imageGalleryCategory(),
    {
      name: 'Location',
      slug: 'location',
      subcategories: [
        {
          name: 'Location',
          properties: [
            {
              title: 'Region',
              component: CellComponent.StringCell,
              fields: { text: 'LocationInfo.RegionInfo.Name.{language}' },
            },
            municipalityIdCell('LocationInfo.MunicipalityInfo.Id'),
            {
              title: 'District',
              component: CellComponent.StringCell,
              fields: { text: 'LocationInfo.DistrictInfo.Name.{language}' },
            },
          ],
        },
      ],
    },
    gpsDataCategory(),
    odhTagCategory('gastronomy'),
  ],
});
