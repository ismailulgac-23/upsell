<template>
   <div
      class="flex flex-col items-center md:items-start mx-auto pt-10 md:pt-0 justify-start md:justify-center w-full max-w-sm h-full">
      <h1 class="mb-2 text-3xl font-semibold">Kayıt Ol</h1>

      <div class="w-full mb-8">
         <label class="text-[10px] font-normal">Adınız</label>
         <input v-model="state.fullName" type="text"
            class="mt-2 bg-transparent outline-none border  border-dark-600 rounded-xl h-[58px] w-full py-5 px-6 text-xs font-medium"
            placeholder="Adınızı giriniz">
      </div>
      <div class="w-full mb-8">
         <label class="text-[10px] font-normal">Doğum Tarihiniz</label>
         <div class="grid grid-cols-3 gap-4 w-full">
            <input v-model="state.day" type="text"
               class="mt-2 bg-transparent outline-none border  border-dark-600 rounded-xl h-[58px] w-full py-5 px-6 text-xs font-medium"
               placeholder="gün">
            <input v-model="state.month" type="text"
               class="mt-2 bg-transparent outline-none border  border-dark-600 rounded-xl h-[58px] w-full py-5 px-6 text-xs font-medium"
               placeholder="ay">
            <input v-model="state.year" type="text"
               class="mt-2 bg-transparent outline-none border  border-dark-600 rounded-xl h-[58px] w-full py-5 px-6 text-xs font-medium"
               placeholder="yıl">
         </div>
      </div>
      <div class="w-full mb-8">
         <label class="text-[10px] font-normal">Cinsiyet</label>
         <div class="w-full flex flex-col items-start gap-4 mt-2">
            <button @click="state.gender = 'MALE'" class="flex items-center justify-between bg-dark-800 w-full h-[58px] rounded-xl px-6">
               <div class="flex items-center gap-4">
                  <Icon icon="mage:male" class="text-3xl" />
                  <h1 class="text-sm">Erkek</h1>
               </div>

               <div class="border border-dark-700 w-5 h-5 rounded-full flex items-center justify-center">
                  <div v-if="state.gender === 'MALE'" class="w-3 h-3 rounded-full btn-primary"></div>
               </div>
            </button>
            <button @click="state.gender = 'FEMALE'" class="flex items-center justify-between bg-dark-800 w-full h-[58px] rounded-xl px-6">
               <div class="flex items-center gap-4">
                  <Icon icon="mage:female" class="text-3xl" />
                  <h1 class="text-sm">Kadın</h1>
               </div>
               <div class="border border-dark-700 w-5 h-5 rounded-full flex items-center justify-center">
                  <div v-if="state.gender === 'FEMALE'" class="w-3 h-3 rounded-full btn-primary"></div>
               </div>
            </button>
         </div>
      </div>

      <button @click="onContinue" :class="['btn-primary w-full h-[52px] rounded-2xl text-sm font-semibold mb-8', {
         'opacity-50 cursor-not-allowed': !isClickableButton,
         'opacity-100': isClickableButton
      }]">
         Devam Et
      </button>

   </div>
</template>

<script setup>
import { Icon } from '@iconify/vue/dist/iconify.js';
import { computed, reactive } from 'vue';
import { useToast } from 'vue-toast-notification';
const props = defineProps(['setCredentials'])

const $toast = useToast();

const state = reactive({
   fullName: "",
   day: "",
   month: "",
   year: "",
   gender: ""
});

const isClickableButton = computed(() => {
   return state.fullName != '' && state.day != '' && state.month != '' && state.year != '' && state.gender != '';
});

const onContinue = () => {
   if (!isClickableButton.value) {
      return;
   }
   props.setCredentials(state);
}

</script>

<style lang="scss" scoped></style>