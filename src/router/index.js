import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Inner from "../views/Inner.vue";
import Outer from "../views/Outer.vue";
import Inside from "../views/Inside.vue";
import Subjects from "../views/Subjects.vue";
import Settings from "../views/Settings.vue";

Vue.use(VueRouter);

const routes = [
   {
      path: "/",
      name: "Home",
      component: Home,
   },
   {
      path: "/inner",
      name: "Inner",
      component: Inner,
   },
   {
      path: "/outer",
      name: "Outer",
      component: Outer,
   },
   {
      path: "/inside",
      name: "Inside",
      component: Inside,
   },
   {
      path: "/subjects",
      name: "Subjects",
      component: Subjects,
   },
   {
      path: "/settings",
      name: "Settings",
      component: Settings,
   },
];

const router = new VueRouter({
   routes,
});

export default router;
