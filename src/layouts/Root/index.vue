<template>
   <div v-if="!loading" class="relative flex items-start container w-[1450px]">
      <Sidebar />
      <div class="fixed left-[560px] w-[720px] overflow-y-auto h-full no-scrollbar">
         <router-view></router-view>
      </div>
      <Rightbar />
   </div>
   <div v-else class="w-screen h-screen flex items-center justify-center overflow-hidden">
      <h1 class="text-4xl font-medium">Hoşgeldiniz</h1>
   </div>
</template>

<script setup>

import { onMounted, ref } from 'vue';
import Navbar from './Navbar.vue';
import Sidebar from './Sidebar.vue';
import Rightbar from './Rightbar/index.vue';

const loading = ref(true);

onMounted(async () => {
   loading.value = false;
});

</script>

<style lang="scss" scoped></style>