<template>
   <div
      class="flex flex-col items-center md:items-start mx-auto pt-10 md:pt-0 justify-start md:justify-center w-full max-w-sm h-full">
      <h1 class="mb-4 text-3xl font-semibold">Hobilerin Neler?</h1>

      <Loading v-if="state.loading" />
      <div class="flex flex-wrap gap-3 mb-8" v-else>
         <div @click="toggleHobby(hobby.id)" v-for="hobby in state.hobbies" :key="hobby.id" :class="['border h-[38px] px-5 rounded-full flex items-center justify-center cursor-pointer select-none text-sm', {
            'border-transparent btn-primary': getIsSelectedHobby(hobby.id),
            'border-dark-800': !getIsSelectedHobby(hobby.id),
         }]">
            {{ hobby.title }}
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
import { computed, onMounted, reactive } from 'vue';
import axios from '../../axios';
import Loading from '../common/Loading.vue';

const props = defineProps(['setCredentials'])

const state = reactive({
   hobbies: [],
   loading: false,
   selectedHobbies: []
});

const isClickableButton = computed(() => state.selectedHobbies.length > 0);

const getIsSelectedHobby = (id) => {
   const found = state.selectedHobbies.find((e) => e == id);
   if (found) return true;
   return false;
}

const toggleHobby = (id) => {
   const selected = getIsSelectedHobby(id)
   if (selected) {
      state.selectedHobbies = state.selectedHobbies.filter((e) => e !== id);
   } else {
      state.selectedHobbies.push(id);
   }
}

const fetchHobbies = async () => {
   try {
      const { data } = await axios.get('/hobby');
      state.hobbies = data;
   } catch (error) {

   }
}

const onContinue = () => {
   if (!isClickableButton.value) {
      return;
   }
   props.setCredentials({ hobbies: state.selectedHobbies });
}
onMounted(() => {
   fetchHobbies();
});
</script>

<style lang="scss" scoped></style>