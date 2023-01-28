import { SelectOption, SelectValue } from './types';

export const emptyValueOption = (): SelectOption => ({
  label: '--- NO VALUE ---',
  value: undefined,
});

export const unknownValueLabel = (value?: SelectValue) =>
  `--- Unknown value (${value}) ---`;
