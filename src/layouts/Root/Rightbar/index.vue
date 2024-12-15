<template>
   <div class="w-[320px] h-[700px] border-l border-l-dark-800 p-4">
      <div class="flex items-center h-12 rounded-full bg-dark-800 px-3 gap-3 mb-12">
         <Icon icon="guidance:search" class="text-white/60 text-xl" />
         <input v-model="state.query" type="text" placeholder="Arayın..."
            class="outline-none border-0 bg-transparent text-sm placeholder:text-white/50">
      </div>

      <Loading v-if="state.loading" />
      <div v-else class="flex flex-col items-start w-full gap-4">
         <User @onLikeUser="onLikeUser" v-for="user in state.users" :key="user.id" :user="user" />
      </div>
   </div>
</template>

<script setup>
import { Icon } from '@iconify/vue/dist/iconify.js';
import { onMounted, reactive, watch } from 'vue';
import axios from '../../../axios';
import { useToast } from 'vue-toast-notification';
import User from './User.vue';
import debounce from 'lodash.debounce'
import Loading from '../../../components/common/Loading.vue';

const $toast = useToast();

const state = reactive({
   users: [],
   loading: false,
   query: ""
});

const onLikeUser = (id) => {
   state.users = state.users.filter((e) => e.id !== id);
   fetchRandomUsers();
}

const fetchRandomUsers = async () => {
   try {
      const params = new URLSearchParams();
      params.append('take', "5");
      if (state.query.length) {
         params.append('q', state.query);
      }
      const { data } = await axios.get(`/match/random?${params.toString()}`);
      state.users = data;
   } catch (error) {
      $toast.error('Kullanıcılar getirilirken bir sorun oluştu!', { position: "top" });
   } finally {
      state.loading = false;
   }
}

watch(() => state.query, val => {
   state.loading = true;
   debounce(() => {
      fetchRandomUsers();
   }, 1500)()
}, { deep: true });

onMounted(() => {
   fetchRandomUsers();
});

</script>

<style lang="scss" scoped></style>