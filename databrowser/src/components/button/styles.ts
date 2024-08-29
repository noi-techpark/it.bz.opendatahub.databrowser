// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { Size, Tone, Variant } from './types';

export const variantClass: Record<Variant, Record<Tone, String>> = {
  [Variant.solid]: {
    [Tone.primary]:
      'border border-transparent bg-green-500 text-white hover:bg-green-700 focus-visible:bg-green-700 focus-visible:outline-none',
    [Tone.danger]:
      'border border-transparent bg-red-500 text-white hover:bg-red-700 focus-visible:bg-red-700 focus-visible:outline-none',
  },
  [Variant.ghost]: {
    [Tone.primary]:
      'border text-green-500 hover:bg-green-500/10 hover:border-green-500 focus-visible:bg-green-500/10 focus-visible:text-green-500 focus-visible:border-green-500 focus-visible:outline-none',
    [Tone.danger]:
      'border text-red-500 hover:bg-red-500/10 hover:border-red-500 focus-visible:bg-red-500/10 focus-visible:text-red-500 focus-visible:border-red-500 focus-visible:outline-none',
  },
  [Variant.transparent]: {
    [Tone.primary]:
      'focus-visible:bg-green-500/10 focus-visible:text-green-500 focus-visible:border-green-500 focus-visible:outline-none',
    [Tone.danger]:
      'focus-visible:bg-red-500/10 focus-visible:text-red-500 focus-visible:border-red-500 focus-visible:outline-none',
  },
};

export const sizeClass: Record<Size, String> = {
  [Size.xs]: 'rounded leading-tight',
  [Size.xm2col]:
    'gap-3 justify-center pt-1.5 pb-1.5 pr-6 pl-2.5 w-full md:w-fit rounded leading-tight',
  [Size.sm]: 'pt-1.5 pb-1.5 px-6 rounded leading-tight',
  [Size.md]: 'pt-2.5 pb-3 px-9 rounded leading-tight',
  [Size.md2col]:
    'gap-3 justify-center pt-2.5 pb-3 pr-6 pl-2.5 w-full md:w-fit rounded leading-tight',
};

export const disabledClass: Record<Variant, Record<Tone, String>> = {
  [Variant.solid]: {
    [Tone.primary]:
      'border border-transparent bg-green-500 text-white opacity-25',
    [Tone.danger]: 'border border-transparent bg-red-500 text-white opacity-25',
  },
  [Variant.ghost]: {
    [Tone.primary]:
      'border border-green-500 bg-transparent text-green-500 opacity-25',
    [Tone.danger]:
      'border border-red-500 bg-transparent text-red-500 opacity-25',
  },
  [Variant.transparent]: {
    [Tone.primary]: 'bg-transparent text-grey-500 opacity-25',
    [Tone.danger]: 'bg-transparent text-red-500 opacity-25',
  },
};

export const computeButtonClasses = ({
  variant = Variant.solid,
  size = Size.md,
  tone = Tone.primary,
  disabled = false,
}: {
  variant?: Variant;
  size?: Size;
  tone?: Tone;
  disabled?: boolean;
}) =>
  'inline-block ' +
  (disabled ? disabledClass[variant][tone] : variantClass[variant][tone]) +
  ' ' +
  sizeClass[size];
