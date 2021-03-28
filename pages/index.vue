<!--本專案已由AppLogo.vue @import bootstrap-->
<!-- <link rel="stylesheet" href="~/assets/main.scss"> -->
  <template lang="pug">

  section.container
    div

      //-vue component傳值----start

      //- app-logo(msg="首頁")
      app-logo(:msg="'data:'+title")

      //-vue component傳值----extend

      h1.title {{title}}
      ol.subtitle
        li( v-for ="item in skill_arr" ) {{item}}

      router-link.button--grey(:to="{path:'/product/'+PItest, query: {shop_id:shop_id }}") router-link-產品頁

      n-link.button--grey(:to="{name:'product-PI',params: { PI:'P2-'+this.PItest } , query: {shop_id:shop_id }}")
        span
          | n-link-產品頁
          | 字太多用 '|'組
          //- a.button--grey(:href="'/product/'+PItest+'?shop_id='+shop_id" target="_self") 產品頁
      nuxt-link.button--grey(:to="{name:'vuex'}") n-link-VUEX

      .links
        a.button--green(href="/random/PI12374878744344" target="_self") (第二層名稱可變動)
      .links
        a.button--green(href="/random" target="_self") 別亂跑

      .links
        a.button--green(href=" https://peterhpchen.github.io/VuejsQuest/basic/08_Watcher.html#%E4%BB%8B%E7%B4%B9" target="_self") 勇者鬥 Vue 龍

      .links
        a.button--green(href=" https://medium.com/@dontz1230/nuxt-asyncdata-api-%E7%94%9F%E5%91%BD%E9%80%B1%E6%9C%9F-b8bf01c2ae26" target="_self") nuxt life cycle
      
      .test.button--green(@click = 'test')
        img(src="~/assets/logo/logo.png")

      div bootstrap demo 哈哈夾雜著(pug + html)也行-->
      <div class="progress">
        <div class="progress-bar bg-success" role="progressbar" style="width: 78%" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
      </div>

      //-  scss function demo
      <div class="level0">0</div>
      <div class="level1">1</div>
      <div class="level2">2</div>
      <div class="level3">3</div>
      <div class="level4">4</div>
      <div class="level5">5</div>
  </template>


  <script>
    import AppLogo from '~/components/AppLogo.vue';
    import skill from '~/components/skill.js';

    export default {
      head: {
        script: [
          // {src: '~/assets/tap.js', ssr: false }

        ]
      },
      components: {
        AppLogo
      },
      data(){
        return{
          title:'Plugin',
          PItest:'PI2019012933900',
          shop_id:'app',
          skill_arr:skill()
        }
      },
      created(){},
      mounted(){
        //改變vuex值
        this.$store.commit('change_obj','kairen');
      },
      methods:{
        test(){
          alert(this.$route.name)
          this.skill_arr.map((val,key) => console.log(key,val));
        }
      }
    }
  </script>


  <style lang="scss" scoped>
    //-引入外部css
    @import '~/assets/main.scss';

  </style>
