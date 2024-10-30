import Vue from "vue";
import VueRouter from "vue-router";
import store from "@/store";

const AppealsView = () => import("@/views/AppealsView.vue");
const LoginView = () => import("@/views/LoginView.vue");

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "appeals",
    component: AppealsView,
    beforeEnter: (to, from, next) => {
      if (!store.getters.isAuthenticated) {
        next({ name: "login" });
      } else {
        next();
      }
    },
  },
  {
    path: "/login",
    name: "login",
    component: LoginView,
    beforeEnter: (to, from, next) => {
      if (store.getters.isAuthenticated) {
        next({ name: "appeals" });
      } else {
        next();
      }
    },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
