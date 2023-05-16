import { CellComponent } from '../../../domain/cellComponents/types';
import {
  DetailElements,
  PropertyConfig,
} from '../../../domain/datasetConfig/types';
import { withOdhBaseUrl } from '../../utils';
import { idReadOnlyCell } from './id';

export const odhActiveTableCell = (): PropertyConfig => ({
  title: 'Open Data Hub state',
  component: CellComponent.StateCell,
  class: 'w-40',
  fields: { state: 'OdhActive' },
});

export const odhTagCell = (mainentity?: string): PropertyConfig => {
  const filterParam = mainentity == null ? '' : `?mainentity=${mainentity}`;
  const url = withOdhBaseUrl('/v1/ODHTag') + filterParam;

  return {
    title: 'Open Data Hub Tags',
    component: CellComponent.TagReferenceCell,
    listFields: {
      attributeName: 'items',
      pathToParent: 'SmgTags',
    },
    params: { url, keySelector: 'Id', labelSelector: 'TagName.{language}' },
  };
};

export const odhTagCategory = (mainentity?: string): DetailElements => {
  return {
    name: 'Tags',
    slug: 'Tags',
    subcategories: [
      {
        name: '',
        properties: [odhTagCell(mainentity)],
      },
    ],
  };
};

export const odhTypeDetailElement = (): DetailElements => ({
  name: 'Main data',
  slug: 'main-data',
  subcategories: [
    {
      name: '',
      properties: [
        idReadOnlyCell(),
        {
          title: 'Key',
          component: CellComponent.StringCell,
          fields: { text: 'Key' },
        },
        {
          title: 'Type',
          component: CellComponent.StringCell,
          fields: { text: 'Type' },
        },
        {
          title: 'TypeDesc',
          component: CellComponent.StringCell,
          fields: { text: 'TypeDesc.{language}' },
        },
        {
          title: 'Bitmask',
          component: CellComponent.StringCell,
          fields: { text: 'Bitmask' },
        },
        {
          title: 'Parent',
          component: CellComponent.StringCell,
          fields: { text: 'Parent' },
        },
      ],
    },
  ],
});
