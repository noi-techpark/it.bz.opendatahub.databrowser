import { ListViewConfig } from '../../../domain/datasetConfig/types';
import { CellComponent } from '../../../domain/cellComponents/types';

export const weatherInfoListView: ListViewConfig = {
  elements: [
    {
      title: 'Image',
      component: CellComponent.ImageCell,
      class: 'w-40',
      fields: {
        src: 'Weather.{language}.Conditions.0.WeatherImgurl',
      },
    },
    
    {
      title: 'Title',
      component: CellComponent.StringCell,
      class: 'w-48',
      fields: {
        text: 'Weather.{language}.Conditions.0.Title',
      },
    },
    {
      title: 'Date',
      component: CellComponent.DateCellOrdinal,
      class: 'w-48',
      params: {
        format: 'dd MMMM yyyy'
      },
      fields: {
        date: 'Weather.{language}.Conditions.0.date',
      },
    },
    {
      title: 'Reliability',
      component: CellComponent.StringCell,
      class: 'w-48',
      fields: {
        text: 'Weather.{language}.Conditions.0.Reliability',
      },
    },
    {
      title: 'Languages',
      component: CellComponent.ArrayCell,
      class: 'w-40',
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
        format: 'dd MMMM yyyy',
      },
    },
    {
      title: 'Source',
      component: CellComponent.StringCell,
      class: 'w-36',
      fields: {
        text: 'LicenseInfo.LicenseHolder',
      },
    },
    {
      title: 'ODH state',
      component: CellComponent.StateCell,
      class: 'w-36',
      fields: {
        state: 'OdhActive',
      },
    },
    
  ],
};
