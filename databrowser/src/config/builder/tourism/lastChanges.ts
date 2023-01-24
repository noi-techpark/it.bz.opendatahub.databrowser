import { CellComponent } from '../../../domain/cellComponents/types';
import { PropertyConfig } from '../../../domain/datasetConfig/types';
import { DEFAULT_DATE_FORMAT } from '../../utils';

interface LastChangesCellOptions {
  class?: string;
}

export const lastChangesCell = (options?: {
  class?: string;
}): PropertyConfig => {
  const params: LastChangesCellOptions = {};
  if (options?.class != null) {
    params.class = options.class;
  }
  return {
    title: 'Last Changes',
    component: CellComponent.EditedDateCell,
    fields: { date: 'LastChange' },
    params: params as Record<string, string>,
  };
};

export const lastChangesTableCell = (): PropertyConfig => ({
  title: 'Edited',
  component: CellComponent.EditedDateCell,
  class: 'w-48',
  fields: { date: 'LastChange' },
  params: { format: DEFAULT_DATE_FORMAT },
});
