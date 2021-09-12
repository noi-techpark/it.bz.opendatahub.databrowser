// This file contains base render configurations for known OpenAPI endpoints

import { GenericRendererElement } from './renderer.enum';
import {
  ListConfig,
  ResourceConfig,
} from '~/../web-components/databrowser-generic/src/renderer/config.model';

export type OpenApiPathRenderConfig = Record<
  string,
  ListConfig | ResourceConfig
>;

export type OpenApiRenderConfig = Record<string, OpenApiPathRenderConfig>;

export const openApiRenderConfig: OpenApiRenderConfig = {
  tourism: {
    '/v1/Accommodation': {
      columns: [
        {
          field: 'Id',
          rendererTagName: GenericRendererElement.STRING,
          title: 'ID',
        },
        {
          field: 'Shortname',
          rendererTagName: GenericRendererElement.STRING,
          title: 'Shortname',
        },
        {
          field: 'AccoType.Id',
          rendererTagName: GenericRendererElement.STRING,
          title: 'AccoType ID',
        },
        {
          field: 'ODHTags[1].Id',
          rendererTagName: GenericRendererElement.STRING,
          title: 'ODHTags[1] ID',
        },
        {
          field: 'ThemeIds',
          rendererTagName: GenericRendererElement.JSON,
          title: 'ThemeIds',
        },
      ],
    },
    '/v1/Accommodation/{id}': {
      props: [
        {
          field: 'Id',
          rendererTagName: 'databrowser-render-string',
          title: 'ID',
        },
        {
          field: 'Self',
          rendererTagName: 'databrowser-render-string',
          title: 'Self',
        },
      ],
    },
    '/v1/AccommodationTypes': {
      columns: [
        {
          field: 'Id',
          rendererTagName: GenericRendererElement.STRING,
          title: 'ID',
        },
        {
          field: 'Key',
          rendererTagName: GenericRendererElement.STRING,
          title: 'Key',
        },
        {
          field: 'Type',
          rendererTagName: GenericRendererElement.STRING,
          title: 'Type',
        },
        {
          field: 'Bitmask',
          rendererTagName: GenericRendererElement.STRING,
          title: 'Bitmask',
        },
        {
          field: 'TypeDesc',
          rendererTagName: GenericRendererElement.JSON,
          title: 'TypeDesc',
        },
      ],
    },
  },
};
