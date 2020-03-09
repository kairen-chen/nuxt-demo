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
        <a href="#" @click.prevent="changeView('VuexEdit')">Edit</a>
      </li>
    </ul>


    h1(style="display:none;" v-for="item in result") {{item.content}}
    //- AppLogo
    //- VuexList
    //-   //- slot demo
    //-   h2 slot demo use img
    //-   img(src="~/assets/pic_vuex.png")
    //- VuexEdit(v-show = 'update_show')

    //使用keepAlive後List內input文字會被保留
    //- include:  標記「需要」被快取的組件名稱 (其餘都不快取)
    //- exclude: 標記「不需」被快取的組件名稱 (其餘全部快取)
    keepAlive(include="VuexEdit")
      component(:is="view")
        VuexEdit(v-show = 'update_show')
        //- component 內有寫 slot的才會有圖！！
        h2 slot demo use img
        img(src="~/assets/pic_vuex.png")



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
      console.log('測試:從index改變vuex的值,刷新之後會被洗掉－－>',this.$store.state.obj)

      bus.$on('update_show',(res)  => {
          this.update_show = res;
          bus.obj = {a:'456'};
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
