<template>
   <div class="w-screen h-screen overflow-hidden flex flex-col items-center justify-center">
      <img src="/only-logo.png" class="w-[108px] h-[40px] object-cover mb-28" />
      <div class="p-8 rounded-3xl w-[480px] bg-white border border-[#F3F4F6]"
         style="box-shadow: 0px 0px 12px 0px #F3F4F6;">
         <div class="flex flex-col items-center justify-center mb-12">
            <h1 class="mb-2 text-2xl font-medium">Giriş Yap</h1>
            <span class="text-[#6B7280] text-sm">Bilgileriniz ile giriş yapabilirsiniz.</span>
         </div>


         <div class="border border-[#F3F4F6] w-full rounded-xl px-4 h-14 flex items-center gap-2 mb-3">
            <Icon icon="mingcute:phone-line" class="text-2xl" />
            <input type="text" placeholder="Telefon"
               class="text-sm placeholder:text-sm h-full w-full outline-none border-none bg-transparent">
         </div>
         <div class="border border-[#F3F4F6] w-full rounded-xl px-4 h-14 flex items-center gap-2 mb-3">
            <Icon icon="carbon:password" class="text-2xl" />
            <input type="password" placeholder="Parola"
               class="text-sm placeholder:text-sm h-full w-full outline-none border-none bg-transparent">
         </div>

         <div class="w-full flex items-center justify-between mb-12">
            <div class="flex items-center justify-center gap-2">
               <div class="w-4 h-4 border border-[#E4E4E7] rounded-md"></div>
               <span class="text-sm">Beni Hatırla</span>
            </div>

            <span class="text-[#6B7280] text-xs font-normal">Şifremi unuttum</span> 
         </div>

         <router-link to="/" class="h-12 rounded-xl bg-[#EF4444] w-full flex items-center justify-center text-sm text-white">GİRİŞ YAP</router-link>
      </div>
   </div>
</template>

<script setup>
import { Icon } from "@iconify/vue";
</script>

<style lang="scss" scoped></style>