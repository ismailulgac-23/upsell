import { createRouter, createWebHistory } from 'vue-router';

import RootLayout from "./layouts/Root/index.vue"
import HomeView from "./features/user/HomeView.vue"
import LiveView from './features/user/LiveView.vue';
import LiveDetailView from './features/user/LiveDetailView.vue';
import LoginView from './features/user/LoginView.vue';
import { userStore } from './store/user';
import ProfileView from './features/user/ProfileView.vue';
import RegisterView from './features/user/RegisterView.vue';

const router = createRouter({
   history: createWebHistory(import.meta.env.BASE_URL),
   routes: [
      {
         path: '/',
         name: 'user',
         component: RootLayout,
         children: [
            { path: "", component: HomeView },
            { path: "user/:id", component: ProfileView },
            {
               path: "live",
               children: [
                  { path: "", component: LiveView },
               ]
            },
         ]
      },
      {
         path: '/login',
         component: LoginView,
         name: 'login',
      },
      {
         path: '/register',
         component: RegisterView,
         name: 'register',
      },
      {
         path: '/live/:id',
         component: LiveDetailView,
         name: 'live-detail',
      },
   ],
   scrollBehavior(to, from, savedPosition) {
      if (savedPosition) {
         return { top: 0 };
      } else {
         return { top: 0 };
      }
   },
});

router.beforeEach(async (to, from, next) => {
   try {
      if (!userStore.user) {
         await userStore.fetchUser();
      }

      if (!userStore.user) {
         if (to.path !== '/login' && to.path !== '/register') {
            next('/login');
         } else {
            next();
         }
      } else {
         if (to.path === '/login' || to.path === '/register') {
            next('/');
         } else {
            next();
         }
      }
   } catch (error) {
      console.error("User fetch failed:", error);
      next('/login');
   }
});



export default router;
