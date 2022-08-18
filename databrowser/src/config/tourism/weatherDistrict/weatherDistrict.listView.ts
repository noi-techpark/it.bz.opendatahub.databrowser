import { ListViewConfig } from '../../../domain/datasetConfig/types';
import { CellComponent } from '../../../domain/cellComponents/types';

export const weatherDistrictListView: ListViewConfig = {
  elements: [
    {
      title: 'Image',
      component: CellComponent.ImageCell,
      class: 'w-40',
      fields: {
        src: 'BezirksForecast.0.WeatherImgUrl',
      },
    },
    
    {
      title: 'Title',
      component: CellComponent.StringCell,
      class: 'w-48',
      fields: {
        text: 'BezirksForecast.0.WeatherDesc',
      },
    },
    {
      title: 'Date',
      component: CellComponent.DateCell,
      class: 'w-48',
      params: {
        format: 'd. MM. yyyy'
      },
      fields: {
        date: 'BezirksForecast.0.date',
      },
    },
    {
      title: 'Location',
      component: CellComponent.StringCell,
      class: 'w-48',
      fields: {
        text: 'DistrictName',
      },
    },
    {
      title: 'Max Temperature',
      component: CellComponent.StringCell,
      class: 'w-36',
      fields: {
        text: 'BezirksForecast.0.MaxTemp',
      },
    },
    {
      title: 'Min Temperature',
      component: CellComponent.StringCell,
      class: 'w-36',
      fields: {
        text: 'BezirksForecast.0.MinTemp',
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
        date: 'date',
      },
      params: {
        format: 'dd. MMMM yyyy',
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
