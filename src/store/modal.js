import { reactive } from 'vue';

export const modalStore = reactive({
   commentsModal: false,
   verificationModal: false,
   createAiImageModal: false,
   sidebarModal: false
});
