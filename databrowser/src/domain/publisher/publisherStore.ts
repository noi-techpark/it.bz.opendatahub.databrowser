// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { acceptHMRUpdate, defineStore } from 'pinia';
import { usePublisher } from './usePublisher';
import { ref, watch } from 'vue';
import { useDatasetQueryStore } from '../datasets/location/store/datasetQueryStore';
import { defaultLanguage } from '../datasets/language';
import { withOdhBaseUrl } from '../../config/utils';

interface PublisherBuilder {
  id: string;
  name: string;
  buildUrl: (id?: string, type?: string) => string;
}

export const usePublisherStore = defineStore('publisherStore', () => {
  const publisherData = usePublisher();

  const currentLanguage = useDatasetQueryStore().handle('language');

  const publishers = ref<PublisherBuilder[]>([]);

  watch([publisherData.data, currentLanguage], () => {
    if (publisherData.data.value == null) {
      return [];
    }

    const language = currentLanguage.value ?? defaultLanguage;

    publishers.value = publisherData.data.value.map((publisher) => {
      const id = publisher.id;

      const name =
        publisher.name[language] ??
        publisher.name[defaultLanguage] ??
        'Unnamed';

      const buildUrl = (id?: string, type?: string) =>
        withOdhBaseUrl(`/v1/PushData/${id}/${type}/${publisher.key}`);

      return { id, name, buildUrl };
    });
  });

  return { publishers };
});

// Add support for hot-module-reload
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(usePublisherStore, import.meta.hot));
}
