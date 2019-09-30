<template lang="pug">

section.container
  div
    AppLogo
    img(src="~/assets/pic_vuex.png")

    VuexList
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
