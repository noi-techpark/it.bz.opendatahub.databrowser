/* eslint-disable import/no-mutable-exports */

// This utility provides nuxt specific accessors to arbitrary files, e.g. utility functions.
// In order for the variables to be set, their respective set... functions must be
// invoked. This is done by a plugin, see ~/plugins/init-nuxt-accessors.ts

import { NuxtLoading } from '@nuxt/types/app';
import { NuxtAxiosInstance } from '@nuxtjs/axios';

// Nuxt progress bar (see https://nuxtjs.org/docs/features/loading)
let $loading: NuxtLoading;
// Nuxt axios integration (see https://axios.nuxtjs.org/)
let $axios: NuxtAxiosInstance;

export function setNuxtLoading(loadingInstance: NuxtLoading) {
  $loading = loadingInstance;
}

export function setAxios(axiosInstance: NuxtAxiosInstance) {
  $axios = axiosInstance;
}

export { $axios, $loading };
