import {
  createMemoryHistory,
  createRouter,
  createWebHistory,
} from "vue-router";

import SignUp from "@/views/SignUp.vue";
import SignIn from "@/views/SignIn.vue";
import Home from "@/views/Home.vue";

const routes = [
  { path: "/", component: Home },
  { path: "/signup", component: SignUp },
  { path: "/signin", component: SignIn },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
