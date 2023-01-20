import {
  CellComponent,
  FilterComponent,
} from '../../../domain/cellComponents/types';
import { ListViewConfig } from '../../../domain/datasetConfig/types';
import {
  EDITED_TABLE_CONFIG,
  IMAGE_TABLE_CONFIG,
  LANGUAGE_TABLE_CONFIG,
  ODH_ACTIVE_TABLE_CONFIG,
  SOURCE_TABLE_CONFIG,
  TITLE_TABLE_CONFIG,
} from '../configBuilder';

export const eventListView: ListViewConfig = {
  elements: [
    { ...IMAGE_TABLE_CONFIG },
    { ...TITLE_TABLE_CONFIG },
    {
      title: 'Date start',
      component: CellComponent.EditedDateCell,
      class: 'w-48',
      params: { format: 'do MMM yyyy HH:mm' },
      fields: { date: 'DateBegin' },
    },
    {
      title: 'Date end',
      component: CellComponent.EditedDateCell,
      class: 'w-48',
      params: { format: 'do MMM yyyy HH:mm' },
      fields: { date: 'DateEnd' },
    },
    {
      title: 'Price',
      component: CellComponent.StringCell,
      class: 'w-32',
      fields: {
        text: 'EventPrice.Price',
      },
    },
    {
      title: 'Event Organizer',
      component: CellComponent.StringCell,
      class: 'w-48',
      fields: {
        text: 'OrganizerInfos.{language}.CompanyName',
      },
    },
    {
      title: 'Location',
      component: CellComponent.StringCell,
      class: 'w-48',
      fields: {
        text: 'LocationInfo.DistrictInfo.Name.en',
      },
    },
    { ...LANGUAGE_TABLE_CONFIG },
    { ...EDITED_TABLE_CONFIG },
    { ...SOURCE_TABLE_CONFIG },
    {
      title: 'Source state',
      component: CellComponent.StateCell,
      class: 'w-40',
      fields: {
        state: 'Active',
      },
      filter: {
        name: 'active',
        component: FilterComponent.FixedValue,
        params: {
          filterOptions: [
            {
              label: 'Active',
              value: 'true',
            },
            {
              label: 'Not active',
              value: 'false',
            },
          ],
        },
      },
    },
    { ...ODH_ACTIVE_TABLE_CONFIG },
  ],
};
