import { DetailViewConfig } from '../../../domain/datasetConfig/types';
import { CellComponent } from '../../../domain/cellComponents/types';

export const snowReportDetailView: DetailViewConfig = {
  elements: [
    {
      name: 'Main data',
      slug: 'main-data',
      subcategories: [
        {
          name: 'General data',
          properties: [
            {
              title: 'Ski region',
              component: CellComponent.StringCell,
              fields: { text: 'Skiregion' },
            },
            {
              title: 'Area name',
              component: CellComponent.StringCell,
              fields: { text: 'Areaname' },
            },
            {
              title: 'Logo',
              component: CellComponent.ImageCell,
              class: 'w-40',
              fields: {
                src: 'contactlogo',
              },
            },
            {
              title: 'Ski Map',
              component: CellComponent.ImageCell,
              class: 'w-40',
              fields: {
                src: 'SkiMapUrl',
              },
            },
          ],
        },
        {
          name: 'IDs',
          properties: [
            {
              title: 'ID',
              component: CellComponent.StringCell,
              fields: { text: 'Id' },
              class: 'break-all',
            },
            {
              title: 'RID',
              component: CellComponent.StringCell,
              fields: { text: 'RID' },
              class: 'break-all',
            },
          ],
        },
        {
          name: 'Data states',
          properties: [
            {
              title: 'Last Changes',
              component: CellComponent.DateCell,
              fields: { date: 'LastUpdate' },
              params: {
                format: 'd/M/yyyy HH:mm',
              },
            },
            {
              title: 'Active on Source',
              component: CellComponent.StringCell,
              fields: { text: 'Active' },
            },
            {
              title: 'Active on ODH',
              component: CellComponent.StringCell,
              fields: { text: 'OdhActive' },
            },
          ],
        },
        {
          name: 'Source',
          properties: [
            {
              title: 'Source',
              component: CellComponent.ArrayCell,
              fields: { items: '' },
            },
          ],
        },
      ],
    },
    {
      name: 'Contact',
      slug: 'contact',
      subcategories: [
        {
          name: 'Address',
          properties: [
            {
              title: 'Address',
              component: CellComponent.StringCell,
              fields: { text: 'contactadress' },
            },
            {
              title: 'ZIP-Code',
              component: CellComponent.StringCell,
              fields: { text: 'contactcap' },
            },
            {
              title: 'City',
              component: CellComponent.StringCell,
              fields: { text: 'contactcity' },
            },
          ],
        },
        {
          name: 'Contact Details',
          properties: [
            {
              title: 'E-Mail',
              component: CellComponent.StringCell,
              fields: { text: 'contactmail' },
            },
            {
              title: 'Phone Number',
              component: CellComponent.StringCell,
              fields: { text: 'contacttel' },
            },
            {
              title: 'Web-URL',
              component: CellComponent.StringCell,
              fields: { text: 'contactweburl' },
            },
          ],
        },
      ],
    },
    {
      name: 'GPS Data',
      slug: 'gps',
      subcategories: [
        {
          name: 'GPS Data',
          properties: [
            {
              title: 'Nort',
              component: CellComponent.StringCell,
              fields: {
                text: 'contactgpsnorth',
              },
            },
            {
              title: 'East',
              component: CellComponent.StringCell,
              fields: { text: 'contactgpseast' },
            },
          ],
        },
      ],
    },
  ],
};
