<template lang="pug">

section.container
  div
    app-logo
    img(src="~/assets/pic_vuex.png")
</template>

<script>
  import AppLogo from '~/components/AppLogo.vue';
  export default {
    components: {
      AppLogo
    },
    data(){
      return{

      }
    },
    mounted(){},
    methods:{

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
