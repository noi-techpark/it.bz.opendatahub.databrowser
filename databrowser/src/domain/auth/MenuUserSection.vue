<template>
  <div v-if="auth.isAuthenticated" class="flex items-center space-x-4">
    <HeaderLink :to="profileUrl">
      <IconProfile
        class="inline-block mr-2 w-4 align-text-top stroke-current"
      />
      {{ auth.user?.name }}
    </HeaderLink>
    <HeaderButton @click="onLogout">{{ $t('auth.logout') }}</HeaderButton>
  </div>
  <div v-else class="flex items-center space-x-4">
    <HeaderButton @click="onLogin">{{ $t('auth.login') }}</HeaderButton>
    <HeaderButton @click="onRegister">{{ $t('auth.register') }}</HeaderButton>
  </div>
</template>

<script setup lang="ts">
import { keycloak } from './keycloak';
import IconProfile from '../../components/svg/IconProfile.vue';
import HeaderButton from '../../components/header/HeaderButton.vue';
import HeaderLink from '../../components/header/HeaderLink.vue';
import { useAuth } from './store/auth';

const auth = useAuth();

keycloak.onAuthSuccess = () => {
  auth.authenticate(keycloak.token);
};

keycloak.onAuthError = () => {
  auth.unauthenticate();
};

keycloak.onAuthRefreshSuccess = () => {
  auth.authenticate(keycloak.token);
};

keycloak.onAuthRefreshError = () => {
  auth.unauthenticate();
};

keycloak.onReady = () => {
  auth.ready = true;
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
</script>
