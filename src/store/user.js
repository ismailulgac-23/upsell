import { reactive } from 'vue';
import axios from '../axios';
import router from '../router';

export const userStore = reactive({
   user: null,
   async fetchUser() {
      try {
         const {data} = await axios.post('/auth/user');
         this.user = data.user;
         localStorage.setItem('token', data.token);
      } catch (error) {
         
      }
   },
   logout() {
      localStorage.removeItem('token');
      setTimeout(() => {
         this.user = null;
      }, 2000);
      window.location.href = "/login";
   }
});
