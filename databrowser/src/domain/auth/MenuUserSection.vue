<template>
  <div v-if="auth.isAuthenticated" class="flex items-center space-x-4">
    <MenuCustom>
      <MenuCustomButton class="rounded" data-test="user-profile-button">
        <ProfileButton :username="auth.user?.name" />
      </MenuCustomButton>
      <MenuCustomItems>
        <MenuCustomItem
          type="link"
          :href="profileUrl"
          data-test="user-profile-link"
        >
          {{ t('auth.profile') }}
        </MenuCustomItem>
        <MenuCustomItem
          type="button"
          data-test="user-profile-logout"
          @click="onLogout"
        >
          {{ t('auth.logout') }}
        </MenuCustomItem>
      </MenuCustomItems>
    </MenuCustom>
  </div>
  <div v-else class="flex items-center space-x-4">
    <HeaderButton @click="onLogin">{{ t('auth.login') }}</HeaderButton>
    <HeaderButton @click="onRegister">{{ t('auth.register') }}</HeaderButton>
  </div>
</template>

<script setup lang="ts">
import { keycloak } from './keycloak';
import HeaderButton from '../../components/header/HeaderButton.vue';
import { useAuth } from './store/auth';
import ProfileButton from './ProfileButton.vue';
import MenuCustom from '../../components/menu/MenuCustom.vue';
import MenuCustomButton from '../../components/menu/MenuCustomButton.vue';
import MenuCustomItem from '../../components/menu/MenuCustomItem.vue';
import MenuCustomItems from '../../components/menu/MenuCustomItems.vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

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
