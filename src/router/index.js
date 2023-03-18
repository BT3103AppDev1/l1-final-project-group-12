import { createRouter, createWebHistory } from "vue-router";
import AuthView from "../views/AuthView.vue";
import HomeView from "../views/HomeView.vue";
import TestView from "../views/TestView.vue";
import BaseLayout from "../layouts/BaseLayout.vue";
import LookForStudent from "../views/LookForStudent.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: "/", redirect: "/home" },
    { name: "home", path: "/home", component: HomeView },
    { name: "auth", path: "/auth", component: AuthView },
    {
      path: "/",
      component: BaseLayout,
      children: [
        { name: "student-listings", path: "/student-listings", component: LookForStudent },
        { name: "tutor-listings", path: "/tutor-listings", component: TestView },
        { name: "me", path: "/me", component: TestView },
        { name: "tutor-id", path: "/tutor/:id", component: TestView },
      ],
    },
  ],
});

export default router;
