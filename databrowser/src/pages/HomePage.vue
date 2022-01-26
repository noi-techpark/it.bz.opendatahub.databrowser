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
          <CardContainer
            v-for="dataset in datasets"
            :key="dataset.type"
            tag-name="li"
          >
            <CardTitle>{{ dataset.config?.description?.title }}</CardTitle>
            <CardText>{{ dataset.config?.description?.subtitle }} </CardText>
            <CardActions>
              <ButtonLink
                :to="{
                  name: 'DatasetsTableViewPage',
                  params: { datasetType: dataset.type },
                }"
                >Discover Dataset</ButtonLink
              >
            </CardActions>
          </CardContainer>
        </CardGrid>

        <ContentAlignmentY>
          <ContentDivider />
        </ContentAlignmentY>

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
      </ContentAlignmentY>
    </ContentAlignmentX>
  </AppLayout>
</template>

<script setup lang="ts">
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
import ContentAlignmentY from '../components/content/ContentAlignmentY.vue';
import { getApiConfigForDataset } from '../domain/api/configUtils';
import { ApiConfigKey } from '../config/config';
import { ApiConfigEntry } from '../config/types';

const datasets: { type: ApiConfigKey; config: ApiConfigEntry | undefined }[] = [
  {
    type: 'odh-activity-poi',
    config: getApiConfigForDataset('odh-activity-poi'),
  },
  {
    type: 'odh-accommodation',
    config: getApiConfigForDataset('odh-accommodation'),
  },
];
</script>
