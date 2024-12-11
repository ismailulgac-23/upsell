<template>
   <div v-if="!loading">
      <Navbar />
      <div class="py-14 container mx-auto max-w-6xl">
         <router-view></router-view>
      </div>
      <Footer/>
   </div>
   <div v-else class="w-screen h-screen flex items-center justify-center overflow-hidden">
      <h1 class="text-4xl font-medium">Hoşgeldiniz</h1>
   </div>
</template>

<script setup>

import { onMounted, ref } from 'vue';
import Footer from './Footer.vue';
import Navbar from './Navbar.vue';
import { store } from '../../store';

const loading = ref(true);

onMounted(async () => {
   await store.fetchIntroduction();
   loading.value = false;
});

</script>

<style lang="scss" scoped></style>