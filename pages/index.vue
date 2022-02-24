  <template lang="pug">

  section.container
    div



 
      .links
        nuxt-link.button--grey(:to="{name:'vuex'}") n-link-VUEX

  </template>


  <script>
    // import AppLogo from '~/components/AppLogo.vue';

    export default {
      components: {
        // AppLogo
      },
      data(){
        return{
          title:'Plugin',
          
        }
      },
      created(){},
      mounted(){
     
      },
      methods:{

      }
    }
  </script>


  <style lang="scss" scoped>
    //-引入外部css
    @import '~/assets/main.scss';

  </style>
