<template>
   <div class="flex flex-col items-center mx-auto justify-center max-w-md w-full">
      <h1 class="mb-3 font-light text-base text-primary">İletişimimiz daim olsun</h1>
      <h1 class="text-3xl font-semibold mb-6">E-Posta Bültenine Kaydolun</h1>

      <div class="border border-black/10 h-[56px] rounded-2xl flex items-center justify-between pr-4 w-full">
         <input type="text" placeholder="e-postanız"
            class="rounded-2xl h-full px-6 outline-none w-full text-sm font-light placeholder:text-sm">
         <Button>Gönder</Button>
      </div>

   </div>
</template>

<script setup>

import Button from './Button.vue';

</script>

<style lang="scss" scoped></style>