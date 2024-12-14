<template>
   <div class="relative select-none">
      <div :class="{ 'inset-0 rounded-full border-2 border-[#D33857] p-1': story }">
         <img :src="getImage(src)" :class="class" class="relative z-10 object-cover rounded-full" />
      </div>

      <div v-if="self"
         class="btn-primary w-5 h-5 rounded-full absolute bottom-0 right-0 border-[3px] border-dark-800 flex items-center justify-center z-50">
         <Icon icon="material-symbols:add" class="text-sm text-dark-800" />
      </div>
   </div>
</template>

<script setup>
import { Icon } from '@iconify/vue/dist/iconify.js';
import { getImage } from '../../axios';
import { computed } from 'vue';

const props = defineProps(['src', 'class', 'self', 'story'])

const getClasses = computed(() => {
   return [
      'p-2',
      props.class
   ];
})
</script>

<style lang="scss" scoped></style>