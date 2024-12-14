<template>
   <div class="w-screen h-screen overflow-hidden flex flex-col md:flex-row items-center">
      <div class="w-full md:w-1/2 h-1/3 md:h-full">
         <img src="/login.png" class="w-full h-full object-cover" />
      </div>
      <div class="relative w-full md:w-1/2 h-full">
         <div
            class="flex flex-col items-center md:items-start mx-auto pt-10 md:pt-0 justify-start md:justify-center w-full max-w-sm h-full">
            <h1 class="mb-2 text-3xl font-semibold">Giriş Yap</h1>

            <span class="mb-8 text-xs font-normal">Love meet dünyasına hoş geldiniz.</span>
            <div class="w-full mb-8">
               <label class="text-[10px] font-normal">Telefon Numaranız</label>
               <input v-model="formattedPhoneNumber" @input="applyMask" type="text"
                  class="mt-2 bg-transparent outline-none border  border-dark-600 rounded-xl h-[58px] w-full py-5 px-6 text-xs font-medium"
                  placeholder="(5XX) XXX XXXX">
            </div>

            <button @click="onSubmit" :class="['btn-primary w-full h-[52px] rounded-2xl text-sm font-semibold mb-8', {
               'opacity-50 cursor-not-allowed': !isValidPhoneNumber,
               'opacity-100': isValidPhoneNumber
            }]">
               Devam Et
            </button>

            <div class="flex items-center justify-center gap-4 w-full mb-8">
               <div class="w-full h-px bg-dark-800"></div>
               <span class="text-dark-500 text-xs flex-shrink-0">ya da</span>
               <div class="w-full h-px bg-dark-800"></div>
            </div>

            <div class="flex items-center w-full justify-center gap-4">
               <button
                  class="gap-3 h-[52px] rounded-2xl bg-white w-full flex items-center justify-center text-xs font-semibold text-black">
                  <Icon icon="ic:baseline-apple" color="#162030" class="text-3xl" />
                  <span>Apple</span>
               </button>
               <button
                  class="gap-3 h-[52px] rounded-2xl bg-[#1877F2] w-full flex items-center justify-center text-xs font-semibold">
                  <Icon icon="ic:baseline-facebook" class="text-3xl" />
                  <span>Facebook</span>
               </button>
            </div>
         </div>
         <div class="absolute bottom-10 left-0 w-full">
            <div class="w-full flex items-center justify-center gap-1">
               <h1 class="text-dark-400 text-sm">Hesabın yok mu?</h1>
               <router-link to="/register" class="bg-to-text cursor-pointer text-sm">Kayıt Ol</router-link>
            </div>
         </div>
      </div>
   </div>
   <VerificationModal :setCode="setCode" :verify-loading="state.verifyLoading" :on-verify="onVerifyOTP"
      :phoneNumber="formattedPhoneNumber" />

</template>

<script setup>
import { Icon } from '@iconify/vue/dist/iconify.js';
import VerificationModal from '../../components/modal/VerificationModal.vue';
import { modalStore } from '../../store/modal';
import axios from '../../axios';
import { reactive } from 'vue';
import usePhone from '../../composables/use-phone';
import { useToast } from 'vue-toast-notification';
import { userStore } from '../../store/user';
import { useRouter } from 'vue-router';

const { formattedPhoneNumber, isValidPhoneNumber, parsedPhoneNumber, applyMask, } = usePhone();
const $toast = useToast();

const router = useRouter();

const state = reactive({
   code: "",
   verifyLoading: false
});

const setCode = (payload) => {
   state.code = payload;
}

const onSubmit = async () => {
   if (!isValidPhoneNumber.value) {
      $toast.error("Lütfen telefon numarasını doğru formatta giriniz!", { position: "top" });
      return;
   }
   try {
      await axios.post('/auth/phone', {
         'phoneNumber': parsedPhoneNumber.value
      });
      modalStore.verificationModal = true;
   } catch (error) {
      $toast.error(error.response.data.message, { position: "top" });
   }
}

const onVerifyOTP = async () => {
   if (state.code.length < 6) {
      $toast.error("Doğrulama kodunuz hatalı!", { position: "top" });
      return;
   }
   state.verifyLoading = true;
   try {
      const { data } = await axios.post('/auth/verify', {
         phoneNumber: parsedPhoneNumber.value,
         code: state.code,
      });
      localStorage.setItem('token', data.token);
      userStore.user = data.user;

      window.location.href = "/";

      modalStore.verificationModal = false;
   } catch (error) {
      if (error.response.data.message != 'REGISTER') {
         $toast.error(error.response.data.message, { position: "top" });
      }
   } finally {
      state.verifyLoading = false;
   }
}

</script>

<style lang="scss" scoped></style>
