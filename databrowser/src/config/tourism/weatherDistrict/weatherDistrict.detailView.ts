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
          name: 'IDs',
          properties: [
            {
              title: 'ID',
              component: CellComponent.StringCell,
              fields: { text: 'Id' },
              class: 'break-all',
            },
            {
              title: 'Tourism Verein Ids',
              component: CellComponent.StringCell,
              fields: { text: 'TourismVereinIds' },
              class: 'break-all',
            },
          ],
        },
        {
          name: 'Source',
          properties: [
            {
              title: 'License Holder',
              component: CellComponent.StringCell,
              fields: { text: 'LicenseInfo.LicenseHolder' },
            },
          ],
        },
      ],
    },
  ],
};
