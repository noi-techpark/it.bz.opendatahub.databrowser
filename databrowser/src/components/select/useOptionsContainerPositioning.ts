import { ModifierArguments, ModifierPhases, Placement } from '@popperjs/core';
import { Ref, ref } from 'vue';
import { usePopper } from '../utils/usePopper';

const defaultPlacement: Placement = 'bottom-start';

export const useOptionsContainerPositioning = (): [
  Ref<any>,
  Ref<any>,
  Ref<Placement>
] => {
  const placement = ref<Placement>(defaultPlacement);

  const popperConfig = usePopper({
    placement: defaultPlacement,
    strategy: 'fixed',
    modifiers: [
      { name: 'offset', options: { offset: [0, -1] } },
      {
        name: 'sameWidth',
        enabled: true,
        phase: 'beforeWrite' as ModifierPhases,
        requires: ['computeStyles'],
        fn({ state }: ModifierArguments<{}>) {
          state.styles.popper.width = `${state.rects.reference.width}px`;
        },
        effect({ state }: ModifierArguments<{}>) {
          state.elements.popper.style.width = `${
            (state.elements.reference as any).offsetWidth
          }px`;
        },
      },
      {
        name: 'emitPlacement',
        enabled: true,
        phase: 'beforeWrite' as ModifierPhases,
        fn({ state }: ModifierArguments<{}>) {
          placement.value = state.placement;
        },
      },
    ],
  });
  return [...popperConfig, placement];
};
