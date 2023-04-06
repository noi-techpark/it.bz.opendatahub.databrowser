import { CellComponent } from '../../../domain/cellComponents/types';
import {
  DetailViewConfig,
  EditViewConfig,
} from '../../../domain/datasetConfig/types';
import {
  gpsDataCategory,
  idReadOnlyCell,
  shortnameCell,
  dataStatesSubCategory,
} from '../../builder/tourism';
import { publishedOnCell } from '../../builder/tourism/publishedOn';
import { DEFAULT_DATE_FORMAT } from '../../utils';

export const measuringPointSharedView = ():
  | DetailViewConfig
  | EditViewConfig => ({
  elements: [
    {
      name: 'Main data',
      slug: 'main-data',
      subcategories: [
        {
          name: 'General data',
          properties: [
            idReadOnlyCell(),
            shortnameCell(),
            {
              title: 'Owner ID',
              component: CellComponent.StringCell,
              fields: { text: 'OwnerId' },
            },
          ],
        },
        dataStatesSubCategory(),
      ],
    },
    {
      name: 'Location',
      slug: 'location',
      subcategories: [
        {
          name: 'Location',
          properties: [
            {
              title: 'TV info',
              component: CellComponent.StringCell,
              fields: { text: 'LocationInfo.TvInfo.Name.{language}' },
            },
            {
              title: 'Region info',
              component: CellComponent.StringCell,
              fields: { text: 'LocationInfo.RegionInfo.Name.{language}' },
            },
          ],
        },
      ],
    },
    gpsDataCategory(),
    {
      name: 'Sensor data',
      slug: 'sensor-data',
      subcategories: [
        {
          name: 'Sensor data',
          properties: [
            {
              title: 'Snow height',
              component: CellComponent.StringCell,
              fields: { text: 'SnowHeight' },
            },
            {
              title: 'New snow height',
              component: CellComponent.StringCell,
              fields: { text: 'newSnowHeight' },
            },
            {
              title: 'Temperature',
              component: CellComponent.StringCell,
              fields: { text: 'Temperature' },
            },
            {
              title: 'Last snow date',
              component: CellComponent.DateCell,
              fields: { date: 'LastSnowDate' },
              params: { format: DEFAULT_DATE_FORMAT },
            },
          ],
        },
      ],
    },
  ],
});
