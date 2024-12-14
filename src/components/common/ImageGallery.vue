<template>
   <div :class="['grid gap-4', `grid-cols-${getGridCount}`]">
      <div class="relative" v-for="(image, index) in images" :key="index">
         <img :src="getGalleryImage(image)" class="w-full h-full rounded-lg" />

         <button @click="onPressDeleteImage(index)" class="absolute top-0 right-0 w-8 h-8 rounded-bl-md btn-primary flex items-center justify-center">
            <Icon icon="mdi:close" class="text-2xl" />
         </button>
      </div>
   </div>
</template>

<script setup>
import { computed, reactive, watch } from 'vue';
import { getImage } from '../../axios';
import { Icon } from '@iconify/vue/dist/iconify.js';

const props = defineProps(['images'])

const emit = defineEmits(['onDeleteImage']);

const getGridCount = computed(() => {
   if (props.images.length > 3) {
      return 3;
   }
   return props.images.length;
})

const onPressDeleteImage = index => {
   emit('onDeleteImage', index);
}

const getGalleryImage = (src) => {
   if (typeof src == 'object') {
      return URL.createObjectURL(src);
   }
   if (src.includes('im.runware.ai')) {
      return src;
   }

   return getImage(src);
}

</script>

<style lang="scss" scoped></style>