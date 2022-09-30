import { DetailViewConfig } from '../../../domain/datasetConfig/types';
import { CellComponent } from '../../../domain/cellComponents/types';

export const weatherDistrictDetailView: DetailViewConfig = {
  elements: [
    {
      name: 'Main data',
      slug: 'main-data',
      subcategories: [
        {
          name: 'General data',
          properties: [
            {
              title: 'District Name',
              component: CellComponent.StringCell,
              fields: { text: 'DistrictName' },
            },
          ],
        },
        {
          name: 'Forecast',
          properties: [
            {
              title: 'Date',
              component: CellComponent.DateCell,
              class: 'w-48',
              params: {
                format: 'do MMMM yyyy',
              },
              fields: {
                date: 'BezirksForecast.0.date',
              },
            },
            {
              title: 'Weather image',
              component: CellComponent.ImageCell,
              class: 'w-40',
              fields: {
                text: 'BezirksForecast.0.WeatherImgUrl',
              },
              params: {
                width: '20%',
              },
            },
            {
              title: 'Weather description',
              component: CellComponent.StringCell,
              class: 'w-36',
              fields: {
                text: 'BezirksForecast.0.WeatherDesc',
              },
            },
            {
              title: 'Weather code',
              component: CellComponent.StringCell,
              class: 'w-36',
              fields: {
                text: 'BezirksForecast.0.WeatherCode',
              },
            },
            {
              title: 'Weather code',
              component: CellComponent.StringCell,
              class: 'w-36',
              fields: {
                text: 'BezirksForecast.0.WeatherCode',
              },
            },
            {
              title: 'Max temp',
              component: CellComponent.StringCell,
              class: 'w-36',
              fields: {
                text: 'BezirksForecast.0.MaxTemp',
              },
            },
            {
              title: 'Min temp',
              component: CellComponent.StringCell,
              class: 'w-36',
              fields: {
                text: 'BezirksForecast.0.MinTemp',
              },
            },
            {
              title: 'Freeze',
              component: CellComponent.StringCell,
              class: 'w-36',
              fields: {
                text: 'BezirksForecast.0.Freeze',
              },
            },
            {
              title: 'Rain from',
              component: CellComponent.StringCell,
              class: 'w-36',
              fields: {
                text: 'BezirksForecast.0.RainFrom',
              },
            },
            {
              title: 'Rain to',
              component: CellComponent.StringCell,
              class: 'w-36',
              fields: {
                text: 'BezirksForecast.0.RainTo',
              },
            },
            {
              title: 'Part1',
              component: CellComponent.StringCell,
              class: 'w-36',
              fields: {
                text: 'BezirksForecast.0.Part1',
              },
            },
            {
              title: 'Part2',
              component: CellComponent.StringCell,
              class: 'w-36',
              fields: {
                text: 'BezirksForecast.0.Part2',
              },
            },
            {
              title: 'Part3',
              component: CellComponent.StringCell,
              class: 'w-36',
              fields: {
                text: 'BezirksForecast.0.Part3',
              },
            },
            {
              title: 'Part4',
              component: CellComponent.StringCell,
              class: 'w-36',
              fields: {
                text: 'BezirksForecast.0.Part4',
              },
            },
            {
              title: 'Thunderstorm',
              component: CellComponent.StringCell,
              class: 'w-36',
              fields: {
                text: 'BezirksForecast.0.Thunderstorm',
              },
            },
          ],
        },
      ],
    },
  ],
};
