<template>
   <div class="w-screen h-screen overflow-hidden flex items-start bg-dark-900">
      <Loading v-if="state.loading" />
      <template v-else-if="Object.keys(state.live).length > 0">
         <div class="w-[980px] h-full bg-amber-50" style="backdrop-filter: blur(80.19999694824219px)">
            <div v-if="remoteUid != null" class="h-full w-full video" ref="remoteVideoRef"></div>
            <img v-else :src="getImage(state.live.creator.photos[0])" class="h-full w-full object-contain" />
         </div>
         <div class="h-full py-6 px-12" style="width: calc(100% - 980px);">
            <div class="h-[100px] mb-8">
               <router-link to="/live">
                  <Icon icon="flowbite:arrow-left-outline" class="mb-6 text-3xl cursor-pointer" />
               </router-link>

               <div class="flex items-center justify-between w-full">
                  <h1 class="text-2xl text-white font-medium">{{ state.live.roomName }}</h1>
                  <button class="btn-primary flex items-center p-3 rounded-full gap-2">
                     <Icon icon="hugeicons:gift" class="text-2xl" />
                     <span class="text-sm">Hediye Gönder</span>
                  </button>
               </div>
            </div>

            <div class="h-[110px] flex flex-col items-start gap-3 mb-8">
               <div class="gift h-12 w-[188px] rounded-full p-2 flex items-center justify-between">
                  <div class="flex items-center gap-2.5">
                     <img src="/user.png" class="w-8 h-8 rounded-full" />
                     <div class="flex flex-col items-start">
                        <h1 class="text-[13px] font-semibold">Salih Y.</h1>
                        <span class="text-[10px] font-normal">gül gönderdi</span>
                     </div>
                  </div>

                  <div class="flex items-center gap-2">
                     <img src="/rose.png" class="w-8 h-8" />
                     <h1 class="text-lg font-semibold">x2</h1>
                  </div>
               </div>
               <div class="gift h-12 w-[188px] rounded-full p-2 flex items-center justify-between">
                  <div class="flex items-center gap-2.5">
                     <img src="/user.png" class="w-8 h-8 rounded-full" />
                     <div class="flex flex-col items-start">
                        <h1 class="text-[13px] font-semibold">Salih Y.</h1>
                        <span class="text-[10px] font-normal">gül gönderdi</span>
                     </div>
                  </div>

                  <div class="flex items-center gap-2">
                     <img src="/rose.png" class="w-8 h-8" />
                     <h1 class="text-lg font-semibold">x2</h1>
                  </div>
               </div>

            </div>

            <div class="relative w-full flex flex-col items-start gap-7" style="height: calc(100% - 266px);">

               <div v-for="i in 10" :key="i" class="flex items-start gap-3 w-full">
                  <img src="/user.png" class="w-8 h-8 rounded-full" />
                  <div class="flex flex-col items-start w-full">
                     <div class="w-full flex items-center justify-between">
                        <div class="flex items-center gap-1 mb-2">
                           <h1 class="font-bold text-sm">Selin, 22</h1>
                           <img src="/verified-blue.png" class="w-3.5 h-3.5" />
                        </div>

                        <Icon icon="ri:more-fill" class="text-lg text-dark-400" />
                     </div>

                     <p class="text-xs font-normal">Bacon mushrooms meatball mozzarella Hawaiian crust chicken hand
                        white.
                        NY stuffed and string meat
                        pizza. Fresh NY steak pie string bbq.</p>
                  </div>
               </div>

               <div class="absolute bottom-0 left-0 w-full">
                  <div class="flex items-center gap-3 w-full">
                     <div class="bg-dark-800 w-full h-12 rounded-full flex items-center px-4">
                        <input type="text" placeholder="Mesaj yazın..."
                           class="outline-none border-0 bg-transparent text-sm placeholder:text-sm w-full">
                     </div>
                     <button class="btn-primary w-12 h-12 rounded-full flex items-center justify-center">
                        <Icon class="text-2xl text-white" icon="cil:send" />
                     </button>
                  </div>
               </div>
            </div>
         </div>
      </template>
      <div v-else class="w-full h-full flex items-center flex-col gap-5 justify-center">
         <h1 class="text-4xl">Yayını bulamadık!</h1>
         <router-link to="/live">
            <button class="rounded-xl btn-primary px-5 py-2">Yayınlar'a Gözat</button>
         </router-link>
      </div>

   </div>
</template>

<script setup>
import { Icon } from "@iconify/vue/dist/iconify.js";
import { onBeforeUnmount, onMounted, reactive, ref } from "vue";
import axios, { getImage } from "../../axios";
import Loading from "../../components/common/Loading.vue";
import { createClient } from "agora-rtc-sdk-ng/esm";
import { useRoute } from "vue-router";
import { useToast } from "vue-toast-notification";


const route = useRoute();

const $toast = useToast();
const appId = 'f66f61ba5b4b4f3aab3af168ca86d306';
const channelName = route.params.id;
const rtcClient = createClient({ mode: 'live', codec: 'vp8' });


const localUid = ref(null);
const remoteUid = ref(null);

const localVideoRef = ref(null);
const remoteVideoRef = ref(null);

const state = reactive({
   live: {},
   loading: false
});

const fetchLive = async () => {
   state.loading = true;
   try {
      const { data } = await axios.get(`/chat/room/${route.params.id}`);
      state.live = data;
   } catch (error) {
      $toast.error('Yayın yüklenirken bir sorun oluştu!', { position: "top" });
   } finally {
      state.loading = false;
   }
}

const fetchAgoraToken = async (channelName, uid) => {
   const response = await axios.post('/agora/token', {
      uid,
      channelName
   });
   return response.data.token;
};

const initializeAgora = async () => {
   try {
      const uid = Math.floor(Math.random() * 100000);
      const token = await fetchAgoraToken(channelName, uid);

      await rtcClient.join(appId, channelName, token, uid);
      localUid.value = uid;


      rtcClient.on('user-published', async (user, mediaType) => {
         await rtcClient.subscribe(user, mediaType);
         remoteUid.value = user.uid;
         if (mediaType === 'video' && remoteVideoRef.value) {
            user.videoTrack.play(remoteVideoRef.value, { fit: "contain" });
         }
      });

      rtcClient.on('user-unpublished', (user) => {
         if (remoteUid.value === user.uid) {
            remoteUid.value = null;
         }
      });
   } catch (error) {
      console.error('Agora init error:', error);
   }
};

const leaveChannel = async () => {
   await rtcClient.leave();
};

onMounted(async () => {
   await fetchLive();
   initializeAgora();
});

onBeforeUnmount(() => {
   leaveChannel();
});

</script>