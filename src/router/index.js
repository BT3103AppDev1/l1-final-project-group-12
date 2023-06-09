import { createRouter, createWebHistory } from "vue-router";
import { getCurrentUser } from "../lib/handlers/auth";
import { useAuthStore } from "../stores/authStore";
import BaseLayout from "../layouts/BaseLayout.vue";
import AuthView from "../views/AuthView.vue";
import HomeView from "../views/HomeView.vue";

const StudentListingsView = () => import("../views/StudentListingsView.vue");
const TutorListingsView = () => import("../views/TutorListingsView.vue");
const UserProfileView = () => import("../views/UserProfileView.vue");
const ReviewView = () => import("../views/ReviewView.vue");
const NotFoundView = () => import("../views/NotFoundView.vue");

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: "/", redirect: "/home" },
    { name: "auth", path: "/auth", component: AuthView },
    {
      path: "/",
      component: BaseLayout,
      children: [
        { name: "home", path: "/home", component: HomeView },
        { name: "student-listings", path: "/student-listings", component: StudentListingsView },
        { name: "tutor-listings", path: "/tutor-listings", component: TutorListingsView },
        { name: "profile", path: "/profile", component: UserProfileView },
        { name: "tutor-review", path: "/review/:id", component: ReviewView },
        { path: "/:pathMatch(.*)*", name: "NotFound", component: NotFoundView },
      ],
      meta: { requiresAuth: true },
    },
  ],
});


// navigation guard for authentication
router.beforeEach(async (to) => {
  const authStore = useAuthStore();
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  const currAuth = authStore.user ?? (await getCurrentUser());

  if (requiresAuth && !currAuth) {
    return {
      name: "auth",
      query: { redirect: to.fullPath },
    };
  }

  if (!authStore.user && currAuth) {
    authStore.setUser(currAuth);
  }
});

export default router;
