import { CellComponent } from '../../../domain/cellComponents/types';
import { PropertyConfig } from '../../../domain/datasetConfig/types';

export const languageTableCell = (): PropertyConfig => ({
  title: 'Languages',
  component: CellComponent.ArrayCell,
  class: 'w-40',
  fields: { items: 'HasLanguage' },
  params: { separator: ', ' },
});
