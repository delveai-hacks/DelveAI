import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
//@ts-ignore
import LandingPage from "../views/home/LandingPage.vue";
//@ts-ignore
import SignUp from "@/views/app/SignUp.vue";
//@ts-ignore
import LogIn from "@/views/app/LogIn.vue";
//@ts-ignore
import VerifyEmail from "@/views/app/VerifyEmail.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: LandingPage,
    },
    {
      path: "/create-account",
      name: "signup",
      component: SignUp,
    },
    {
      path: "/verify-email",
      name: "email-verification",
      component: VerifyEmail,
    },
    {
      path: "/login",
      name: "login",
      component: LogIn,
    },
    {
      path: "/prompt",
      name: "promptHome",
      component: HomeView,
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/AboutView.vue"),
    },
  ],
});

export default router;
