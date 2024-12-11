<template>
   <div class="flex items-center gap-8">
      <div class="flex-[0.4]">
         <img :src="getImage('post', post.thumbnail)" class="h-[240px] object-cover w-full rounded-2xl" />
      </div>
      <div class="flex-[0.6] flex flex-col items-start justify-center">
         <h1 class="text-xl font-semibold mb-2">{{ post.title }}</h1>
         <p class="text-black/60 text-sm font-light mb-4">
            {{ post.subtitle }}
         </p>
         <router-link :to="`/${post.id}`">
            <Button>Devamını Oku</Button>
         </router-link>
      </div>
   </div>
</template>

<script setup>

import { getImage } from '../helpers';
import Button from './Button.vue';
defineProps(['post'])
</script>

<style lang="scss" scoped></style>