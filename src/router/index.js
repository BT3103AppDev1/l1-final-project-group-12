import { createRouter, createWebHistory } from "vue-router";
import BaseLayout from "../layouts/BaseLayout.vue";
import AuthView from "../views/AuthView.vue";
import HomeView from "../views/HomeView.vue";
import MyProfileView from "../views/MyProfileView.vue";
import StudentListingsView from "../views/StudentListingsView.vue";
import TutorListingsView from "../views/TutorListingsView.vue";
import CreateTutorProfile from "../views/CreateTutorProfile.vue";
import TestView from "../views/TestView.vue";
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
        { name: "student-listings", path: "/student-listings", component: StudentListingsView },
        { name: "tutor-listings", path: "/tutor-listings", component: TutorListingsView },
        { name: "profile", path: "/profile", component: MyProfileView },
        { name: "tutor-id", path: "/tutor/:id", component: TestView },
        { name: "tutor-profile", path: "/tutorprofile", component: CreateTutorProfile },
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
