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
  logoWithMainImageCells,
  municipalityIdCell,
  odhTagCategory,
  seasonCategory,
  shortnameCell,
  sourceSubCategory,
  textInfoCategory,
} from '../../builder/tourism';

export const skiAreaSharedView = (): DetailViewConfig | EditViewConfig => ({
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
              title: 'Ski region name',
              component: CellComponent.StringCell,
              fields: { text: 'SkiRegionName.{language}' },
            },
            ...logoWithMainImageCells(),
          ],
        },
        {
          name: 'IDs',
          properties: [
            ...idAndCustomIdCells(),
            {
              title: 'Tourismverein Ids',
              component: CellComponent.ArrayCell,
              fields: {
                items: 'TourismvereinIds',
              },
              params: {
                separator: ', ',
              },
            },
            {
              title: 'Region Ids',
              component: CellComponent.ArrayCell,
              fields: {
                items: 'RegionIds',
              },
              params: {
                separator: ', ',
              },
            },
            {
              title: 'SkiRegionId',
              component: CellComponent.StringCell,
              fields: { text: 'SkiRegionId' },
              class: 'break-all',
            },
            {
              title: 'Area Ids',
              component: CellComponent.ArrayCell,
              fields: {
                items: 'AreaId',
              },
              params: {
                separator: ', ',
              },
            },
          ],
        },
        {
          name: 'Slope information',
          properties: [
            {
              title: 'Total slope Km',
              component: CellComponent.StringCell,
              fields: { text: 'TotalSlopeKm' },
            },
            {
              title: 'Slope Km Blue',
              component: CellComponent.StringCell,
              fields: { text: 'SlopeKmBlue' },
            },
            {
              title: 'Slope Km Black',
              component: CellComponent.StringCell,
              fields: { text: 'SlopeKmBlack' },
            },
            {
              title: 'Slope Km Red',
              component: CellComponent.StringCell,
              fields: { text: 'SlopeKmRed' },
            },
          ],
        },
        {
          name: 'Altimeters',
          properties: [
            {
              title: 'Altimeters From',
              component: CellComponent.StringCell,
              fields: { text: 'AltitudeFrom' },
            },
            {
              title: 'Altimeters To',
              component: CellComponent.StringCell,
              fields: { text: 'AltitudeTo' },
            },
          ],
        },
        {
          name: 'Ski map',
          properties: [
            {
              title: 'Ski map',
              component: CellComponent.ImageCell,
              fields: {
                src: 'SkiAreaMapURL',
              },
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
    seasonCategory(),
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
              fields: { text: 'LocationInfo.RegionInfo.{language}' },
            },
            {
              title: 'Valley',
              component: CellComponent.StringCell,
              fields: { text: 'LocationInfo.TvInfo.{language}' },
            },
            {
              title: 'District',
              component: CellComponent.StringCell,
              fields: { text: 'LocationInfo.DistrictInfo.{language}' },
            },
            municipalityIdCell('LocationInfo.MunicipalityInfo.Id'),
            {
              title: 'Ski Region',
              component: CellComponent.StringCell,
              fields: { text: 'SkiRegionName.{language}' },
            },
          ],
        },
      ],
    },
    gpsDataCategory(),
    odhTagCategory(),
  ],
});
