<template>
  <div class="bg-blue-100">
    <user-authentication />
    <router-view></router-view>
  </div>
</template>
<script>
import UserAuthentication from '../domain/auth/UserAuthentication.vue';
export default {
  components: { UserAuthentication },
};
</script>
