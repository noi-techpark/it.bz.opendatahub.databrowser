import { App, AppConfig } from 'vue';

import TestRenderer from '../components/testRenderer/TestRenderer.vue';

export default {
  install: (app: App, options: AppConfig) => {
    app.component('TestRenderer', TestRenderer);
  },
};
