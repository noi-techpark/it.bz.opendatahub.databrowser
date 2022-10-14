import { ModifierArguments, ModifierPhases } from '@popperjs/core';
import { usePopper } from '../utils/usePopper';

export const useOptionsContainerPositioning = () =>
  usePopper({
    placement: 'auto-start',
    strategy: 'fixed',
    modifiers: [
      { name: 'offset', options: { offset: [0, -1] } },
      {
        name: 'sameWidth',
        enabled: true,
        phase: 'beforeWrite' as ModifierPhases,
        requires: ['computeStyles'],
        fn({ state }: ModifierArguments<{}>) {
          state.styles.popper.minWidth = `${state.rects.reference.width}px`;
        },
        effect({ state }: ModifierArguments<{}>) {
          state.elements.popper.style.minWidth = `${
            (state.elements.reference as any).offsetWidth
          }px`;
        },
      },
    ],
  });
