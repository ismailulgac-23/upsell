import { createRouter, createWebHistory } from 'vue-router';

import RootLayout from "./layouts/Root/index.vue"
import AdminLayout from "./layouts/Admin/index.vue"
import HomeView from "./features/user/HomeView.vue"
import DashboardView from "./features/admin/DashboardView.vue"
import PostView from './features/user/PostView.vue';
import CategoriesView from './features/admin/CategoriesView.vue';
import PostsView from './features/admin/PostsView.vue';
import LoginView from './features/admin/LoginView.vue';
import { store } from './store';
import CreatePostView from './features/admin/CreatePostView.vue';
import EditPostView from './features/admin/EditPostView.vue';
import CreateCategoryView from './features/admin/CreateCategoryView.vue';
import EditCategoryView from './features/admin/EditCategoryView.vue';

const router = createRouter({
   history: createWebHistory(import.meta.env.BASE_URL),
   routes: [
      {
         path: '/',
         name: 'user',
         component: RootLayout,
         children: [
            { path: "", component: HomeView },
            { path: ":id", component: PostView },
         ]
      },
      {
         path: '/admin',
         name: 'admin',
         component: AdminLayout,
         children: [
            { path: "", component: DashboardView },
            { path: "login", component: LoginView },
            {
               path: "categories",
               children: [
                  { path: "", component: CategoriesView },
                  { path: "create", component: CreateCategoryView },
                  { path: ":id", component: EditCategoryView },
               ]
            },
            {
               path: "posts",
               children: [
                  { path: "", component: PostsView },
                  { path: "create", component: CreatePostView },
                  { path: ":id", component: EditPostView },
               ]
            }
            ,
         ]
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
   const isAdminRoute = to.path.startsWith('/admin');

   if (isAdminRoute) {
      try {
         if (!store.user && store.token) {
            await store.fetchUser();
         }

         if (!store.user) {
            if (to.path !== '/admin/login') {
               return next('/admin/login');
            }
         } else {
            if (to.path === '/admin/login') {
               return next('/admin');
            }
         }
      } catch (error) {
         console.error("User fetch failed:", error);
         return next('/admin/login');
      }
   }
   next();
});


export default router;