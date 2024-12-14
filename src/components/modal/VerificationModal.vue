<template>
   <Modal v-if="modalStore.verificationModal">
      <div class="w-[438px] bg-dark-800 border border-dark-700 rounded-3xl p-6 md:p-10 mx-5 md:mx-0">
         <h1 class="text-[28px] font-semibold mb-2">Gelen kodu doğrula</h1>
         <h3 class="text-sm mb-8">
            <span class="gift bg-to-text">+90 {{ phoneNumber }}</span> numarana bir kod gönderdik.
         </h3>

         <div class="grid grid-cols-6 gap-2 mb-8">
            <div v-for="(input, index) in inputs" :key="index" :class="['rounded-xl border w-[50px] h-[58px]', {
               'border-white': currentInput === index,
               'border-dark-600': currentInput !== index
            }]">
               <input type="text" class="w-full h-full outline-none rounded-xl text-2xl bg-transparent text-center"
                  maxlength="1" ref="inputRefs" v-model="inputs[index]" @focus="currentInput = index"
                  @input="handleInput(index, $event)" @keydown.backspace="handleBackspace(index, $event)" />
            </div>
         </div>

         <button @click="onPressVerify" :class="['text-white rounded-2xl btn-primary h-[52px] text-sm w-full', {
            'opacity-50 cursor-not-allowed': verifyLoading
         }]">{{ verifyLoading ? 'Doğrulanıyor...' : 'Doğrula' }}</button>
      </div>
   </Modal>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";
import { modalStore } from "../../store/modal";
import Modal from "./index.vue";

const props = defineProps(['setCode', 'verifyLoading', 'onVerify', 'phoneNumber']);

const inputs = ref(["", "", "", "", "", ""]);
const inputRefs = ref([]);
const currentInput = ref(0);

function handleInput(index, event) {
   const value = event.target.value;

   if (value && index < inputs.value.length - 1) {
      inputRefs.value[index + 1].focus();
      currentInput.value = index + 1;
   }

   props.setCode(inputs.value.join(""));
}

function handleBackspace(index, event) {
   if (event.key === "Backspace" && !inputs.value[index] && index > 0) {
      inputRefs.value[index - 1].focus();
      currentInput.value = index - 1;
   }
}

const onPressVerify = () => {
   props.onVerify();
   inputs.value = ["", "", "", "", "", ""];
   inputRefs.value = [];
   currentInput.value = 0;
   focusFirstInput();
};

const focusFirstInput = () => {
   setTimeout(() => {
      if (inputRefs.value[0]) {
         inputRefs.value[0].focus();
         currentInput.value = 0;
      }
   }, 0);
};

watch(() => modalStore.verificationModal, (value) => {
   focusFirstInput();
}, { deep: true });
</script>
