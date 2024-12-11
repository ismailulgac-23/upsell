import { reactive } from 'vue';
import axios from "./axios";
import router from './router';

export const store = reactive({
   user: null,
   introduction: {},
   categoryAndPosts: [],
   token: localStorage.getItem('token') || null,

   async fetchUser() {
      if (!this.token) return null;

      try {
         const response = await axios.get('/admin/user');
         console.log("response", response.data);

         this.user = response.data.user;
         return this.user;
      } catch (error) {
         console.error('Failed to fetch user:', error);
         this.logout();
         return null;
      }
   },
   async fetchIntroduction() {
      try {
         const response = await axios.get('/client/introduction');
         this.introduction = response.data;
      } catch (error) {
         console.error('Failed to fetch user:', error);
      }
   },

   logout() {
      this.user = null;
      this.token = null;
      localStorage.removeItem('token');
      router.push('/admin/login');
   },
});
