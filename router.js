import Vue from 'vue'
import Router from 'vue-router'
import List from './components/vuex_list'
import Edit from './components/vuex_edit'

Vue.use(Router)

export default new Router({
  mode: 'history',//可讓#字號消失
  routes:[
    {
      path:'/vuex/list',
      name:'list',//route的變數
      component:List//管理的意義,重用的意義
    },
    {
      path:'/vuex/update/:id',
      name:'update',
      component:Edit
    },
    // {
    //   path:'*',
    //   redirect:'/'
    // }
  ]
})
