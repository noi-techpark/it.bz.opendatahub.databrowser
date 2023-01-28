export type SelectValue = string | number | boolean;

export enum SelectSize {
  sm = 'sm',
  md = 'md',
}

export interface SelectOption {
  label: string;
  value: string | undefined;
  disabled?: boolean;
}

export type SelectOptionsPlacement = 'bottom' | 'top';
