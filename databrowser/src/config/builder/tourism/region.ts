import { CellComponent } from '../../../domain/cellComponents/types';
import { PropertyConfig } from '../../../domain/datasetConfig/types';

export const regionIdCell = (text: string): PropertyConfig => ({
  title: 'Region ID',
  component: CellComponent.StringCell,
  fields: { text },
});
