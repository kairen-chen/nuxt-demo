  <template lang="pug">
    .container
      .inline
        app-logo(msg="產品頁")
        com1
      div /資料目錄為固定(product)／{{$route.params.PI}}
      div#getID shop_id = {{$route.query.shop_id}}
      div#getID {{PI_msg}}

  </template>


  <script>
    import AppLogo from '~/components/AppLogo.vue';
    import com1 from '~/components/component1.vue';
    export default {
      components: {
        AppLogo,
        com1
      },
      data () {
        return {
          title: 'Hello World!',
          PI_msg: '產品頁'
        }
      },
      created(){
        this.$on('changemag',function(res){
             this.PI_msg=res;
        });
      }
    }
  </script>


  <style lang="scss" scoped>
    .container{
          flex-direction: column;
          #getID{
            color: red;
          }
          .inline{
            display: inline-flex;
          }
    }
  </style>
