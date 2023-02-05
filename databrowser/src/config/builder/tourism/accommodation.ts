import { CellComponent } from '../../../domain/cellComponents/types';
import { PropertyConfig } from '../../../domain/datasetConfig/types';
import { withOdhBaseUrl } from '../../utils';

export const accommodationCategoryCell = (): PropertyConfig => ({
  title: 'Accommodation category',
  component: CellComponent.InputReferenceCell,
  fields: { value: 'AccoCategory.Id' },
  params: {
    url: withOdhBaseUrl('/v1/AccommodationTypes'),
    labelSelector: 'TypeDesc.{language}',
    keySelector: 'Key',
  },
  required: true,
});

export const accommodationTypeCell = (): PropertyConfig => ({
  title: 'Accommodation type',
  component: CellComponent.InputReferenceCell,
  fields: { value: 'AccoType.Id' },
  params: {
    url: withOdhBaseUrl('/v1/AccommodationTypes'),
    labelSelector: 'TypeDesc.{language}',
    keySelector: 'Key',
  },
  required: true,
});
