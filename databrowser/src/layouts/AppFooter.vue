<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <div class="flex flex-col">
    <div class="bg-[#F4F8F9]">
      <ContentAlignmentX
        class="m-auto flex flex-col p-4 text-xl xl:w-[80rem] 2xl:px-0"
      >
        <div
          class="flex w-full flex-col gap-x-10 gap-y-4 border-b border-black pb-4 font-semibold text-black lg:flex-row"
        >
          <CardContainer :no-padding="true" class="grow bg-white p-3">
            <div class="flex items-center gap-4">
              <router-link
                to="/"
                class="no-underline"
                data-test="link-to-home-page"
              >
                <div class="flex">
                  <img
                    :alt="t('header.logo')"
                    class="aspect-square h-12"
                    src="/logo-open-data-hub-black.svg"
                  />
                  <div class="mx-2 w-px self-stretch bg-black"></div>
                  <div
                    class="h-full rounded border border-black px-2 py-1 text-lg font-semibold leading-5 text-black"
                  >
                    DATA<br />BROWSER
                  </div>
                </div>
              </router-link>
              Tool to access<br />open data
            </div>
          </CardContainer>
          <CardContainer :no-padding="true" class="grow bg-white p-3">
            <div class="flex items-center gap-4">
              <img
                :alt="t('header.logo')"
                class="aspect-square h-12"
                src="/logo-open-data-hub-black.svg"
              />
              Place where data and<br />tech are shared
            </div>
          </CardContainer>
          <CardContainer :no-padding="true" class="grow bg-white p-3">
            <div class="flex items-center gap-4">
              <img alt="NOI Techpark" src="/logo-noi.svg" />
              Innovation hub in<br />Südtirol/Alto Adige
            </div>
          </CardContainer>
        </div>
        <div class="flex w-full flex-col gap-4 pt-4 lg:flex-row">
          <ul class="grow basis-0">
            <li class="font-semibold">Relevant links</li>
            <li>
              <router-link to="/dataset-overview" class="no-underline">
                Datasets
              </router-link>
            </li>
            <li>
              <ExternalLink
                class="flex items-center gap-2"
                href="https://github.com/noi-techpark/it.bz.opendatahub.databrowser/wiki"
                variant="no-underline"
                tone="text"
              >
                How to
              </ExternalLink>
            </li>
            <li>
              <ExternalLink
                class="flex items-center gap-2"
                href="https://opendatahub.com/contact"
                variant="no-underline"
                tone="text"
              >
                Contact
              </ExternalLink>
            </li>
          </ul>
          <ul class="grow basis-0">
            <li class="font-semibold">Quickstart</li>
            <li>
              <ExternalLink
                class="flex items-center gap-2"
                href="https://opendatahub.com"
                variant="no-underline"
                tone="text"
              >
                Open Data Hub Website
              </ExternalLink>
            </li>
            <li>
              <router-link to="/"> Databrowser </router-link>
            </li>
            <li>
              <ExternalLink
                class="flex items-center gap-2"
                href="https://webcomponents.opendatahub.com/"
                variant="no-underline"
                tone="text"
              >
                Web Components
              </ExternalLink>
            </li>
          </ul>
          <ul class="grow basis-0">
            <li class="font-semibold">Contributors</li>
            <li>
              The Data Browser is the result of a great collaboration between
              many awesome people!
              <ExternalLink
                class="inline-flex items-center gap-2"
                href="https://opendatahub.com/community/contributors?project=databrowser"
                tone="text"
              >
                Check them out!<IconExternal />
              </ExternalLink>
            </li>
          </ul>
          <ul class="grow basis-0">
            <li class="font-semibold">Social Media</li>
            <li>
              <ExternalLink
                class="flex items-center gap-2 no-underline"
                href="https://opendatahub.com/community/contributors?project=databrowser"
                tone="text"
              >
                <img src="/logo-github.svg" alt="GitHub" />GitHub
              </ExternalLink>
            </li>
            <li>
              <ExternalLink
                class="flex items-center gap-2 no-underline"
                href="https://opendatahub.com/community/contributors?project=databrowser"
                tone="text"
              >
                <img src="/logo-telegram.svg" alt="Telegram" />Telegram
              </ExternalLink>
            </li>
            <li>
              <ExternalLink
                class="flex items-center gap-2 no-underline"
                href="https://opendatahub.com/community/contributors?project=databrowser"
                tone="text"
              >
                <img src="/logo-element.svg" alt="element" />element.io
              </ExternalLink>
            </li>
            <li>
              <ExternalLink
                class="flex items-center gap-2 no-underline"
                href="https://opendatahub.com/community/contributors?project=databrowser"
                tone="text"
              >
                <img src="/logo-facebook.svg" alt="Facebook" />Facebook
              </ExternalLink>
            </li>
          </ul>
        </div>
      </ContentAlignmentX>
    </div>
    <div>
      <ContentAlignmentX
        class="flex w-full justify-center p-4 xl:w-[80rem] 2xl:px-0"
      >
        <span class="text-sm">
          @Open Data Hub |
          <ExternalLink href="https://noi.bz.it/en/privacy" tone="text"
            >Privacy</ExternalLink
          >
          |
          <ExternalLink href="/" tone="text">Privacy</ExternalLink>
        </span>
      </ContentAlignmentX>
    </div>
  </div>
</template>

<script setup lang="ts">
import CardContainer from '../components/card/CardContainer.vue';
import ContentAlignmentX from '../components/content/ContentAlignmentX.vue';
import ExternalLink from '../components/link/ExternalLink.vue';
import { useI18n } from 'vue-i18n';
import IconExternal from '../components/svg/IconExternal.vue';

const { t } = useI18n();
</script>
