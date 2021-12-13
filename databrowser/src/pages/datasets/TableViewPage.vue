<template>
  <AppLayout>
    <Header>
      <HeaderTitle>All POIs</HeaderTitle>
      <HeaderSubTitle
        >Lorem ipsum dolor sit amen dolr sit amen dolr ist ist amen.
      </HeaderSubTitle>

      <InternalLink to="/" tone="primary"
        ><span>More information</span></InternalLink
      >
    </Header>

    <div class="flex flex-col h-full">
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
import HeaderTitle from '../../components/header/HeaderTitle.vue';
import HeaderSubTitle from '../../components/header/HeaderSubTitle.vue';
import ContentArea from '../../components/content/ContentArea.vue';
import InternalLink from '../../components/link/InternalLink.vue';
import Header from '../../components/header/HeaderContainer.vue';
import ButtonCustom from '../../components/button/ButtonCustom.vue';
import DatasetList from '../../domain/tableView/List.vue';

export default defineComponent({
  components: {
    AppLayout,
    HeaderTitle,
    HeaderSubTitle,
    ContentArea,
    InternalLink,
    Header,
    ButtonCustom,
    DatasetList,
  },
});
</script>
