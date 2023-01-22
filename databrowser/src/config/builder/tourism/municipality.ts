import { CellComponent } from '../../../domain/cellComponents/types';
import { PropertyConfig } from '../../../domain/datasetConfig/types';
import { withOdhBaseUrl } from '../../utils';

export const municipalityIdCell = (text: string): PropertyConfig => ({
  title: 'Municipality',
  component: CellComponent.InputReferenceCell,
  fields: { value: text },
  params: {
    url: withOdhBaseUrl('/v1/Municipality?removenullvalues=false'),
    labelSelector: 'Detail.en.Title',
    keySelector: 'Id',
  },
  required: true,
});
