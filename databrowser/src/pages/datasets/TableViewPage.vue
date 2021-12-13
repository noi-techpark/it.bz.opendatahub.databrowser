<template>
  <AppLayout>
    <Hero>
      <HeroTitle>All POIs</HeroTitle>
      <HeroSubTitle
        >Lorem ipsum dolor sit amen dolr sit amen dolr ist ist amen.
      </HeroSubTitle>

      <InternalLink to="/" tone="primary"
        ><span>More information</span></InternalLink
      >
    </Hero>

    <div class="flex flex-col h-full">
      <ViewPills :view="view" :dataset-type="datasetType" />

      <ContentArea class="flex justify-between">
        <div>
          <ButtonCustom>Table view</ButtonCustom>
          <ButtonCustom :disabled="true">Detail view</ButtonCustom>
          <ButtonCustom :disabled="true">Raw view</ButtonCustom>
        </div>
        <ul class="inline-flex">
          <li class="p-2"><button>DE</button></li>
          <li class="p-2"><button>IT</button></li>
          <li class="p-2"><button>EN</button></li>
          <li class="p-2"><button>NL</button></li>
          <li class="p-2"><button>CS</button></li>
          <li class="p-2"><button>PL</button></li>
          <li class="p-2"><button>FR</button></li>
          <li class="p-2"><button>RU</button></li>
        </ul>
      </ContentArea>

      <DatasetList></DatasetList>
    </div>
  </AppLayout>
</template>

<script lang="ts">
import { defineComponent } from '@vue/runtime-core';
import AppLayout from '../../layouts/AppLayout.vue';
import Hero from '../../components/hero/HeroContainer.vue';
import HeroTitle from '../../components/hero/HeroTitle.vue';
import HeroSubTitle from '../../components/hero/HeroSubTitle.vue';
import ContentArea from '../../components/content/ContentArea.vue';
import InternalLink from '../../components/link/InternalLink.vue';
import ButtonCustom from '../../components/button/ButtonCustom.vue';
import DatasetList from '../../domain/datasets/tableView/List.vue';
import { useRoute } from 'vue-router';
import ViewPills from '../../domain/datasets/navigation/ViewPills.vue';
import { ViewPill } from '../../domain/datasets/navigation/types';

export default defineComponent({
  components: {
    ViewPills,
    AppLayout,
    Hero,
    HeroTitle,
    HeroSubTitle,
    ContentArea,
    InternalLink,
    ButtonCustom,
    DatasetList,
  },
  setup() {
    const route = useRoute();
    const datasetType = route.params.datasetType as string;

    return {
      view: ViewPill.table,
      datasetType,
    };
  },
});
</script>
