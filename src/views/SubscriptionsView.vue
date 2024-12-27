<template>
   <div class="w-full h-full">
      <div class="h-[90px] mb-4 border-b border-b-[#E5E7EB] w-full flex items-center justify-between px-5">
         <div class="flex flex-col items-start gap-1">
            <h1 class="text-2xl font-medium">Telefon Aboneleri</h1>
         </div>

         <div class="flex items-center gap-3">
            <button class="w-12 h-12 rounded-xl border border-[#E5E7EB] flex items-center justify-center">
               <Icon icon="ep:refresh" class="text-2xl" />
            </button>
            <div class="bg-[#F3F4F6] w-[170px] rounded-xl px-2 h-12 flex items-center gap-2">
               <Icon icon="lucide:search" class="text-2xl" />
               <input type="text" placeholder="Ara..."
                  class="text-sm placeholder:text-sm h-full w-full outline-none border-none bg-transparent">
            </div>

         </div>
      </div>

      <div class="w-full rounded-2xl bg-white border border-[#F3F4F6] my-table p-6">
         <table class="table-auto w-full border-collapse">
            <thead>
               <tr class="text-left text-[#6B7280] text-sm border-b">
                  <th class="font-normal px-4 py-2">#</th>
                  <th class="font-normal px-4 py-2">Adı</th>
                  <th class="font-normal px-4 py-2">Telefon</th>
                  <th class="font-normal px-4 py-2">Sil</th>
               </tr>
            </thead>
            <tbody>
               <tr v-for="(user, index) in 9" :key="index" class="hover:bg-gray-50 border-b">
                  <td class="px-4 text-[#9CA3AF] text-sm py-2 w-[60px]">{{ index + 1 }}</td>
                  <td class="px-4 py-2 flex items-center gap-4">
                     <div
                        class="w-10 text-sm h-10 flex justify-center items-center bg-[#E5E7EB] text-[#030712] rounded-xl">
                        IU
                     </div>
                     <span class="text-base">ismail ulgac</span>
                  </td>
                  <td class="px-4 py-2 text-[#030712]">+90 555 555 5555</td>
                  <td class="px-4 py-2">
                     <button class="bg-[#FEE2E2] w-10 h-10 rounded-xl flex items-center justify-center">
                        <Icon icon="material-symbols:delete-outline" class="text-[#EF4444] w-6 h-6"></Icon>
                     </button>
                  </td>
               </tr>
            </tbody>
         </table>
      </div>

   </div>
</template>

<script setup>
import { Icon } from "@iconify/vue";

</script>

<style lang="scss" scoped></style>