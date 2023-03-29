import { createRouter, createWebHistory } from "vue-router";
import DisplayStudentListings from "../views/DisplayStudentListings.vue";
import AuthView from "../views/AuthView.vue";
import HomeView from "../views/HomeView.vue";
import TestView from "../views/TestView.vue";
import BaseLayout from "../layouts/BaseLayout.vue";
import TutorListingsView from "../views/TutorListingsView.vue";
import DisplayTutorListings from '@/views/DisplayTutorListings.vue'
import { getCurrentUser } from "../lib/handlers/auth";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: "/", redirect: "/auth" },
    { name: "auth", path: "/auth", component: AuthView },
    {
      path: "/",
      component: BaseLayout,
      children: [
        { name: "home", path: "/home", component: HomeView },
        { name: "student-listings", path: "/student-listings", component: TestView },
        { name: "tutor-listings", path: "/tutor-listings", component: TutorListingsView },
        { name: "me", path: "/me", component: TestView },
        { name: "tutor-id", path: "/tutor/:id", component: TestView },
      ],
      meta: { requiresAuth: true },
    },
  ],
});

router.beforeEach(async (to) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  if (requiresAuth && !(await getCurrentUser())) {
    return { name: "auth" };
  }
});

export default router;
