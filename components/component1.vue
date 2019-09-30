<template lang="pug">
  <section>
    .title ～component1～  {{msg}}
    .img_container
    .links(v-show="btn_flag")
      a.button--green(href="javascript:;" @click="changeTitle") 可透過我改變AppLogo Component
  </section>
</template>


<script>
  // import bus from '~/components/bus.js';
  
  export default {
    name:'com1',
    props:{
      msg: String,
    },
    data(){
      return{
        component1_msg:'透過(eventbus)component1傳過來的值',
        btn_flag:0
      }
    },
    created(){
      this.route_match();
    },
    mounted(){
        console.log('vue : ',bus)
    },
    methods:{
      changeTitle:function(){
          bus.$emit('com1',this.component1_msg)
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
    padding: 0 10px;
    .title{
      color: red;
      font-size: 24px;
    }
    .title{
      color: red;
      font-size: 24px;
    }
    .img_container{
      height: 200px;
      background-position: center;
      background-repeat: no-repeat;
      background-size: contain;
      background-image: url("~assets/test.jpg");
    }
    .text{
      color: #ec00bf;
    }
  }
</style>
