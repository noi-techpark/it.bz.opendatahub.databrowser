// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { Map } from 'maplibre-gl';
import { MapGLOptions } from './types';
import { getDefaultCoordinates } from './utils';

export const initMap = (options?: MapGLOptions) => {
  const center = options?.center || getDefaultCoordinates();
  const zoom = options?.zoom || 6;
  const minZoom = options?.minZoom || 3;
  const maxZoom = options?.maxZoom || 18;
  return new Map({
    container: 'map',
    style: {
      version: 8,
      sources: {
        'raster-tiles': {
          type: 'raster',
          tiles: ['https://basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png'],
          tileSize: 256,
        },
      },
      layers: [
        {
          id: 'simple-tiles',
          type: 'raster',
          source: 'raster-tiles',
        },
      ],
      // Taken from https://github.com/unvt/nsft/tree/main
      glyphs: '/fonts/{fontstack}.{range}.pbf?{fontstack}={range}.pbf',
    },
    center,
    zoom,
    minZoom,
    maxZoom,
    // Attribution control is handled dynamically
    attributionControl: false,
  });
};
