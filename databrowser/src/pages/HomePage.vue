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
  <ContentArea>
    <ul class="grid lg:grid-cols-2 gap-x-5 gap-y-5">
      <li>
        <CardContainer>
          <CardTitle>Dataset 1</CardTitle>
          <CardText
            >Lorem ipsum dolr sit amen dol rist maen dol ist amen dorl sit amen
            dorlosit sit amen dorl sit amen dol dori sti ist.n dorlosit sit amen
            dorl sit amen dol dori sti ist.</CardText
          >
          <CardActions>
            <ButtonLink to="/">Discover Dataset</ButtonLink>
          </CardActions>
        </CardContainer>
      </li>
      <li>
        <CardContainer>
          <CardTitle>Dataset 2</CardTitle>
          <CardText
            >Lorem ipsum dolr sit amen dol rist maen dol ist amen dorl sit amen
            dorlosit sit amen dorl sit amen dol dori sti ist.n dorlosit sit amen
            dorl sit amen dol dori sti ist.</CardText
          >
          <CardActions>
            <ButtonLink to="/about" variant="ghost">About</ButtonLink>
          </CardActions>
        </CardContainer>
      </li>
      <li><router-link to="/error">Go to Error</router-link></li>
    </ul>

    <ul class="grid lg:grid-cols-2 gap-x-5">
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
  </ContentArea>
</template>
<script>
import Header from '../components/header/HeaderContainer.vue';
import HeaderTitle from '../components/header/HeaderTitle.vue';
import HeaderSubTitle from '../components/header/HeaderSubTitle.vue';
import HeaderCaption from '../components/header/HeaderCaption.vue';
import ButtonLink from '../components/button/ButtonLink.vue';
import CardContainer from '../components/card/CardContainer.vue';
import ContentArea from '../components/content/ContentArea.vue';
import CardTitle from '../components/card/CardTitle.vue';
import CardText from '../components/card/CardText.vue';
import CardActions from '../components/card/CardActions.vue';
export default {
  components: {
    CardActions,
    CardText,
    CardTitle,
    ContentArea,
    CardContainer,
    ButtonLink,
    HeaderCaption,
    HeaderSubTitle,
    HeaderTitle,
    Header,
  },
};
</script>
