<template>
   <div class="bg-gray-400 w-screen h-screen overflow-hidden flex items-center justify-center">
      <div class="max-w-sm w-full rounded-2xl p-5 bg-white">
         <h1 class="text-xl text-center font-medium mb-3">Giriş Yap</h1>

         <input v-model="state.username" type="text" placeholder="Kullanıcı Adı"
            class="text-sm placeholder:text-sm w-full outline-none rounded-md border border-gray-200 p-2.5 h-[38px] mb-3">
         <input v-model="state.password" type="password" placeholder="Parola"
            class="text-sm placeholder:text-sm w-full outline-none rounded-md border border-gray-200 p-2.5 h-[38px] mb-3">

         <Button @click="onSubmit" class="ml-auto w-full">Giriş Yap</Button>
      </div>
   </div>
</template>

<script setup>
import { reactive } from 'vue';
import axios from '../../axios';
import Button from '../../components/Button.vue';
import { store } from '../../store';
import { useToast } from 'vue-toast-notification';
import { useRouter } from 'vue-router';

const $toast = useToast();
const router = useRouter();

const state = reactive({
   username: "",
   password: ""
});

const onSubmit = async () => {
   try {
      const { data } = await axios.post('/admin/login', state)
      localStorage.setItem('token', data.token)
      store.user = data.user;
      store.token = data.token;
      $toast.success(data.message, { position: "top" });
      router.push('/admin');
   } catch (error) {
      store.logout();
      $toast.error(error.response.data.message, { position: "top" });
   }
}

</script>

<style lang="scss" scoped></style>