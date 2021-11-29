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
import { computed } from 'vue';
import { useStore } from 'vuex';
import { keycloak } from './keycloak';
import { defineComponent } from '@vue/runtime-core';

export default defineComponent({
  setup() {
    const store = useStore();

    const user = computed(() => store.getters['auth/user']);
    const isAuthenticated = computed(() => store.state.auth.isAuthenticated);
    const accessToken = computed(() => store.state.auth.accessToken);

    keycloak.onAuthSuccess = () => {
      store.commit('auth/authenticated', keycloak.token);
    };

    keycloak.onAuthError = () => {
      store.commit('auth/unauthenticated');
    };

    keycloak.onAuthRefreshSuccess = () => {
      store.commit('auth/authenticated', keycloak.token);
    };

    keycloak.onAuthRefreshError = () => {
      store.commit('auth/unauthenticated');
    };

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
});
</script>

<style scoped></style>
