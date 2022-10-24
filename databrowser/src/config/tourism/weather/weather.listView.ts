import { ListViewConfig } from '../../../domain/datasetConfig/types';
import { CellComponent } from '../../../domain/cellComponents/types';

export const weatherListView: ListViewConfig = {
  elements: [
    {
      title: 'Image',
      component: CellComponent.ImageCell,
      class: 'w-40',
      fields: {
        src: 'Conditions.0.WeatherImgurl',
      },
    },
    {
      title: 'Evolution Title',
      component: CellComponent.StringCell,
      class: 'w-48',
      fields: {
        text: 'evolutiontitle',
      },
    },
    {
      title: 'Evolution',
      component: CellComponent.StringCell,
      class: 'w-48',
      fields: {
        text: 'evolution',
      },
    },
    {
      title: 'Condition Title',
      component: CellComponent.StringCell,
      class: 'w-40',
      fields: {
        text: 'Conditions.0.Title',
      },
    },
    {
      title: 'Conditions',
      component: CellComponent.StringCell,
      class: 'w-40',
      fields: {
        text: 'Conditions.0.WeatherCondition',
      },
    },
    {
      title: 'Temperatures',
      component: CellComponent.StringCell,
      class: 'w-40',
      fields: {
        text: 'Conditions.0.Temperatures',
      },
    },
    {
      title: 'Languages',
      component: CellComponent.StringCell,
      class: 'w-40',
      fields: {
        text: 'language',
      },
    },
    {
      title: 'Edited',
      component: CellComponent.EditedDateCell,
      class: 'w-40',
      fields: {
        date: 'Conditions.0.date',
      },
      params: {
        format: 'do MMMM yyyy',
      },
    },
    {
      title: 'Source',
      component: CellComponent.UrlCell,
      class: 'w-36',
      fields: {
        text: 'LicenseInfo.LicenseHolder',
      },
    },
  ],
};
