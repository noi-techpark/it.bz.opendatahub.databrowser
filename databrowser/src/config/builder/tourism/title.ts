import { CellComponent } from '../../../domain/cellComponents/types';
import { PropertyConfig } from '../../../domain/datasetConfig/types';

export const titleTableCell = (): PropertyConfig => ({
  title: 'Title',
  component: CellComponent.StringCell,
  class: 'w-60',
  fields: { text: 'Detail.{language}.Title' },
});
