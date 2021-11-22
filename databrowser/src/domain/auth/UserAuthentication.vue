<template>
  <div v-if="authenticated === undefined">...</div>
  <div v-if="authenticated === true">
    User is authenticated <button @click="onLogout">Logout</button>
  </div>
  <div v-else-if="authenticated === false">
    <button @click="onLogin">Login</button>
    <button @click="onRegister">Register</button>
  </div>
</template>

<script lang="ts">
import Keycloak from 'keycloak-js';
import { ref, watchEffect } from 'vue';

const keycloak = Keycloak({
  url: 'https://auth.opendatahub.testingmachine.eu/auth',
  realm: 'noi',
  clientId: 'it.bz.opendatahub.databrowser',
});

export default {
  name: 'UserAuthentication',
  setup() {
    const authenticated = ref<boolean | undefined>(undefined);

    const verifyUserAuthentication = () => {
      keycloak
        .init({
          onLoad: 'check-sso',
          silentCheckSsoRedirectUri:
            'http://localhost:3000/silent-check-sso.html',
          pkceMethod: 'S256',
        })
        .then(function (isAuthenticated: boolean) {
          authenticated.value = isAuthenticated;
        })
        .catch(function () {
          console.log(
            'ERROR: Failed to initialize. Is your resource server running? See README for details.'
          );
        });
    };

    watchEffect(() => {
      verifyUserAuthentication();
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
      authenticated,
    };
  },
};
</script>

<style scoped></style>
