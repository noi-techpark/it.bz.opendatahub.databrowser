<template>
  <AppLayout>
    <Hero>
      <HeroTitle>Home Page</HeroTitle>
      <HeroSubTitle
        >Lorem ipsum dolor sit amen dolr sit amen dolr ist aem dolris tmane dolr
        ist amen.
      </HeroSubTitle>
      <HeroCaption>
        Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo
        ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis
        dis parturient montes, nascetur ridiculus mus. Donec quam felis,
        ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa
        quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget,
        arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo.
        Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras
        dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend
        tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac,
        enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus.
        Phasellus viverra nulla ut metus varius laoreet.
      </HeroCaption>
    </Hero>
    <ContentAlignmentX>
      <ContentAlignmentY>
        <CardGrid tag-name="ul">
          <CardContainer tag-name="li">
            <CardTitle>Dataset 1</CardTitle>
            <CardText
              >Lorem ipsum dolr sit amen dol rist maen dol ist amen dorl sit
              amen dorlosit sit amen dorl sit amen dol dori sti ist.n dorlosit
              sit amen dorl sit amen dol dori sti ist.
            </CardText>
            <CardActions>
              <ButtonLink to="/">Discover Dataset</ButtonLink>
            </CardActions>
          </CardContainer>
          <CardContainer tag-name="li">
            <CardTitle>Dataset 2</CardTitle>
            <CardText
              >Lorem ipsum dolr sit amen dol rist maen dol ist amen dorl sit
              amen dorlosit sit amen dorl sit amen dol dori sti ist.n dorlosit
              sit amen dorl sit amen dol dori sti ist.
            </CardText>
            <CardActions>
              <ButtonLink to="/about" variant="ghost">About</ButtonLink>
            </CardActions>
          </CardContainer>
        </CardGrid>

        <ContentDivider />

        <CardGrid tag-name="ul">
          <CardContainer tag-name="li">
            <CardTitle>API Documentation</CardTitle>
            <CardText
              >Lorem ipsum dolr sit amen dol rist maen dol ist amen dorl sit
              amen dorlosit sit amen dorl sit amen dol dori sti ist. sit amen
              dorl sit amen dol dori sti ist.
            </CardText>
            <CardDivider />
            <InternalLink to="/" tone="primary">
              <ArrowRight class="fill-current" />
              <span>Show API Documentation</span></InternalLink
            >
          </CardContainer>

          <CardContainer tag-name="li">
            <CardTitle>Information</CardTitle>
            <CardText
              >Lorem ipsum dolr sit amen dol rist maen dol ist amen dorl sit
              amen dorl sit amen dol dori sti ist.
            </CardText>
            <CardDivider />
            <InternalLink to="/" tone="primary">
              <ArrowRight class="fill-current" />
              <span>Show Information</span></InternalLink
            >
          </CardContainer>
        </CardGrid>

        <ContentDivider />

        <CardGrid tag-name="ul">
          <li>
            <router-link to="/dataset/odh-activity-poi"
              >ODH ActivityPOI List
            </router-link>
          </li>
          <li>
            <router-link to="/dataset/odh-accommodation"
              >ODH Accommodation List
            </router-link>
          </li>
          <li>
            <router-link to="/dataset/odh-activity-poi-types"
              >ODH ActivityPOITypes List
            </router-link>
          </li>
          <li class="py-4">
            <router-link class="bg-red-100" to="/dataset/xyz"
              >Not existing list route
            </router-link>
          </li>
        </CardGrid>
      </ContentAlignmentY>
    </ContentAlignmentX>
  </AppLayout>
</template>

<script lang="ts">
import AppLayout from '../layouts/AppLayout.vue';
import Hero from '../components/hero/HeroContainer.vue';
import HeroTitle from '../components/hero/HeroTitle.vue';
import HeroSubTitle from '../components/hero/HeroSubTitle.vue';
import HeroCaption from '../components/hero/HeroCaption.vue';
import ButtonLink from '../components/button/ButtonLink.vue';
import CardContainer from '../components/card/CardContainer.vue';
import ContentAlignmentX from '../components/content/ContentAlignmentX.vue';
import CardTitle from '../components/card/CardTitle.vue';
import CardText from '../components/card/CardText.vue';
import CardActions from '../components/card/CardActions.vue';
import CardDivider from '../components/card/CardDivider.vue';
import CardGrid from '../components/card/CardGrid.vue';
import ContentDivider from '../components/content/ContentDivider.vue';
import InternalLink from '../components/link/InternalLink.vue';
import ArrowRight from '../components/svg/ArrowRight.vue';
import { defineComponent } from '@vue/runtime-core';
import ContentAlignmentY from '../components/content/ContentAlignmentY.vue';

export default defineComponent({
  components: {
    ContentAlignmentY,
    AppLayout,
    ArrowRight,
    InternalLink,
    ContentDivider,
    CardGrid,
    CardDivider,
    CardActions,
    CardText,
    CardTitle,
    ContentAlignmentX,
    CardContainer,
    ButtonLink,
    Hero,
    HeroCaption,
    HeroSubTitle,
    HeroTitle,
  },
});
</script>
