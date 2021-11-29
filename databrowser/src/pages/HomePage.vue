<template>
  <AppHeader>Home Page</AppHeader>
  <ul>
    <li><router-link to="/">Go to Home</router-link></li>
    <li><router-link to="/about">Go to About</router-link></li>
    <li>
      <router-link to="/axios-example">Go to Axios Example</router-link>
    </li>
    <li><router-link to="/error">Go to Error</router-link></li>
  </ul>
  <ul>
    <li>
      <router-link to="/dataset/odh-activity-poi"
        >ODH ActivityPOI List</router-link
      >
    </li>
    <li>
      <router-link to="/dataset/odh-activity-poi/smgpoi107"
        >ODH ActivityPOI Detail (ID = smgpoi107)</router-link
      >
    </li>
    <li>
      <router-link to="/dataset/odh-activity-poi-types"
        >ODH ActivityPOITypes List</router-link
      >
    </li>
    <li class="py-4">
      <router-link to="/dataset/xyz" class="bg-red-100"
        >Not existing list route</router-link
      >
    </li>
  </ul>
</template>
<script>
import AppHeader from '../components/header/AppHeader.vue';
export default {
  components: { AppHeader },
};
</script>
