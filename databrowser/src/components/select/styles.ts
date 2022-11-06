import { SelectOptionsPlacement, SelectSize } from './types';

export const selectButtonSizeStyles: Record<SelectSize, string> = {
  [SelectSize.sm]: 'h-6',
  [SelectSize.md]: 'h-10',
};

export const selectOptionsSizeStyles: Record<
  SelectSize,
  Record<SelectOptionsPlacement, string>
> = {
  [SelectSize.sm]: {
    bottom: 'border-t-0 rounded-b',
    top: 'border-b-0 rounded-t bottom-6',
  },
  [SelectSize.md]: {
    bottom: 'border-t-0 rounded-b',
    top: 'border-b-0 rounded-t bottom-10',
  },
};
