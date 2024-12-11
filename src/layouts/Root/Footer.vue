<template>
   <div>
      <Subscribe class="mb-24" />

      <footer class="p-14 flex flex-col items-center bg-primary/5 h-full"
         style="backdrop-filter: blur(103.5999984741211px)">
         <div class="flex items-center gap-3 mb-10">
            <img :src="getImage('user', store.introduction.photoUrl)" class="w-10 h-10 rounded-xl" />
            <div class="flex flex-col items-start gap-0.5">
               <h1 class="text-lg font-semibold"> {{store.introduction.fullName}} </h1>
               <span class="text-black/60 text-xs font-light">{{store.introduction.job}}</span>
            </div>
         </div>

         <div class="flex items-center gap-4 mb-20">
            <Link v-for="(link, index) in store.introduction.socialLinks" :key="index" :link="link" />
         </div>

         <div class="flex items-center gap-4">
            <img src="/raven-soft.png" class="w-[96px] h-4" />
            <span class="text-sm font-light text-black/60">Bu web sitesi alt yapı gücünü Raven Soft’tan alır.</span>
         </div>
      </footer>
   </div>
</template>

<script setup>

import Link from "../../components/Link.vue";
import Subscribe from '../../components/Subscribe.vue';
import { getImage } from "../../helpers";
import { store } from "../../store";

const links = [
   { title: "Linkedin", icon: "logos:linkedin-icon", href: "" },
   { title: "Twitter", icon: "pajamas:twitter", href: "" },
   { title: "mail@mail.com", icon: "lets-icons:e-mail", href: "" },
]

</script>

<style lang="scss" scoped></style>