<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <EditListTab :items="items">
    <template #tabLabel="{ item }">
      <span class="truncate">{{ getFileName((item as FileEntry).src) }}</span>
    </template>

    <template #addItems>
      <EditListAddButton :text="'Add new PDF'" @click="navigateToAdd" />
    </template>

    <template #body="{ item, index }">
      <div class="flex flex-wrap gap-8 md:flex-nowrap">
        <div v-if="isUploadError" class="basis-full bg-red-200">
          {{ uploadError }}
        </div>
        <div class="basis-full md:order-1 md:basis-1/3">
          <SubCategoryItem title="URL">
            <UrlCell :text="item.src" :editable="false" />
          </SubCategoryItem>
          <SubCategoryItem title="Language">
            <StringCell :text="item.language" :editable="false" />
          </SubCategoryItem>
          <SubCategoryItem title="Document Name">
            <StringCell
              :text="item.documentName"
              :editable="editable"
              @update="
                updateItem(index, {
                  documentName: $event.value,
                  src: item.src,
                  language: item.language,
                })
              "
            />
          </SubCategoryItem>
        </div>
        <div class="basis-full md:order-3 md:basis-1/3">
          <div class="rounded border">
            <div class="flex items-center justify-between bg-gray-50 px-4 py-3">
              <span class="font-semibold">Info &amp; action</span>
            </div>
            <div class="divide-y p-4">
              <div v-if="editable">
                <button class="m-3 flex items-center gap-3" @click="changeFile">
                  <IconUpload class="text-green-500" />
                  <span>Change PDF</span>
                </button>
              </div>
              <div>
                <button
                  class="m-3 flex items-center gap-3"
                  @click="downloadFile(item.url, item.url)"
                >
                  <IconDownload class="text-green-500" />
                  <span>Download PDF</span>
                </button>
              </div>
              <div v-if="editable">
                <button
                  class="m-3 flex items-center gap-3"
                  @click="duplicateItem(index)"
                >
                  <IconCopy class="text-green-500" />
                  <span>Duplicate</span>
                </button>
              </div>
              <div v-if="editable">
                <button
                  class="mx-3 mt-3 flex items-center gap-3"
                  @click="deleteItems([index])"
                >
                  <IconDelete class="text-delete" />
                  <span>Delete</span>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="basis-full md:order-2 md:basis-1/3"></div>
      </div>
    </template>
  </EditListTab>
</template>

<script setup lang="ts">
import { toRefs, watch } from 'vue';
import EditListTab from '../../utils/editList/tab/EditListTab.vue';
import EditListAddButton from '../../utils/editList/EditListAddButton.vue';
import { useImageUpload } from '../../utils/upload/useUpload';
import { downloadFile } from '../../utils/editList/download/fileDownload';
import IconDelete from '../../../../../components/svg/IconDelete.vue';
import IconCopy from '../../../../../components/svg/IconCopy.vue';
import IconDownload from '../../../../../components/svg/IconDownload.vue';
import IconUpload from '../../../../../components/svg/IconUpload.vue';
import SubCategoryItem from '../../../../datasets/category/SubCategoryItem.vue';
import { useInjectActionTriggers } from '../../utils/editList/actions/useActions';
import { useInjectNavigation } from '../../utils/editList/actions/useNavigation';
import { useInjectEditMode } from '../../utils/editList/actions/useEditMode';
import { FileType } from '../../utils/upload/types';
import { useFileDialogForType } from '../../utils/upload/useFileDialogForType';
import UrlCell from '../UrlCell/UrlCell.vue';
import { FileEntry } from './types';
import StringCell from '../stringCell/StringCell.vue';

const props = defineProps<{ items: FileEntry[]; type?: FileType }>();

const { items } = toRefs(props);

const { activeTab, navigateToAdd } = useInjectNavigation();

const { deleteItems, duplicateItem, updateItem, updateItems } =
  useInjectActionTriggers();

const { editable } = useInjectEditMode();

const { files, open } = useFileDialogForType({
  multiple: false,
  type: props.type,
});

const {
  isUploadError,
  isUploadSuccess,
  uploadError,
  uploadResponse,
  uploadFiles,
} = useImageUpload();

watch(files, (filesFromFileDialog) => {
  if (filesFromFileDialog == null) {
    return;
  }

  const filesToUpload = Array.from(filesFromFileDialog);

  // Trigger file upload
  uploadFiles(filesToUpload);
});

watch([isUploadSuccess, uploadResponse], ([isSuccess, fileUrls]) => {
  if (isSuccess) {
    const currentItems = items.value;
    const currentItem = currentItems[activeTab.value];
    const nextImage = { ...currentItem, src: fileUrls[0] };
    const nextImages = [...currentItems];
    nextImages[activeTab.value] = nextImage;
    updateItems(nextImages);
  }
});

const changeFile = () => open();

const getFileName = (url?: string) =>
  url == null ? url : url.split('/').pop();
</script>
