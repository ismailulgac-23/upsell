import { createRouter, createWebHistory } from 'vue-router';

import LoginView from './views/LoginView.vue';
import DashboardView from './views/DashboardView.vue';
import SubscriptionsView from './views/SubscriptionsView.vue';
import UsersView from './views/UsersView.vue';

import RootLayout from "./layouts/Root/index.vue"

const router = createRouter({
   history: createWebHistory(import.meta.env.BASE_URL),
   routes: [
      {
         path: '/',
         name: 'root',
         component: RootLayout,
         children: [
            { path: "", component: DashboardView },
            { path: "users", component: UsersView },
            { path: "subscriptions", component: SubscriptionsView },
         ]
      },
      {
         path: '/login',
         component: LoginView,
         name: 'login',
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

/* router.beforeEach(async (to, from, next) => {
   try {
      if (!userStore.user) {
         await userStore.fetchUser();
      }

      if (!userStore.user) {
         if (to.path !== '/login' && to.path !== '/register' && to.path !== '/logout') {
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
}); */



export default router;
