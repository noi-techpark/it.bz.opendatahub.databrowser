import {
  CellComponent,
  FilterComponent,
} from '../../../domain/cellComponents/types';
import { ListViewConfig } from '../../../domain/datasetConfig/types';

export const eventListView: ListViewConfig = {
  elements: [
    {
      title: 'Image',
      component: CellComponent.ImageCell,
      class: 'w-36',
      fields: {
        src: 'Image',
      },
    },
    {
      title: 'Title',
      component: CellComponent.StringCell,
      class: 'w-40',
      fields: {
        text: 'Detail.{language}.Title',
      },
    },
    {
      title: 'Begin Date',
      component: CellComponent.DateCell,
      class: 'w-32',
      params: {
        format: 'd. MMMM yyyy',
      },
      fields: {
        date: 'DateBegin',
      },
    },
    {
      title: 'End Date',
      component: CellComponent.DateCell,
      class: 'w-32',
      params: {
        format: 'd. MMMM yyyy',
      },
      fields: {
        date: 'DateEnd',
      },
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
    {
      title: 'Languages',
      component: CellComponent.ArrayCell,
      class: 'w-32',
      fields: {
        items: 'HasLanguage',
      },
      params: {
        separator: ', ',
      },
    },
    {
      title: 'Edited',
      component: CellComponent.EditedDateCell,
      class: 'w-40',
      fields: {
        date: 'LastChange',
      },
      params: {
        format: 'd. MMMM yyyy',
      },
    },
    {
      title: 'Source',
      component: CellComponent.StringCell,
      class: 'w-28',
      fields: {
        text: 'Source',
      },
    },
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
    {
      title: 'ODH state',
      component: CellComponent.StateCell,
      class: 'w-40',
      fields: {
        state: 'OdhActive',
      },
      filter: {
        name: 'odhactive',
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
  ],
};
