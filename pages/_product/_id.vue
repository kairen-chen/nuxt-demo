<template lang='pug'>

  section.container
    app-logo
    div#getID / {{$route.params.product}} (在URl隨便輸入試試) / {{$route.params.id}}

</template>

<script type="text/javascript">
  import AppLogo from '~/components/AppLogo.vue';
  export default {
    components: {
      AppLogo
    }
  }
</script>
<style lang="scss" scoped>
  .container{
        flex-direction: column;
        #getID{
          color: red;
        }
  }
</style>
