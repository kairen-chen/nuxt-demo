import Vue from "vue";
import VueRouter from 'vue-router';

import Index from "~/pages/index.vue";

Vue.use(VueRouter)
export function createRouter(context) {
  return new VueRouter({
    mode: 'history',//可讓#字號消失
    base: "/",
    routes:[
      {
        path:'/',
        name: "Index",
        component: Index
      }
    ]
  })
}

