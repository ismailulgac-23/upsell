<template>
   <div class="w-[270px] h-full bg-black">
      <div class="flex items-center gap-3 p-3 border-b border-zinc-600">
         <img :src="getImage('user', store.user.photoUrl)" class="w-10 h-10 rounded-xl border border-white" />
         <div class="flex flex-col items-start gap-0.5">
            <h1 class="text-base font-semibold text-white"> {{ store.user.fullName }} </h1>
            <span class="text-black/60 text-white text-xs font-light">{{ store.user.job }}</span>
         </div>
      </div>

      <div class="p-3 flex flex-col gap-2">
         <component :is="link.to ? 'router-link' : 'button'" @click="link.onClick" :to="link.to" :class="['flex items-center p-2 hover:bg-zinc-800 rounded-md transition-all gap-2', {
            'bg-zinc-800': route.path == link.to
         }]" v-for="(link, index) in links" :key="index">
            <Icon :icon="link.icon" class="text-white text-2xl" />
            <h1 class="text-sm text-white">{{ link.title }}</h1>
         </component>
      </div>

   </div>
</template>

<script setup>
import { Icon } from "@iconify/vue";
import { computed } from 'vue';
import { useRoute } from "vue-router";
import { store } from "../../store";
import { getImage } from "../../helpers";
const route = useRoute();

const links = computed(() => {
   return [
      { to: "/admin", title: "Bilgilerim", icon: "octicon:person-24" },
      { to: "/admin/posts", title: "Yazılarım", icon: "iconoir:post" },
      { to: "/admin/categories", title: "Kategoriler", icon: "bxs:category" },
      { onClick: () => store.logout(), title: "Çıkış Yap", icon: "mdi:logout" },
   ]
});
</script>

<style lang="scss" scoped></style>