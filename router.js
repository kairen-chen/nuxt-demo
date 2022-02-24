import Vue from "vue";
import VueRouter from "vue-router";

import Home from "~/pages/Home.vue";
import Pic from "~/pages/Pic.vue";
import PicList from "~/pages/PicList.vue";

Vue.use(VueRouter);

export function createRouter(context) {
  return new VueRouter({
    mode: "history", //可讓#字號消失
    base: "/",
    routes: [
      {
        path: "/",
        name: "Home",
        component: Home,
      },
      {
        path: "/pic",
        name: "PicList",
        component: PicList,
        meta: {
          type: "container",
        },
      },
      {
        path: "/pic/:id",
        name: "Pic",
        component: Pic,
        meta: {
          type: "content",
          lightbox: false,
        },
      },
    ],
  });
}
