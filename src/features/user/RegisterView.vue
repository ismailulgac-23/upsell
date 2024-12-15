<template>
   <div class="w-screen h-screen overflow-hidden flex flex-col md:flex-row items-center">
      <div class="w-full md:w-1/2 h-1/3 md:h-full">
         <img src="/register.png" class="w-full h-full object-cover" />
      </div>
      <div class="relative w-full md:w-1/2 h-full">
         <PhoneNumber v-if="userStore.registerStep == 0" :onSubmit="onSubmit" :setCode="setCode"
            :onVerifyOTP="onVerifyOTP" :verifyLoading="state.verifyLoading" />
         <PersonalInformation v-if="userStore.registerStep == 1" :setCredentials="setPersonalInformation" />
         <Hobbies v-if="userStore.registerStep == 2" :setCredentials="(payload) => {
            userStore.registerStep += 1;
            setCredentials(payload);
         }" />
         <Reason v-if="userStore.registerStep == 3" :onComplete="onComplete" />
      </div>
   </div>
</template>

<script setup>
import { modalStore } from '../../store/modal';
import axios from '../../axios';
import { onMounted, reactive } from 'vue';
import { useToast } from 'vue-toast-notification';
import { userStore } from '../../store/user';
import { useRouter } from 'vue-router';
import PhoneNumber from '../../components/register-steps/PhoneNumber.vue';
import PersonalInformation from '../../components/register-steps/PersonalInformation.vue';
import Hobbies from '../../components/register-steps/Hobbies.vue';
import Reason from '../../components/register-steps/Reason.vue';

const $toast = useToast();

const router = useRouter();

const state = reactive({
   code: "",
   verifyLoading: false,
   credentials: {}
});

const setCredentials = (payload) => {
   state.credentials = {
      ...state.credentials,
      ...payload
   }
}

const setCode = (payload) => {
   state.code = payload;
}

const setPersonalInformation = (payload) => {
   userStore.registerStep +=1;
   setCredentials({
      fullName: payload.fullName,
      gender: payload.gender,
      birthday: `${payload.day}/${payload.month}/${payload.year}`
   })
}

const onSubmit = async ({ phoneNumber }) => {
   try {
      await axios.post('/auth/phone', {
         'phoneNumber': phoneNumber
      });
      modalStore.verificationModal = true;
   } catch (error) {
      $toast.error(error.response.data.message, { position: "top" });
   }
}

const onVerifyOTP = async ({ phoneNumber }) => {
   if (state.code.length < 6) {
      $toast.error("Doğrulama kodunuz hatalı!", { position: "top" });
      return;
   }
   state.verifyLoading = true;
   try {
      const { data } = await axios.post('/auth/verify', {
         phoneNumber: phoneNumber,
         code: state.code,
      });
      localStorage.setItem('token', data.token);
      userStore.user = data.user;

      router.push('/');

      modalStore.verificationModal = false;
   } catch (error) {
      if (error.response.data.message != 'REGISTER') {
         $toast.error(error.response.data.message, { position: "top" });
      } else {
         userStore.registerStep += 1;
      }
   } finally {
      setCredentials({ phoneNumber });
      state.verifyLoading = false;
   }
}
const onComplete = async ({ reason }) => {
   state.credentials = { ...state.credentials, reason };

   try {
      const { data } = await axios.post('/auth/register', state.credentials)
      
      localStorage.setItem('token', data.token);
      userStore.user  =data.user;

      window.location.href = "/";

   } catch (error) {
      $toast.error('Kayıt sırasında bir sorun oluştu!', { position: "top" });
   }

}

onMounted(() => {
   setCredentials({ phoneNumber: userStore.registerPhoneNumber });
});

</script>

<style lang="scss" scoped></style>
