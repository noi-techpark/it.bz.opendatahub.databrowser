// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { acceptHMRUpdate, defineStore } from 'pinia';
import { OpenApi, KnownDomainsWithOpenApiDocument } from '../types';
import { initialState } from './initialState';
import { knownDomainsWithOpenApiDocument } from '../domain';

const dynamicSwaggerClientImport = async () =>
  await import('swagger-client').then((exports) => exports.default);

// Internal store for loaded OpenAPI documents. The documents are not stored in the
// state because they won't change and because they may be several KB in size.
const documents: Record<
  KnownDomainsWithOpenApiDocument,
  OpenApi.Document | null
> = {
  tourism: null,
  mobility: null,
};

// Get OpenAPI document for given domain
export const getOpenApiDocument = (domain: KnownDomainsWithOpenApiDocument) =>
  documents[domain];

// OpenAPI store
export const useOpenApi = defineStore('openApi', {
  state: () => initialState,
  actions: {
    async loadDocument(
      domain: KnownDomainsWithOpenApiDocument
    ): Promise<OpenApi.Document | null> {
      const documentState = this[domain];
      // If OpenAPI document is already loaded, do nothing
      if (documentState.loaded) {
        return Promise.resolve(documents[domain]);
      }

      // OpenAPI documents should be loaded only once.
      // If they are loading right now, return a promise that
      // resolves as soon as loading is complete
      if (documentState.loading) {
        return new Promise((resolve) => {
          const unsubscribe = this.$onAction(({ name, args }) => {
            if (name === 'finishDocumentLoad' && args[0] === domain) {
              unsubscribe();
              resolve(documents[domain]);
            }
          });
        });
      }

      documentState.loading = true;

      const url = knownDomainsWithOpenApiDocument[domain].documentUrl;

      try {
        const SwaggerClient = await dynamicSwaggerClientImport();
        const response = (await SwaggerClient(url)) as {
          spec: OpenApi.Document;
        };
        documents[domain] = response.spec;
      } catch (err) {
        if (typeof err === 'string') {
          documentState.error = new Error(err);
        } else if (err instanceof Error) {
          documentState.error = err;
        } else {
          documentState.error = new Error('No error information available');
        }
      }

      this.finishDocumentLoad(domain);

      return documents[domain];
    },
    finishDocumentLoad(domain: KnownDomainsWithOpenApiDocument) {
      const documentState = this[domain];
      documentState.loading = false;
      documentState.loaded = true;
    },
  },
});

// Add support for hot-module-reload
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useOpenApi, import.meta.hot));
}
