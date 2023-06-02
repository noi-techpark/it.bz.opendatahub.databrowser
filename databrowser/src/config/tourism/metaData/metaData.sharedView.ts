import { CellComponent } from '../../../domain/cellComponents/types';
import {
  DetailViewConfig,
  EditViewConfig,
} from '../../../domain/datasetConfig/types';
import { idReadOnlyCell, shortnameCell } from '../../builder/tourism';

export const metaDataSharedView = (): DetailViewConfig | EditViewConfig => ({
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
              title: 'Description',
              component: CellComponent.StringCell,
              fields: { text: 'ApiDescription.{language}' },
            },
            {
              title: 'Deprecated',
              component: CellComponent.ToggleCell,
              fields: { enabled: 'Deprecated' },
            },
            {
              title: 'Path',
              component: CellComponent.ArrayEditableCell,
              listFields: {
                attributeName: 'items',
                pathToParent: 'PathParam',
              },
            },
            {
              title: 'Filter',
              component: CellComponent.ArrayEditableCell,
              listFields: {
                attributeName: 'items',
                pathToParent: 'ApiFilter',
              },
            },
            {
              title: 'API URL',
              component: CellComponent.UrlCell,
              fields: { text: 'ApiUrl' },
              params: { readonly: 'true' },
            },
            {
              title: 'Swagger URL',
              component: CellComponent.UrlCell,
              fields: { text: 'SwaggerUrl' },
            },
          ],
        },
        {
          name: 'IDs',
          properties: [idReadOnlyCell()],
        },
        {
          name: 'Count',
          properties: [
            {
              title: 'Count',
              component: CellComponent.JsonCell,
              fields: { data: 'RecordCount' },
              params: { usePreformatted: 'true' },
            },
          ],
        },
      ],
    },
  ],
});
