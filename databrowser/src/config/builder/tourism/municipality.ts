import { CellComponent } from '../../../domain/cellComponents/types';
import { PropertyConfig } from '../../../domain/datasetConfig/types';

export const municipalityIdCell = (text: string): PropertyConfig => ({
  title: 'Municipality ID',
  component: CellComponent.StringCell,
  fields: { text },
});
