// This plugin initializes accessors in order to make nuxt specific facilitites
// available in all files.

import { Plugin } from '@nuxt/types';
import { NuxtLoading } from '@nuxt/types/app';
import { NuxtAxiosInstance } from '@nuxtjs/axios';
import { setAxios, setNuxtLoading } from '~/utils/nuxt-accessors';

/**
 * Initialize access to nuxt axios.
 */
const initAxiosAccessor = ($axios: NuxtAxiosInstance) => {
  setAxios($axios);
};

/**
 * Initialize access to nuxt progress bar.
 */
const initProgressBarAccessor = () => {
  // First step: initialize a noop loading interface for when $nuxt is not yet ready
  // or if there is no window at all (e.g. server side render). The noopLoading
  // was definition taken from nuxt axios plugin (see https://github.com/nuxt-community/axios-module/blob/v5.13.1/lib/plugin.js#L127)
  const noopLoading = {
    finish: () => {},
    start: () => {},
    fail: () => {},
    set: () => {},
  };
  setNuxtLoading(noopLoading as unknown as NuxtLoading);

  // Second step: given that a window and a onNuxtReady function on it exists,
  // register a callback for when nuxt is ready. The reason for this is, that
  // during plugin execution, the window.$nuxt property is not available yet.
  const readyFn = (window as any)?.onNuxtReady;
  if (readyFn != null) {
    // Run the initializer for progress bar when nuxt is ready
    readyFn(() => {
      const loading = window?.$nuxt?.$loading;
      if (loading != null) {
        setNuxtLoading(loading);
      }
    });
  }
};

const accessor: Plugin = ({ $axios }) => {
  initAxiosAccessor($axios);
  initProgressBarAccessor();
};

export default accessor;
