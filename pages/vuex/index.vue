<template lang="pug">
  //- slot component:is asyncData await

  section.container
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
    h1  
      a(href = "https://iter01.com/518446.html") ReadMe
    //- async asyncData --> result
    h4(v-for="item in contents") {{item.content}}
      
    //- 使用keepAlive後List內input文字會被保留
    //- include:  標記「需要」被快取的組件名稱 (其餘都不快取)
    //- exclude: 標記「不需」被快取的組件名稱 (其餘全部快取)
    keepAlive(include="VuexEdit")
      component(:is="view")

        VuexEdit(v-show = 'update_show')
        //- component 內有寫 slot的才會有圖！！
        h2(slot='title') slot demo use img
        img(slot='img' src="~/assets/pic_vuex.png")
  
</template>

<script lang="ts">
  import { Vue, Component } from 'nuxt-property-decorator';
  import AppLogo from '~/components/AppLogo.vue';
  import VuexList from '~/components/vuex_list.vue';
  import VuexEdit from '~/components/vuex_edit.vue';
  import bus from '~/components/bus.js';

  interface contents {
    data: Array<item>
  }
  interface item {
    id: number,
    content: string
  }

  @Component({
    components: {
      AppLogo,
      VuexList,
      VuexEdit
    }
  })

  export default class Index extends Vue {

    public update_show: boolean = false;
    public view: string = "AppLogo";

    // computed - Start
    public get contents(): contents {
      return this.$store.state.contents;
    }
    // computed - End

    // lifecycle hooks - Start
    public mounted(): void {
      console.log('測試:從index改變vuex的值,刷新之後會被洗掉－－>',this.$store.state.obj)

      bus.$on('update_show',(flag: any)  => {
          this.update_show = flag;
          flag ? this.changeView("VuexEdit") : this.changeView("VuexList");
      });
      bus.$on('call_method',()  => {
          this.parent_method();
      });
    }  
    // lifecycle hooks - End

    // methods - Start
    public async asyncData (context: { store: any }) {

      await context.store.dispatch('CONTENTS_READ');
      
      //如果不寫compute如果不寫compute也可用以下紀錄值
      return { 'result': context.store.state.contents }

      // await Promise.all([
      //   store.dispatch('CONTENTS_READ'),
      //   axios.get('http://localhost:4000/contents')
      // ]).catch(res =>{
      //    console.log("@@@@", res)
      // });
    }

    public changeView(c_view: string): void{
      this.view = c_view;
      this.update_show = c_view !== 'VuexList' ? false : false ;
    }

    public parent_method(): void{
      alert('我是父method！！')
    }
      
    // methods - End

    // components: {
    //   AppLogo,
    //   VuexList,
    //   VuexEdit
    // },
    // data(){
    //   return{
    //     update_show:false,
    //     view:'AppLogo'
    //   }
    // },
    // computed:{
    //   contents(){
    //     return this.$store.state.contents
    //   },
    // },
    // async asyncData({store}) {
    //   await store.dispatch('CONTENTS_READ');

    //   //如果不寫compute如果不寫compute也可用以下紀錄值
    //   return { 'result': store.state.contents }

    //   // await Promise.all([
    //   //   store.dispatch('CONTENTS_READ'),
    //   //   axios.get('http://localhost:4000/contents')
    //   // ]).catch(res =>{
    //   //    console.log("@@@@", res)
    //   // });
  	// },
    // created(){},
    // mounted(){
    //   console.log('測試:從index改變vuex的值,刷新之後會被洗掉－－>',this.$store.state.obj)

    //   bus.$on('update_show',(res)  => {
    //       this.update_show = res;
    //       res ? this.changeView("VuexEdit") : this.changeView("VuexList");
    //   });
    //   bus.$on('call_method',()  => {
    //       this.parent_method();
    //   });
    // },
    // methods:{
    //   changeView(c_view){
    //     this.view = c_view;
    //     this.update_show = c_view !== 'VuexList'?false:'';
    //   },
    //   parent_method:()=>{
    //     alert('我是父method！！')
    //   }
    // }
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
