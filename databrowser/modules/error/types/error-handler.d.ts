import { ErrorHandler } from '~/modules/error/plugins/error-handler';

declare module 'vue/types/vue' {
  interface Vue {
    $errorHandler: ErrorHandler;
  }
}
