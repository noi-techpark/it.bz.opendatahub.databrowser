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
  shortnameCell,
  sourceSubCategory,
  textInfoCategory,
  webcamCategory,
  locationCategory,
} from '../../builder/tourism';
import { DEFAULT_DATE_TIME_FORMAT } from '../../utils';

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
            municipalityIdCell('LocationInfo.MunicipalityInfo.Id'),
          ],
        },
        dataStatesSubCategory(),
        sourceSubCategory(),
      ],
    },
    {
      name: 'Ski details',
      slug: 'ski-detail',
      subcategories: [
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
              component: CellComponent.ImageEditCell,
              fields: {
                src: 'SkiAreaMapURL',
              },
            },
          ],
        },
      ],
    },
    textInfoCategory(),
    contactCategory(),
    imageGalleryCategory(),
    {
      name: 'Season / Opening hours',
      slug: 'season-opening-hours',
      subcategories: [
        {
          name: 'Season / Opening hours',
          properties: [
            {
              title: 'Name',
              component: CellComponent.StringCell,
              fields: { text: 'Shortname' },
            },
            {
              title: 'Start Date and Time',
              component: CellComponent.DateCell,
              fields: { date: 'OperationSchedule.0.Start' },
              params: { type: 'datetime', format: DEFAULT_DATE_TIME_FORMAT },
            },
            {
              title: 'End Date and Time',
              component: CellComponent.DateCell,
              fields: { date: 'OperationSchedule.0.Stop' },
              params: { type: 'datetime', format: DEFAULT_DATE_TIME_FORMAT },
            },
          ],
        },
      ],
    },
    locationCategory(),
    {
      name: 'Related content',
      slug: 'related-content',
      subcategories: [
        {
          name: 'Related data',
          properties: [
            {
              title: 'Activity',
              component: CellComponent.StringCell,
              fields: { text: 'RelatedContent' },
            },
            {
              title: 'Gastronomy',
              component: CellComponent.StringCell,
              fields: { text: 'RelatedContent' },
            },
            {
              title: 'Event',
              component: CellComponent.StringCell,
              fields: { text: 'RelatedContent' },
            },
          ],
        },
      ],
    },
    gpsDataCategory(),
    webcamCategory(),
    odhTagCategory(),
  ],
});
