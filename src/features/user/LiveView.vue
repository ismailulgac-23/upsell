<template>
   <div class="w-full">
      <Navbar />
      <Stories />

      <Loading v-if="state.loading" />
      <div v-else class="p-6 grid grid-cols-3 gap-5">
         <Live v-for="live in state.lives" :key="live.id" :live="live" />
      </div>

   </div>
</template>

<script setup>
import Stories from "../../components/common/Stories/index.vue";
import Live from "../../components/common/Live.vue";
import { onMounted, reactive } from "vue";
import axios from "../../axios";
import { useToast } from "vue-toast-notification";
import Loading from "../../components/common/Loading.vue";
import Navbar from "../../layouts/Root/Navbar.vue";

const $toast = useToast();

const state = reactive({
   lives: [],
   loading: false
});

const fetchLives = async () => {
   try {
      const { data } = await axios.get('/chat/live');
      console.log("data", data);

      state.lives = data;

   } catch (error) {
      $toast.error("Canlı yayınlar getirilirken bir sorun oluştu!", { position: "top" });
   }
}

onMounted(() => {
   fetchLives();
});

</script>

<style lang="scss" scoped></style>