<template>
  <div>
    <h1>auth test</h1>
    <div>Logged in: {{ $auth.loggedIn }}</div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({ middleware: 'auth' });
</script>
