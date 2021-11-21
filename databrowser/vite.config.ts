import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    // TODO: Check if the setting below is necessary, it seems to work also without it,
    // no warnings are shown in developer console
    // See https://v3.vuejs.org/guide/web-components.html#using-custom-elements-in-vue
    // vue({
    //   template: {
    //     compilerOptions: {
    //       // treat all tags with a dash as custom elements
    //       isCustomElement: (tag) => tag.includes('databrowser-'),
    //     },
    //   },
    // }),
  ],
});
