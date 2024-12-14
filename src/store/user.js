import { reactive } from 'vue';
import axios from '../axios';

export const userStore = reactive({
   user: null,
   async fetchUser() {
      try {
         const {data} = await axios.post('/auth/user');
         this.user = data.user;
         localStorage.setItem('token', data.token);
      } catch (error) {
         
      }
   }
});
