<template>
   <Modal v-if="modalStore.createUserModal">
      <div class="bg-[#F3F4F6] w-[520px] rounded-3xl p-6">
         <div class="w-full flex items-center justify-between border-b border-b-gray-200 pb-5 mb-5">
            <div class="w-5 h-5"></div>

            <h1 class="text-lg font-medium">Yeni Kullanıcı Oluştur</h1>

            <button @click="modalStore.createUserModal = false" class="flex items-center justify-center">
               <Icon icon="mdi:close" class="text-red-500 text-2xl" />
            </button>
         </div>

         <div class="grid grid-cols-2 gap-3">
            <div class="bg-white w-full rounded-xl px-4 h-14 flex items-center gap-2 mb-3">
               <Icon icon="proicons:person-circle" class="text-3xl" />
               <input type="text" placeholder="Adınız"
                  class="text-sm placeholder:text-sm h-full w-full outline-none border-none bg-transparent">
            </div>
            <div class="bg-white w-full rounded-xl px-4 h-14 flex items-center gap-2 mb-3">
               <Icon icon="proicons:person-circle" class="text-3xl" />
               <input type="text" placeholder="Soyadınız"
                  class="text-sm placeholder:text-sm h-full w-full outline-none border-none bg-transparent">
            </div>
         </div>

         <div class="bg-white w-full rounded-xl px-4 h-14 flex items-center gap-2 mb-3">
            <Icon icon="si:mail-line" class="text-2xl" />
            <input type="text" placeholder="E-Postanız"
               class="text-sm placeholder:text-sm h-full w-full outline-none border-none bg-transparent">
         </div>

         <div class="bg-white w-full rounded-xl px-4 h-14 flex items-center gap-2 mb-3">
            <Icon icon="carbon:password" class="text-2xl" />
            <input type="password" placeholder="Parola"
               class="text-sm placeholder:text-sm h-full w-full outline-none border-none bg-transparent">
         </div>

         <div class="bg-white w-full rounded-xl px-4 h-14 flex items-center gap-2 mb-3">
            <Icon icon="material-symbols-light:person-edit-outline" class="text-4xl" />
            <input type="text" placeholder="Rol"
               class="text-sm placeholder:text-sm h-full w-full outline-none border-none bg-transparent">
         </div>

         <div class="flex items-center gap-2">
            <Icon icon="material-symbols:info-rounded" class="text-[#EF4444] text-2xl" />
            <span class="text-sm">Bilgileri daha sonra değiştirebilirsiniz.</span>
         </div>

         <div class="h-px w-full my-5 bg-gray-200"></div>
         <button @click="modalStore.createUserModal = false"
            class="px-4 gap-2 h-12 w-full rounded-xl bg-[#EF4444] flex items-center justify-center text-white text-sm">
            <Icon icon="gridicons:add" class="text-xl" />
            Oluştur
         </button>

      </div>
   </Modal>
</template>

<script setup>
import { Icon } from "@iconify/vue/dist/iconify.js";
import { modalStore } from "../../store/modal";
import Modal from "./index.vue";
</script>

<style lang="scss" scoped></style>