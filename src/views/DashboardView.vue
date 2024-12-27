<template>
   <div class="w-full h-full">
      <div class="h-[90px] mb-4 border-b border-b-[#E5E7EB] w-full flex items-center justify-between px-5">
         <div class="flex flex-col items-start gap-1">
            <h1 class="text-2xl font-medium">Ana Sayfa</h1>
         </div>

         <div class="flex items-center gap-3">
            <button class="w-12 h-12 rounded-xl border border-[#E5E7EB] flex items-center justify-center">
               <Icon icon="ep:refresh" class="text-2xl" />
            </button>
            <button class="px-4 h-12 gap-2 rounded-xl text-sm border border-[#E5E7EB] flex items-center justify-center">
               <Icon icon="solar:calendar-outline" class="text-2xl" />
               Tarih ile Filtrele
            </button>
         </div>
      </div>


      <div class="grid grid-cols-4 gap-6 mb-6">
         <div v-for="(badge, index) in badges" :key="index" :class="['rounded-2xl border border-[#F3F4F6] p-4']"
            style="box-shadow: 0px 0px 12px 0px #F3F4F6;">
            <div class="flex items-center justify-between w-full mb-5">
               <div class="flex items-center gap-2">
                  <Icon :icon="badge.icon" :color="badge.iconColor" class="text-2xl" />
                  <span class="text-sm">{{ badge.title }}</span>
               </div>

               <Icon icon="ep:refresh" class="text-xl text-[#6B7280]" />
            </div>

            <div class="flex flex-col items-start">
               <h1 class="text-2xl font-medium mb-1">{{ badge.value }}</h1>
               <div class="w-full flex items-center justify-between">
                  <span class="text-[#00A86B] text-xs font-medium">
                     {{ badge.status }}
                  </span>

                  <button v-if="badge.buyButton" :class="['h-8 w-[70px] rounded-lg text-sm', {
                     'bg-[#FEF2F2] text-[#EF4444]': badge.outlined,
                     'text-white bg-[#EF4444]': !badge.outlined,
                  }]">
                     Satın Al
                  </button>
               </div>
            </div>
         </div>
      </div>



      <img class="w-full object-contain" src="/report-subs.png" />
      <img class="w-full object-contain" src="/query.png" />
      <img class="w-full object-contain" src="/credit.png" />

   </div>
</template>

<script setup>
import { Icon } from "@iconify/vue";

const badges = [
   {
      title: "Toplam Abonelik",
      icon: "gridicons:multiple-users",
      iconColor: "#6366F1",
      value: "18.905",
      status: "+56.9%",
   },
   {
      title: "Toplam Abonelik",
      icon: "logos:whatsapp-icon",
      value: "18.205",
      status: "+6.9%",
      buyButton: true
   },
   {
      title: "E-Posta Kredisi",
      icon: "lucide:mail",
      value: "18.205",
      status: "+6.9%",
      buyButton: true,
      outlined: true
   },
   {
      title: "SMS Kredisi",
      icon: "proicons:chat",
      value: "18.205",
      status: "+6.9%",
      buyButton: true,
      outlined: true
   },
]
</script>

<style lang="scss" scoped></style>