<template>
   <div class="bg-black/[0.03] w-full p-10 flex flex-col items-center justify-center rounded-2xl">
      <h1 class="text-2xl font-semibold mb-4">Hakkımda</h1>
      <p class="text-black/80 text-base font-light mb-8 text-center">
         Dolor tomatoes pesto pie onions ham NY roll. Fresh olives burnt pan crust pan. Party stuffed string black rib
         mushrooms. Personal buffalo sausage pie anchovies. Buffalo Chicago melted banana sausage hand mouth banana.
         Sautéed peppers platter Hawaiian wing thin party chicken dolor. Ricotta tomato tomatoes bell personal. Philly
         bacon onions thin ranch banana mozzarella dolor anchovies marinara. Meatball sausage sauce pizza ricotta steak
         bacon. Pork mouth wing Aussie burnt.
      </p>

      <div class="flex items-center gap-3 relative">
         <img :src="getImage('user',store.introduction.photoUrl)" class="w-16 h-16 rounded-2xl" />
         <div class="flex flex-col items-start">
            <h1 class="text-2xl font-semibold">{{store.introduction.fullName}}</h1>
            <span class="text-blck/60 text-xs font-light">{{store.introduction.job}}</span>
         </div>
         <img src="/signature.png" class="absolute -right-7 -bottom-3 w-[72px]" />
      </div>
   </div>
</template>

<script setup>

import { getImage } from '../helpers';
import { store } from '../store';

</script>

<style lang="scss" scoped></style>