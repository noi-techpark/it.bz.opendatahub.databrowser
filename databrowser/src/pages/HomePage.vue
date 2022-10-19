<template>
  <AppLayout>
    <HeroContainer>
      <HeroTitle>
        This is the databrowser of the open data hub of South-Tyrol.
      </HeroTitle>
      <HeroSubTitle>
        Explore and navigate through open data you need to build your next
        service.
      </HeroSubTitle>
    </HeroContainer>

    <PageGridContent class="pt-0 lg:pt-8" disable-padding-top="">
      <CardGrid>
        <div class="order-last lg:order-first">
          <CardTitle>What is it</CardTitle>
          <CardText>
            Use the new Data Browser to discover all available Open Data and get
            an understanding of how to access and use it. All data is collected
            through various interfaces and updated on a regular basis. You can
            simply use them for your convenience, or you might even find a novel
            way to exploit and use them in an app or portal you are developing.
          </CardText>
        </div>
        <img
          class="order-first w-full lg:order-last lg:justify-self-end lg:w-fit"
          src="/home/data.jpg"
          alt="Image showing the text 'data' "
        />
      </CardGrid>

      <ContentDivider />

      <div>
        <CardTitle>Datasets within the Databrowser</CardTitle>
        <CardText>
          The databrowser provides all necessary information and access to open
          data from different fields and sources.
        </CardText>
        <CardActions>
          <ButtonLink
            :size="Size.md"
            :to="{ name: 'OverviewListPage' }"
            class="flex gap-3 items-center pr-6 pl-2.5 w-full text-3xl md:w-fit"
          >
            <div class="py-1 px-3 text-green-500 bg-white rounded">
              {{ datasetCount }}
            </div>
            Show datasets
          </ButtonLink>
        </CardActions>
      </div>

      <ContentDivider />

      <CardGrid>
        <div>
          <CardTitle>Why use it?</CardTitle>
          <CardText class="mt-3">
            <CardIconGrid>
              <IconDatabase />
              Vast collection of different data
              <IconAutomated />
              Automated actualization of data via API
              <IconLarge />
              Large community of data contributors
            </CardIconGrid>
          </CardText>
        </div>
        <div>
          <CardTitle>For whom?</CardTitle>
          <CardText class="mt-3">
            <CardIconGrid>
              <IconDeveloper />
              Developers
              <IconAgency />
              Agencies and businesses working with open data
              <IconDataanalyst />
              Data analysts
            </CardIconGrid>
          </CardText>
        </div>
      </CardGrid>

      <ContentDivider />

      <CardGrid>
        <div>
          <CardTitle>Share data</CardTitle>
          <CardText>
            You like the idea of open data and would like to share your data
            with others?
          </CardText>
          <CardActions>
            <ButtonRawLink
              href="mailto:info@opendatahub.com"
              :size="Size.md2col"
            >
              <IconMail /> Share data
            </ButtonRawLink>
            <ButtonRawLink
              href="https://opendatahub.bz.it"
              target="blank"
              :size="Size.md2col"
              :variant="Variant.ghost"
            >
              <IconExternal /> More information on sharing data
            </ButtonRawLink>
          </CardActions>
        </div>
        <div>
          <CardTitle>Show us what you did with open data</CardTitle>
          <CardText>
            You worked with open data and would like to inspire others by
            showcasing your work? We are looking forward to seeing what you did.
          </CardText>
          <CardActions>
            <ButtonRawLink
              href="mailto:info@opendatahub.com"
              :size="Size.md2col"
            >
              <IconMail /> Provide showcase
            </ButtonRawLink>
            <ButtonRawLink
              href="https://opendatahub.bz.it"
              target="blank"
              :size="Size.md2col"
              :variant="Variant.ghost"
            >
              <IconExternal /> More information on sharing work
            </ButtonRawLink>
          </CardActions>
        </div>
      </CardGrid>

      <CardDivider />

      <PartnersAndContributors />
    </PageGridContent>
  </AppLayout>
</template>

<script setup lang="ts">
import AppLayout from '../layouts/AppLayout.vue';
import HeroContainer from '../components/hero/HeroContainer.vue';
import HeroTitle from '../components/hero/HeroTitle.vue';
import HeroSubTitle from '../components/hero/HeroSubTitle.vue';
import ButtonLink from '../components/button/ButtonLink.vue';
import CardTitle from '../components/card/CardTitle.vue';
import CardText from '../components/card/CardText.vue';
import CardActions from '../components/card/CardActions.vue';
import CardGrid from '../components/card/CardGrid.vue';
import ContentDivider from '../components/content/ContentDivider.vue';
import IconDatabase from '../components/svg/IconDatabase.vue';
import IconAutomated from '../components/svg/IconAutomated.vue';
import IconLarge from '../components/svg/IconLarge.vue';
import IconDeveloper from '../components/svg/IconDeveloper.vue';
import IconAgency from '../components/svg/IconAgency.vue';
import IconDataanalyst from '../components/svg/IconDataanalyst.vue';
import CardIconGrid from '../components/card/CardIconGrid.vue';
import ButtonRawLink from '../components/button/ButtonRawLink.vue';
import { Size, Variant } from '../components/button/types';
import IconMail from '../components/svg/IconMail.vue';
import IconExternal from '../components/svg/IconExternal.vue';
import { datasetsForPages } from '../config/config-for-pages';
import { computed } from 'vue';
import PartnersAndContributors from '../components/partners/PartnersAndContributors.vue';
import CardDivider from '../components/card/CardDivider.vue';
import PageGridContent from '../components/content/PageGridContent.vue';

const datasetCount = computed(() =>
  Object.values(datasetsForPages).reduce((prev, domain) => {
    return prev + domain.length;
  }, 0)
);
</script>
