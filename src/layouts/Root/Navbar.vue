<template>
   <div class="w-full h-[80px] border-b-2 border-b-primary">
      <div class="container mx-auto h-full flex items-center justify-between">
         <router-link to="/" class="flex items-center gap-3">
            <img :src="getImage('user', store.introduction.photoUrl)" class="w-[32px] h-[32px] rounded-lg" />
            <h1 class="text-base font-semibold">{{ store.introduction.fullName }}</h1>
         </router-link>

         <div class="flex items-center gap-8">
            <a v-for="(category, index) in store.categoryAndPosts" :key="index" 
            @click="handleClickLink(category.id)"
               class="text-base font-normal cursor-pointer">
               {{category.title}}
            </a>
         </div>

         <div></div>
      </div>
   </div>
</template>

<script setup>
import { Icon } from "@iconify/vue";
import { getImage } from "../../helpers";
import { store } from "../../store";

const handleClickLink = (id) => {
   window.location.href = `/#${id}`;
   window.location.reload();
}
</script>

<style lang="scss" scoped></style>