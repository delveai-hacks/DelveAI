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
import PasswordEmail from "@/views/app/password/PasswordEmail.vue";
import PasswordEmailVerify from "@/views/app/password/PasswordEmailVerify.vue";
import NewPassword from "@/views/app/password/NewPassword.vue";

import ErrorPage from "@/views/ErrorPage.vue";
import ComingSoon from "@/views/ComingSoon.vue";

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
      path: "/forgot-password",
      name: "passwordemail",
      component: PasswordEmail,
    },
    {
      path: "/forgot-password-verify",
      name: "passwordemailverify",
      component: PasswordEmailVerify,
    },
    {
      path: "/new-password",
      name: "newpassword",
      component: NewPassword,
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
    {
      path: "/coming-soon",
      name: "coming-soon",
      component: ComingSoon,
    },
    {
      path: "/:pathMatch(.*)*",
      name: "NotFound",
      component: ErrorPage,
    },
  ],
});

export default router;
