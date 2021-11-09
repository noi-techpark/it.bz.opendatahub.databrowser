import Vue from 'vue';
import { Store } from 'vuex';
import { Plugin } from '@nuxt/types';
import { Inject } from '@nuxt/types/app';

export interface ErrorHandler {
  addError: (error: Error, cancelAfterMillis?: number) => string;
  removeError: (id: string) => void;
  removeAllErrors: () => void;
  getError: (id: string) => Error | undefined;
  getAllErrors: () => Error[];
}

const generateErrorId = () => Math.floor(Math.random() * 1e9).toString();

const buildErrorHandler = (store: Store<any>): ErrorHandler => ({
  addError: (error: Error, cancelAfterMillis?: number): string => {
    const id = generateErrorId();
    store.dispatch('error/addError', { id, error, cancelAfterMillis });
    return id;
  },
  removeError: (id: string): void => {
    store.dispatch('error/removeError', { id });
  },
  removeAllErrors: (): void => {
    store.dispatch('error/removeAllErrors');
  },
  getError: (id: string) => store.getters['error/getError'](id),
  getAllErrors: () => store.getters['error/getAllErrors'],
});

const configureVueErrorHandler = (errorHandler: ErrorHandler): void => {
  Vue.config.errorHandler = (error: Error) => {
    errorHandler.addError(error);
  };
};

const configureWindowOnErrorHandler = (errorHandler: ErrorHandler): void => {
  if (window != null) {
    window.onerror = (
      message: Event | string,
      url?: string,
      lineNo?: number,
      columnNo?: number,
      error?: Error
    ) => {
      // eslint-disable-next-line no-console
      console.error(
        'Window onerror: unhandled error captured',
        message,
        url,
        lineNo,
        columnNo,
        error
      );
      if (error) {
        errorHandler.addError(error);
      }
    };
  }
};

const errorHandlerPlugin: Plugin = ({ store }, inject: Inject) => {
  const errorHandler = buildErrorHandler(store);

  configureVueErrorHandler(errorHandler);
  configureWindowOnErrorHandler(errorHandler);

  inject('errorHandler', errorHandler);
};

export default errorHandlerPlugin;
