<template>
   <div>
      <img :src="getImage('post', post.thumbnail)" class="w-full h-[200px] rounded-2xl mb-6" />
      <h1 class="font-semibold text-xl mb-2">{{ post.title }}</h1>
      <p class="mb-4 text-sm text-black/60">
         {{ post.subtitle }}
      </p>
      <router-link :to="`/${post.id}`">
         <Button> Devamını Oku </Button>
      </router-link>
   </div>
</template>

<script setup>
import { getImage } from '../helpers';
import Button from './Button.vue';
defineProps(['post'])

</script>

<style lang="scss" scoped></style>