  <template lang="pug">
    <section>
      .title  ～AppLogo Component～
      .VueToNuxtLogo(@click='redirect')
        .Triangle.Triangle--two
        .Triangle.Triangle--one
        .Triangle.Triangle--three
        .Triangle.Triangle--four
      .text  父傳子 -->  {{msg}}
      .links(v-show="btn_flag")
        a.button--green(href="javascript:;" @click="changeTitle") 可透過我改變父值
      .text(v-show="btn_flag")  子傳子 -->  {{child_to_child}}
    </section>
  </template>


  <script>
    // import bus from '~/components/bus.js';
    import icon from '~/assets/test.jpg';

    export default {
      head () {
        return {
          meta: [
            { hid: 'description', name: 'description', content: this._props.msg }
          ],
          link:[
             { rel: 'icon', type: 'image/x-icon', href: icon }
          ]
        }
      },
      name:'AppLogo',
      props:{
        msg: String,
      },
      data(){
        return{
          compoent_msg:'我是子組件傳過來的值',
          btn_flag:0,
          child_to_child:''
        }
      },
      created(){
        var _that = this;
        _that.route_match();
        bus.$on('com1',function(res){
           _that.child_to_child=res;
        });
      },
      mounted(){},
      methods:{
        redirect(){
          // window.location.href= '/';
          this.$router.push({path:`/`});
          // this.$router.replace({path:`/`});
        },
        changeTitle:function(){
              this.$parent.$emit('changemag',this.compoent_msg+',透過(emit,on)修改_PI.vue 的 PI_msg')
        },
        route_match(){
          this.btn_flag = this.$router.history.current.name.toString().match('product-PI')? 1:0;
        }
      }
    }
  </script>


  <style lang="scss" scoped>
    section{
      border: 2px dashed #d6a7c5;
      margin-bottom: 10px;
      margin-right: 10px;
      .title{
        color: red;
        font-size: 24px;
      }
      .text{
        color: #ec00bf;
      }
      .VueToNuxtLogo {
        display: inline-block;
        animation: turn 2s linear forwards 1s;
        transform: rotateX(180deg);
        position: relative;
        overflow: hidden;
        height: 180px;
        width: 245px;
      }

      .Triangle {
        position: absolute;
        top: 0;
        left: 0;
        width: 0;
        height: 0;
      }

      .Triangle--one {
        border-left: 105px solid transparent;
        border-right: 105px solid transparent;
        border-bottom: 180px solid #41B883;
      }

      .Triangle--two {
        top: 30px;
        left: 35px;
        animation: goright 0.5s linear forwards 3.5s;
        border-left: 87.5px solid transparent;
        border-right: 87.5px solid transparent;
        border-bottom: 150px solid #3B8070;
      }

      .Triangle--three {
        top: 60px;
        left: 35px;
        animation: goright 0.5s linear forwards 3.5s;
        border-left: 70px solid transparent;
        border-right: 70px solid transparent;
        border-bottom: 120px solid #35495E;
      }

      .Triangle--four {
        top: 120px;
        left: 70px;
        animation: godown 0.5s linear forwards 3s;
        border-left: 35px solid transparent;
        border-right: 35px solid transparent;
        border-bottom: 60px solid #fff;
      }
    }


    @keyframes turn {
      100% {
        transform: rotateX(0deg);
      }
    }

    @keyframes godown {
      100% {
        top: 180px;
      }
    }

    @keyframes goright {
      100% {
        left: 70px;
      }
    }

  </style>
