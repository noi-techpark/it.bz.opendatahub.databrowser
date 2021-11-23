<template>
  <div v-if="isAuthenticated === true">
    {{ user?.email }}<button @click="onLogout">Logout</button>
  </div>
  <div v-else>
    <button @click="onLogin">Login</button>
    <button @click="onRegister">Register</button>
  </div>
</template>

<script lang="ts">
import Keycloak from 'keycloak-js';
import { computed, watchEffect } from 'vue';
import { useStore } from 'vuex';

export default {
  name: 'UserAuthentication',
  setup() {
    const keycloak = Keycloak({
      url: import.meta.env.VITE_APP_KEYCLOAK_URL,
      realm: import.meta.env.VITE_APP_KEYCLOAK_REALM,
      clientId: import.meta.env.VITE_APP_KEYCLOAK_CLIENT_ID,
    });

    const store = useStore();

    const user = computed(() => store.getters['auth/user']);
    const isAuthenticated = computed(() => store.state.auth.isAuthenticated);
    const accessToken = computed(() => store.state.auth.accessToken);

    const initKeycloakAdapter = () => {
      keycloak
        .init({
          onLoad: 'check-sso',
          // eslint-disable-next-line no-undef
          silentCheckSsoRedirectUri: import.meta.env
            .VITE_APP_KEYCLOAK_REDIRECT_URI,
          pkceMethod: 'S256',
        })
        .then(function (authenticated) {
          if (authenticated) {
            store.commit('auth/authenticated', keycloak.token);
          } else {
            store.commit('auth/unauthenticated');
          }
        });
    };

    watchEffect(() => {
      initKeycloakAdapter();
    });

    function onLogin() {
      keycloak.login();
    }

    function onRegister() {
      keycloak.register();
    }

    function onLogout() {
      keycloak.logout();
    }

    return {
      onLogin,
      onRegister,
      onLogout,
      user,
      accessToken,
      isAuthenticated,
    };
  },
};
</script>

<style scoped></style>
