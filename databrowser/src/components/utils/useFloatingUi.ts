// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { arrow, Middleware, size } from '@floating-ui/core';
import {
  autoUpdate,
  computePosition,
  flip,
  offset,
  Placement,
  shift,
} from '@floating-ui/dom';
import { ref, onMounted, watchEffect, Ref } from 'vue';

export interface UseFloatingUi {
  placement: Placement;
  matchReferenceWidth?: boolean;
  offset?: number;
  arrow?: Ref<any>;
}

export const useFloatingUi = (
  options: UseFloatingUi
): [Ref<any>, Ref<any>, Ref<Placement>] => {
  const reference = ref<any>(null);
  const tooltip = ref<any>(null);
  const placement = ref<Placement>(options.placement);

  onMounted(() =>
    watchEffect((onInvalidate) => {
      if (!tooltip.value) {
        return;
      }
      if (!reference.value) {
        return;
      }

      const tooltipEl = tooltip.value.el || tooltip.value;
      const referenceEl = reference.value.el || reference.value;
      const arrowEl = options.arrow?.value?.el || options.arrow?.value;

      if (!(referenceEl instanceof HTMLElement)) {
        return;
      }
      if (!(tooltipEl instanceof HTMLElement)) {
        return;
      }

      const middleware = buildMiddleware({ ...options, tooltipEl, arrowEl });

      const cleanup = autoUpdate(referenceEl, tooltipEl, () => {
        computePosition(referenceEl, tooltipEl, {
          placement: 'bottom-start',
          middleware,
        }).then(({ x, y, placement: currentPlacement, middlewareData }) => {
          // Position tooltip
          Object.assign(tooltipEl.style, {
            left: `${x}px`,
            top: `${y}px`,
          });

          // Update placement value
          placement.value = currentPlacement;

          // If arrow element is provided, handle its positioning
          if (middlewareData.arrow != null) {
            const { x: arrowX, y: arrowY } = middlewareData.arrow;
            const splittedPlacement = currentPlacement.split('-')[0];

            const staticSide = {
              top: 'bottom',
              right: 'left',
              bottom: 'top',
              left: 'right',
            }[splittedPlacement]!;

            Object.assign(arrowEl.style, {
              left: arrowX != null ? `${arrowX}px` : '',
              top: arrowY != null ? `${arrowY}px` : '',
              right: '',
              bottom: '',
              [staticSide]: '-8px',
            });
          }
        });
      });
      onInvalidate(cleanup);
    })
  );

  return [reference, tooltip, placement];
};

const buildMiddleware = (
  options: UseFloatingUi & { tooltipEl: HTMLElement; arrowEl: HTMLElement }
): Middleware[] => {
  const middleware: Middleware[] = [];

  // Add offset middleware if settings exist
  if (options.offset != null) {
    middleware.push(offset(options.offset));
  }

  // Add default middlewares
  middleware.push(flip(), shift({ padding: 5 }));

  // Add arrow middleware if settings exist
  if (options.arrowEl instanceof HTMLElement) {
    middleware.push(arrow({ element: options.arrowEl }));
  }

  // Add tooltip size middleware if settings exist
  if (options.matchReferenceWidth === true) {
    middleware.push(
      size({
        apply({ rects }) {
          Object.assign(options.tooltipEl.style, {
            width: `${rects.reference.width}px`,
          });
        },
      })
    );
  }

  return middleware;
};
