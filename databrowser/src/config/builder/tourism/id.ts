import { CellComponent } from '../../../domain/cellComponents/types';
import { PropertyConfig } from '../../../domain/datasetConfig/types';

export const idReadOnlyCell = (): PropertyConfig => ({
  title: 'ID',
  component: CellComponent.StringCell,
  fields: { text: 'Id' },
  params: { readonly: 'true' },
});

export const customIdCell = (): PropertyConfig => ({
  title: 'Custom Id',
  component: CellComponent.StringCell,
  fields: { text: 'CustomId' },
});

export const idAndCustomIdCells = (): PropertyConfig[] => [
  idReadOnlyCell(),
  customIdCell(),
];
