<template>
  <div>
    <div
      class="flex gap-5 justify-between mt-2 mb-5"
      :class="anyImageSelected && hasImages ? 'text-default' : 'text-disabled'"
    >
      <div>
        <AddImagesButton class="md:hidden" />
      </div>
      <div>
        <DeleteImagesButton
          :disabled="!anyImageSelected || !hasImages"
          text="Delete"
          @delete-images="deleteSelectedImages"
        />
      </div>
    </div>
    <TableCustom>
      <colgroup>
        <col v-if="hasImages" class="w-0 md:w-10" />
        <col class="w-10 md:w-40" />
        <col class="w-32 md:w-40" />
        <col class="w-32 md:w-40" />
        <col class="w-32 md:w-40" />
        <col class="w-32 md:w-40" />
        <col class="w-32 md:w-40" />
        <col class="w-32 md:w-40" />
        <col class="w-32 md:w-40" />
        <col class="w-20 md:w-28" />
      </colgroup>
      <TableHeader>
        <TableHeaderCell
          v-if="hasImages"
          class="w-0 bg-white border-none md:block md:w-full md:h-14"
        ></TableHeaderCell>
        <TableHeaderCell v-if="hasImages">
          <div class="flex">
            <CheckboxCustom
              :model-value="allImagesSelected"
              class="mr-3"
              @update:model-value="toggleAllImagesSelected($event)"
            />
            <span class="hidden md:inline">ALL</span>
          </div>
        </TableHeaderCell>
        <TableHeaderCell>IMAGE</TableHeaderCell>
        <TableHeaderCell>POSITION</TableHeaderCell>
        <TableHeaderCell>Titel</TableHeaderCell>
        <TableHeaderCell>Description</TableHeaderCell>
        <TableHeaderCell>Copyright</TableHeaderCell>
        <TableHeaderCell>License</TableHeaderCell>
        <TableHeaderCell>Resolution</TableHeaderCell>
        <TableHeaderCell
          v-if="hasImages"
          class="sticky right-0 font-semibold bg-gray-50"
        >
          Settings
        </TableHeaderCell>
      </TableHeader>
      <VueDraggableNext
        v-model="imagesInternal"
        tag="tbody"
        handle=".handle"
        class="divide-y divide-gray-200"
      >
        <tr v-for="(image, index) in imagesInternal" :key="index">
          <td v-if="hasImages" class="pt-4 pr-4 w-0 border-none">
            <IconDragAndDrop class="hidden cursor-pointer md:block handle" />
          </td>
          <TableCell v-if="hasImages" class="relative">
            <CheckboxCustom
              :model-value="imagesSelected[index]"
              @change="toggleSingleImageSelection(index)"
            />
          </TableCell>
          <TableCell>
            <UseFullscreen
              v-slot="{ toggle, isFullscreen }"
              class="flex justify-center items-center md:items-stretch"
            >
              <div
                class="flex relative justify-center cursor-pointer image-preview"
                :class="{ 'items-center': !isFullscreen }"
                @click="toggle()"
              >
                <img
                  :src="resizeImageWidth(200, image.src, isFullscreen)"
                  :alt="image.alt"
                  class="object-fit"
                />
                <IconExpanded
                  v-if="!isFullscreen"
                  class="absolute text-white transition-all"
                />
              </div>
            </UseFullscreen>
          </TableCell>
          <TableCell>{{ image.listPosition }}</TableCell>
          <TableCell>{{ image.title }}</TableCell>
          <TableCell>{{ image.description }}</TableCell>
          <TableCell>{{ image.copyright }}</TableCell>
          <TableCell>{{ image.license }}</TableCell>
          <TableCell>{{ getResolution(image) }}</TableCell>
          <TableCell
            v-if="hasImages"
            class="sticky right-0 bg-white shadow-table-static-col"
          >
            <RowSettings
              v-if="deleteConfirmIndex !== index"
              :index="index"
              @delete-image="openDeleteSingleImageConfirm(index)"
              @duplicate-image="emit('duplicateImage', index)"
              @push-image="emit('pushImage', index)"
            />
            <ConfirmDeleteSingle
              v-else
              class="absolute inset-x-0 top-0 p-4 ml-[-16em] h-full bg-gray-50 shadow-table-static-col"
              @abort="closeDeleteSingleImageConfirm"
              @confirm="deleteSingleConfirm(index)"
            />
          </TableCell>
        </tr>
      </VueDraggableNext>
    </TableCustom>
    <div v-if="!hasImages">No images have been uploaded yet</div>
    <AddImagesButton class="mt-5" />
  </div>
</template>

<script setup lang="ts">
import { computed, defineEmits, defineProps, ref } from 'vue';
import TableHeaderCell from '../../../../../../components/table/TableHeaderCell.vue';
import TableCell from '../../../../../../components/table/TableCell.vue';
import UseFullscreen from '../../../../../../components/fullscreen/UseFullscreen.vue';
import IconExpanded from '../../../../../../components/svg/IconExpanded.vue';
import CheckboxCustom from '../../../../../../components/checkbox/CheckboxCustom.vue';
import IconDragAndDrop from '../../../../../../components/svg/IconDragAndDrop.vue';
// import { VueDraggableNext } from 'vue-draggable-next';
import TableCustom from '../../../../../../components/table/TableCustom.vue';
import TableHeader from '../../../../../../components/table/TableHeader.vue';
import { useImageSelection } from './useImageSelection';
import ConfirmDeleteSingle from './ConfirmDeleteSingle.vue';
import AddImagesButton from '../AddImagesButton.vue';
import DeleteImagesButton from '../DeleteImagesButton.vue';
import RowSettings from './RowSettings.vue';
import { resizeImageWidth } from '../../../../../image';

interface ImageGalleryEntry {
  alt?: string;
  src?: string;
  name?: string;
  width?: string;
  height?: string;
  title?: string;
  description?: string;
  copyright?: string;
  license?: string;
  listPosition?: string;
  active?: string;
}

const emit = defineEmits([
  'deleteImages',
  'duplicateImage',
  'pushImage',
  'updateImages',
]);

const props = defineProps<{ images: ImageGalleryEntry[] }>();

const imagesInternal = computed({
  get: () => props.images,
  set: (value) => emit('updateImages', value),
});

const hasImages = computed(() => imagesInternal.value.length > 0);

const {
  allImagesSelected,
  anyImageSelected,
  imagesSelected,
  toggleAllImagesSelected,
  toggleSingleImageSelection,
} = useImageSelection(imagesInternal);

const getResolution = (image: ImageGalleryEntry) => {
  return image.width != null && image.height != null
    ? `${image.width} x ${image.height} px`
    : '';
};

const deleteSelectedImages = () => {
  const indexes = imagesSelected.value.reduce<number[]>(
    (previous, currentSelected, index) =>
      currentSelected ? [...previous, index] : [...previous],
    []
  );
  emit('deleteImages', indexes);
};

const deleteConfirmIndex = ref<number | undefined>();

const openDeleteSingleImageConfirm = (index: number) =>
  (deleteConfirmIndex.value = index);

const closeDeleteSingleImageConfirm = () =>
  (deleteConfirmIndex.value = undefined);

const deleteSingleConfirm = (index: number) => {
  closeDeleteSingleImageConfirm();
  emit('deleteImages', [index]);
};
</script>

<style scoped>
.image-preview:hover svg {
  @apply scale-125;
}
</style>
