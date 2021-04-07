import Vue from "vue";
import VueRouter from 'vue-router';

import Index from "~/pages/index.vue";
import Vuex from "~/pages/vuex/index.vue";
import ErrorPage from "~/pages/_product/index.vue";

Vue.use(VueRouter)
export function createRouter(context) {
  return new VueRouter({
    mode: 'history',//可讓#字號消失
    base: "/",
    routes:[
      {
        path:`/:random`,
        name:'404_page',
        component:ErrorPage
      },
      {
        path:'/vuex',
        name:'vuex',//route的變數
        component:Vuex//管理的意義,重用的意義
      },
      {
        path:'/',
        name: "Index",
        component: Index
      }
    ]
  })
}

