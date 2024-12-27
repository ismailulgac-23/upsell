<template>
   <div>
      <img src="/logo.png" class="w-full" />
      <div class="h-px w-full my-2 bg-gray-200"></div>

      <div class="flex flex-col items-start p-4 gap-3">
         <router-link :to="link.to" v-for="(link, index) in links" :key="index"
            :class="['h-12 gap-3 flex items-center cursor-pointer border px-3 w-full rounded-xl', { 'bg-[#EF4444] text-white': route.fullPath == link.to, 'border-[#F3F4F6]': route.fullPath != link.to }]">
            <Icon :icon="link.icon" class="text-2xl" />
            <span class="font-medium">{{ link.title }}</span>
         </router-link>
      </div>
   </div>
</template>

<script setup>
import { Icon } from "@iconify/vue";
import { useRoute } from "vue-router";
const route = useRoute();
const links = [
   { to: "/", title: "Ana Sayfa", icon: "si:home-line" },
   { to: "/subscriptions", title: "Telefon Aboneleri", icon: "si:mail-line" },
   { to: "/users", title: "Kullanıcılar", icon: "mynaui:users" },
   { to: "", title: "Yeniden Stokta", icon: "ep:box" },
   { to: "", title: "Sepet ve Hatırlatma", icon: "solar:cart-5-outline" },
   { to: "", title: "Haftanın Ürünleri", icon: "solar:star-line-duotone" },
   { to: "", title: "Cüzdan", icon: "mdi:wallet-outline" },
   { to: "", title: "Beden Tabloları", icon: "hugeicons:shirt-01" },
];
</script>

<style lang="scss" scoped></style>