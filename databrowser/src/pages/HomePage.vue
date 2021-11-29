<template>
  <Header>
    <HeaderTitle>Home Page</HeaderTitle>
    <HeaderSubTitle
      >Lorem ipsum dolor sit amen dolr sit amen dolr ist aem dolris tmane dolr
      ist amen.
    </HeaderSubTitle>
    <HeaderCaption>
      Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo
      ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis
      dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies
      nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim.
      Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In
      enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum
      felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus
      elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo
      ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem
      ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla
      ut metus varius laoreet.
    </HeaderCaption>
  </Header>
  <ul>
    <li><ButtonLink to="/">Go to Home</ButtonLink></li>
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
import Header from '../components/header/HeaderContainer.vue';
import HeaderTitle from '../components/header/HeaderTitle.vue';
import HeaderSubTitle from '../components/header/HeaderSubTitle.vue';
import HeaderCaption from '../components/header/HeaderCaption.vue';
import ButtonLink from '../components/button/ButtonLink.vue';
export default {
  components: {
    ButtonLink,
    HeaderCaption,
    HeaderSubTitle,
    HeaderTitle,
    Header,
  },
};
</script>
