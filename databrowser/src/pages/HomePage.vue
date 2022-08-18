<template>
  <AppLayout>
    <HeroContainer>
      <HeroTitle>Open Data Hub Data Browser 2.0</HeroTitle>
      <HeroSubTitle>
        Explore and navigate through open data you need to build your next
        service.
      </HeroSubTitle>
      <HeroCaption>
        Use the new Data Browser to discover all available Open Data and get an
        understanding of how to access and use it. All data is collected through
        various interfaces and updated on a regular basis. You can simply use
        them for your convenience, or you might even find a novel way to exploit
        and use them in an app or portal you are developing.
      </HeroCaption>
    </HeroContainer>
    <ContentAlignmentX>
      <ContentAlignmentY>
        <CardGrid tag-name="ul">
          <CardContainer
            v-for="(dataset, index) in datasets"
            :key="index"
            tag-name="li"
          >
            <CardTitle>{{ dataset.description?.title }}</CardTitle>
            <CardText>{{ dataset.description?.subtitle }} </CardText>
            <CardActions>
              <ButtonLink
                :to="{
                  name: DatasetPage.TABLE,
                  params: {
                    domain: datasetRoutes[index].domain,
                    pathParams: datasetRoutes[index].pathParams,
                  },
                }"
              >
                Discover Dataset
              </ButtonLink>
            </CardActions>
          </CardContainer>

          <CardContainer tag-name="li">
            <CardTitle>Datasets overview</CardTitle>
            <CardText>
              This page provides an overview of available datasets
            </CardText>
            <CardActions>
              <ButtonLink to="/links">Discover Datasets</ButtonLink>
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
              >A free and well documented API platform you can use to create new
              amazing applications. The documentation gives a complete
              introduction on how to access Open Data through the Open Data Hub
              API and other dedicated interfaces and protocols.
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
import HeroContainer from '../components/hero/HeroContainer.vue';
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
import { ref } from 'vue';
import { DatasetConfig, DatasetRoute } from '../domain/datasetConfig/types';
import { resolveDatasetConfig } from '../domain/datasetConfig/resolver';
import { DatasetPage } from '../routes';

const datasets = ref<DatasetConfig[]>([]);
const datasetRoutes: DatasetRoute[] = [
  {
    domain: 'tourism',
    pathParams: ['v1', 'Accommodation'],
  },
  {
    domain: 'tourism',
    pathParams: ['v1', 'Article'],
  },
  {
    domain: 'tourism',
    pathParams: ['v1', 'EventShort'],
  },
];
const promises = datasetRoutes.map((d) => resolveDatasetConfig(d));
Promise.all(promises).then((p) => (datasets.value = p));
</script>
