<template>
   <div
      class="w-[280px] h-[700px] fixed left-[280px] border-r border-r-dark-800 py-6 px-4 flex flex-col items-start justify-between">
      <div class="flex flex-col items-start">
         <router-link to="/">
            <img src="/logo.png" class="mb-14 w-[160px] h-[32px] object-cover" />
         </router-link>

         <div class="flex flex-col items-start gap-10">
            <component :is="link.to ? 'router-link' : 'button'" @click="link.onClick" :to="link.to" v-for="(link, index) in links" :key="index" class="flex items-center gap-3">
               <Icon :icon="link.icon" class="text-3xl" />
               <h1>{{ link.title }}</h1>
            </component>
         </div>
      </div>

      <div class="flex flex-col items-start gap-10 w-full">
         <button class="w-full h-[52px] rounded-full text-sm btn-primary">Gönderi Paylaş</button>

         <router-link :to="`/user/${userStore.user.id}`" class="flex items-center justify-between w-full">
            <div class="flex items-center gap-4">
               <Avatar :src="userStore.user.photos[0]" class="w-12 h-12 rounded-full" />

               <div class="flex flex-col items-start">
                  <div class="flex items-center gap-2">
                     <h1 class="font-semibold">{{ userStore.user.fullName }}</h1>
                     <img src="/verified.png" class="w-4 h-4" />
                  </div>
                  <span class="text-dark-400 text-xs">Profilim</span>
               </div>
            </div>
            <Icon icon="formkit:arrowright" class="text-base text-dark-400" />
         </router-link>
      </div>
   </div>
</template>

<script setup>
import { Icon } from '@iconify/vue/dist/iconify.js';
import { userStore } from '../../store/user';
import Avatar from '../../components/common/Avatar.vue';

const links = [
   { title: "Ana Sayfa", icon: "hugeicons:home-01", to: "/" },
   { title: "Mesajlar", icon: "mynaui:chat-messages" },
   { title: "Bildirimler", icon: "solar:bell-outline" },
   { title: "Profilim", icon: "iconoir:profile-circle", to: `/user/${userStore.user.id}` },
   { title: "Çıkış Yap", icon: "mdi:logout", onClick: () => userStore.logout() },
];
</script>

<style lang="scss" scoped></style>