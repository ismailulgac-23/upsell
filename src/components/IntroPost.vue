<template>
   <div class="h-[310px] mx-auto flex items-center justify-center w-full gap-10">
      <div class="flex-[0.5]">
         <img :src="getImage('post', post.thumbnail)" class="w-full rounded-3xl h-[340px] object-cover" />
      </div>
      <div class="flex-[0.5] flex flex-col items-start justify-center">
         <h1 class="text-3xl font-semibold mb-4">{{ post.title }}</h1>

         <p class="text-black/60 text-base font-light mb-4">
            {{ post.subtitle }}
         </p>

         <router-link :to="`/${post.id}`">
            <Button class="text-primary">Devamını Oku</Button>
         </router-link>


      </div>
   </div>
</template>

<script setup>
import Button from './Button.vue';
import { getImage } from '../helpers';

defineProps(['post'])
</script>

<style lang="scss" scoped></style>