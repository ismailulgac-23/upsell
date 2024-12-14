<template>
   <div class="p-6 w-full flex items-center gap-8 border-b border-b-dark-800">
      <router-link v-for="(link, index) in links" :key="index" :to="link.to" :class="['text-lg', {
         'text-white font-semibold': route.fullPath == link.to,
         'text-dark-400 font-normal': route.fullPath != link.to
      }]">
         {{ link.title }}
      </router-link>
   </div>
</template>

<script setup>
import { useRoute } from 'vue-router';

const route = useRoute();
const links = [
   { title: "Keşfet", to: "/" },
   { title: "Canlı Yayınlar", to: "/live" },
   { title: "Sohbet Odaları", to: "/live/" },
]
</script>

<style lang="scss" scoped></style>