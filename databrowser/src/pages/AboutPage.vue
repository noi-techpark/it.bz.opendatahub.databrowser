<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <AppLayout>
    <PageGridContent class="pt-0 lg:pt-8" disable-padding-top>
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
          class="order-first w-full lg:order-last lg:w-fit lg:justify-self-end"
          src="/home/data.jpg"
          alt="Image showing the text 'data' "
        />
      </CardGrid>

      <ContentDivider />

      <div>
        <CardTitle>Datasets within the Data Browser</CardTitle>
        <CardText>
          The Data Browser provides all necessary information and access to Open
          Data from different fields and sources.
        </CardText>
        <CardActions>
          <ButtonLink
            :size="Size.md"
            :to="{ name: 'OverviewListPage' }"
            class="flex w-full items-center justify-center py-6 text-3xl md:w-fit"
            data-test="show-all-datasets"
          >
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
              Agencies and businesses working with Open Data
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
            You like the idea of Open Data and would like to share your data
            with others?
          </CardText>
          <CardActions>
            <ButtonExternalLink
              href="mailto:info@opendatahub.com"
              :size="Size.md2col"
            >
              <IconMail /> Share data
            </ButtonExternalLink>
            <ButtonExternalLink
              href="https://opendatahub.com"
              target="blank"
              :size="Size.md2col"
              :variant="Variant.ghost"
            >
              <IconExternal /> More information on sharing data
            </ButtonExternalLink>
          </CardActions>
        </div>
        <div>
          <CardTitle>Show us what you did with Open Data</CardTitle>
          <CardText>
            You worked with Open Data and would like to inspire others by
            showcasing your work? We are looking forward to seeing what you did.
          </CardText>
          <CardActions>
            <ButtonExternalLink
              href="mailto:info@opendatahub.com"
              :size="Size.md2col"
            >
              <IconMail /> Provide showcase
            </ButtonExternalLink>
            <ButtonExternalLink
              href="https://opendatahub.com"
              target="blank"
              :size="Size.md2col"
              :variant="Variant.ghost"
            >
              <IconExternal /> More information on sharing work
            </ButtonExternalLink>
          </CardActions>
        </div>
      </CardGrid>
    </PageGridContent>
  </AppLayout>
</template>

<script setup lang="ts">
import AppLayout from '../layouts/AppLayout.vue';
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
import ButtonExternalLink from '../components/button/ButtonExternalLink.vue';
import { Size, Variant } from '../components/button/types';
import IconMail from '../components/svg/IconMail.vue';
import IconExternal from '../components/svg/IconExternal.vue';
import PageGridContent from '../components/content/PageGridContent.vue';
</script>
