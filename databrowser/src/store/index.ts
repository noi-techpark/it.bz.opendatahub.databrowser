import { createStore, createLogger } from 'vuex';
import auth from '../domain/auth/store/auth';

export default createStore({
  modules: {
    auth,
  },
  strict: true,
  plugins: [createLogger()],
});
