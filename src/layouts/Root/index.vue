<template>
   <div v-if="!loading" class="w-full flex items-start md:container md:mx-auto">
      <Sidebar class="hidden md:flex" />
      <div class="overflow-y-auto h-full no-scrollbar w-full md:w-[calc(100% - 600px)]">
         <Nav @onClickMenu="handleClickMenu" />
         <router-view></router-view>
      </div>
      <Rightbar class="flex-shrink-0 hidden md:block" />
   </div>
   <div v-else class="w-screen h-screen flex items-center justify-center overflow-hidden">
      <h1 class="text-4xl font-medium">Hoşgeldiniz</h1>
   </div>

   <Modal v-if="modalStore.sidebarModal">
      <Sidebar class="w-full h-full bg-dark-800" :isMobile="true" />
   </Modal>
</template>

<script setup>

import { onMounted, ref } from 'vue';
import Nav from './Nav.vue';
import Sidebar from './Sidebar.vue';
import Rightbar from './Rightbar/index.vue';
import Modal from '../../components/modal/index.vue';
import { modalStore } from '../../store/modal';

const loading = ref(true);

const handleClickMenu = () => {
   modalStore.sidebarModal = true;
}

onMounted(async () => {
   loading.value = false;
});

</script>

<style lang="scss" scoped></style>