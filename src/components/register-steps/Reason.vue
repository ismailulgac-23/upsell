<template>
   <div
      class="flex flex-col items-center md:items-start mx-auto pt-10 md:pt-0 justify-start md:justify-center w-full max-w-sm h-full">
      <h1 class="mb-4 text-3xl font-semibold">Neden Buradasın?</h1>

      <div class="w-full flex flex-col items-start gap-4 mt-2 mb-8">
         <button @click="state.reason = 'Yeni arkadaşlar arıyorum'"
            class="flex items-center justify-between bg-dark-800 w-full h-[58px] rounded-xl px-6">
            <div class="flex items-center justify-start gap-4">
               <img src="/users.png" class="w-8 h-8" />
               <h1 class="text-sm">Yeni arkadaşlarımla kaliteli vakit geçireceğim.</h1>
            </div>

            <div class="border border-dark-700 w-5 h-5 rounded-full flex items-center justify-center">
               <div v-if="state.reason === 'Yeni arkadaşlar arıyorum'" class="w-3 h-3 rounded-full btn-primary"></div>
            </div>
         </button>
         <button @click="state.reason = 'Sadece eğleniyorum'"
            class="flex items-center justify-between bg-dark-800 w-full h-[58px] rounded-xl px-6">
            <div class="flex items-center justify-start gap-4">
               <img src="/drink.png" class="w-8 h-8" />
               <h1 class="text-sm">Eğlenip günümü gün edeceğim.</h1>
            </div>
            <div class="border border-dark-700 w-5 h-5 rounded-full flex items-center justify-center">
               <div v-if="state.reason === 'Sadece eğleniyorum'" class="w-3 h-3 rounded-full btn-primary"></div>
            </div>
         </button>
      </div>

      <button @click="onContinue" :class="['btn-primary w-full h-[52px] rounded-2xl text-sm font-semibold mb-8', {
         'opacity-50 cursor-not-allowed': !isClickableButton,
         'opacity-100': isClickableButton
      }]">
         Kaydı Tamamla
      </button>
   </div>
</template>

<script setup>
import { computed, reactive } from 'vue';

const props = defineProps(['onComplete'])

const state = reactive({
   reason: ""
});

const isClickableButton = computed(() => state.reason.length > 0);

const onContinue = () => {
   if (!isClickableButton.value) {
      return;
   }
   props.onComplete({ reason: state.reason });
}
</script>

<style lang="scss" scoped></style>