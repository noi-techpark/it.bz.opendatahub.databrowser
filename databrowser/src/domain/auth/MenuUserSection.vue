<template>
  <div v-if="isAuthenticated === true" class="flex items-center space-x-4">
    <HeaderLink :to="profileUrl">
      <IconProfile
        class="inline-block mr-2 w-4 align-text-top stroke-current"
      />
      {{ user?.name }}
    </HeaderLink>
    <HeaderButton @click="onLogout">{{ $t('auth.logout') }}</HeaderButton>
  </div>
  <div v-else class="flex items-center space-x-4">
    <HeaderButton @click="onLogin">{{ $t('auth.login') }}</HeaderButton>
    <HeaderButton @click="onRegister">{{ $t('auth.register') }}</HeaderButton>
  </div>
</template>

<script lang="ts">
import { computed } from 'vue';
import { useStore } from 'vuex';
import { keycloak } from './keycloak';
import { defineComponent } from '@vue/runtime-core';
import IconProfile from '../../components/svg/IconProfile.vue';
import HeaderButton from '../../components/header/HeaderButton.vue';
import HeaderLink from '../../components/header/HeaderLink.vue';

export default defineComponent({
  components: { HeaderLink, HeaderButton, IconProfile },
  setup() {
    const store = useStore();

    const user = computed(() => store.getters['auth/user']);
    const isAuthenticated = computed(() => store.state.auth.isAuthenticated);
    const accessToken = computed(() => store.state.auth.accessToken);

    keycloak.onAuthSuccess = () => {
      store.dispatch('auth/authenticate', keycloak.token);
    };

    keycloak.onAuthError = () => {
      store.dispatch('auth/unauthenticate');
    };

    keycloak.onAuthRefreshSuccess = () => {
      store.dispatch('auth/authenticate', keycloak.token);
    };

    keycloak.onAuthRefreshError = () => {
      store.dispatch('auth/unauthenticate');
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

    const profileUrl = keycloak.createAccountUrl();

    return {
      onLogin,
      onRegister,
      onLogout,
      user,
      profileUrl,
      accessToken,
      isAuthenticated,
    };
  },
});
</script>

<style scoped></style>
