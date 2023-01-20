import { CellComponent } from '../../domain/cellComponents/types';
import { withOdhBaseUrl } from '../utils';

export const EVENT_DOCUMENT_SINGLE_VIEW_CONFIG = {
  title: 'PDFs',
  component: CellComponent.EventDocumentCell,
  listFields: {
    attributeName: 'files',
    pathToParent: 'EventDocument',
    fields: {
      src: 'DocumentURL',
      language: 'Language',
    },
  },
} as const;

export const ODH_TAG_SINGLE_VIEW_CONFIG = {
  title: 'Open Data Hub Tags',
  component: CellComponent.OdhTagCell,
  listFields: {
    attributeName: 'odhTags',
    pathToParent: 'SmgTags',
  },
  params: { url: withOdhBaseUrl('/v1/ODHTag') },
} as const;

export const odhTagConfigWithMainEntity = (mainentity: string) => ({
  ...ODH_TAG_SINGLE_VIEW_CONFIG,
  params: {
    url: `${ODH_TAG_SINGLE_VIEW_CONFIG.params.url}?mainentity=${mainentity}`,
  },
});
