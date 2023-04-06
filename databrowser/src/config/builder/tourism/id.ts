import { CellComponent } from '../../../domain/cellComponents/types';
import { PropertyConfig } from '../../../domain/datasetConfig/types';

export const idCell = (): PropertyConfig => ({
  title: 'ID',
  component: CellComponent.StringCell,
  fields: { text: 'Id' },
});

export const idReadOnlyCell = (): PropertyConfig => ({
  ...idCell(),
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
