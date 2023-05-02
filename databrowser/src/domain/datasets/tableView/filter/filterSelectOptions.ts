import { SelectOption } from '../../../../components/select/types';

export const filterSelectOptions: SelectOption[] = [
  {
    label: 'equal to',
    value: 'eq',
  },
  {
    label: 'not equal to',
    value: 'ne',
  },
  {
    label: 'greater than',
    value: 'gt',
  },
  {
    label: 'greater or equal',
    value: 'ge',
  },
  {
    label: 'less than',
    value: 'lt',
  },
  {
    label: 'less or equal',
    value: 'le',
  },
  {
    label: 'is null',
    value: 'isnull',
  },
  {
    label: 'is not null',
    value: 'isnotnull',
  },
  {
    label: 'includes',
    value: 'in',
  },
  {
    label: 'not includes',
    value: 'nin',
  },
];
