import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("../views/HomeView.vue"),
    },
    {
      path: "/characters",
      name: "characters",
      component: () => import("../views/CharactersView.vue"),
    },
    {
      path: "/characters/details/:hero_name",
      name: "details",
      component: () => import("../views/DetailsView.vue"),
    },
  ],
});

export default router;
