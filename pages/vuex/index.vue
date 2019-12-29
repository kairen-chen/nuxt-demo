<template lang="pug">
//- slot component:is asyncData await
section.container
  div

    <ul class="nav">
      <li>
        <a href="#" @click.prevent="changeView('AppLogo')">home</a>
      </li>
      <li>
        <a href="#" @click.prevent="changeView('VuexList')">posts</a>
      </li>
      <li>
        <a href="#" @click.prevent="changeView('VuexEdit')">archieve</a>
      </li>
    </ul>

    h1(style="display:none;" v-for="item in result") {{item.content}}

    component(:is="view")
    AppLogo
    VuexList
      //- slot demo
      h2 slot demo use img
      img(src="~/assets/pic_vuex.png")
    VuexEdit(v-show = 'update_show')

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
        update_show:false
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
      parent_method:()=>{
        alert('我是父method！！')
      }
    }
  }
</script>

<style lang="scss" scoped>
  section{
    margin:0 auto;
    img{
      margin: 20px 0;
    }
  }

</style>
