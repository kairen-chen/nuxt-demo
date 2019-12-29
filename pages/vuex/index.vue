<template lang="pug">
//- slot component:is asyncData await
section.container
  div

    <ul class="nav">
      <li>
        <a href="#" @click.prevent="changeView('AppLogo')">AppLogo</a>
      </li>
      <li>
        <a href="#" @click.prevent="changeView('VuexList')">List</a>
      </li>
      <li>
        <a href="#" @click.prevent="changeView('VuexEdit')">使用 keep-alive 保留表單狀態</a>
      </li>
    </ul>

    h1(style="display:none;" v-for="item in result") {{item.content}}

    //- AppLogo
    //- VuexList
    //-   //- slot demo
    //-   h2 slot demo use img
    //-   img(src="~/assets/pic_vuex.png")
    //- VuexEdit(v-show = 'update_show')

    //- 由於被快取的組件已經不會被摧毀，因此重新顯示的時候並不會觸發 mounted 事件，我們可以透過 activated 與 deactivated  兩個新事件作為組件顯示及離開的觸發時機。
    <keep-alive include="VuexEdit">
      component(:is="view")
        //- VuexEdit(v-show = 'update_show')
        //- component 內有寫 slot的才會有圖！！
        h2 slot demo use img
        img(src="~/assets/pic_vuex.png")
    </keep-alive>



</template>

<script>
  import AppLogo from '~/components/AppLogo.vue';
  import VuexList from '~/components/vuex_list.vue';
  import VuexEdit from '~/components/vuex_Edit.vue';

  export default {
    components: {
      AppLogo,
      VuexList,
      VuexEdit
    },
    data(){
      return{
        update_show:false,
        view:'AppLogo'
      }
    },
    async asyncData({store}) {
      await store.dispatch('CONTENTS_READ');

  		let { data } = await axios.get('http://localhost:4000/contents');
      return { 'result': data }

      // return await Promise.all([
      //   store.dispatch('CONTENTS_READ'),
      //   axios.get('http://localhost:4000/contents')
      // ]).catch(res =>{
      //   console.log('error',res)
      // });

  	},
    created(){},
    mounted(){
      bus.$on('update_show',(res)  => {
          this.update_show = res;
      });
      bus.$on('call_method',()  => {
          this.parent_method();
      });
    },
    methods:{
      changeView(c_view){
        this.view = c_view;
        this.update_show = c_view !== 'VuexList'?false:'';
      },
      parent_method:()=>{
        alert('我是父method！！')
      }
    }
  }
</script>

<style lang="scss" scoped>
  section{
    display: block;
    margin:0 auto;
    img{
      margin: 20px 0;
    }
    .nav{
      li{
        border:1px solid gray;
        border-radius: 10px;
        padding: 10px;
      }
    }
  }

</style>
