<template lang='pug'>

  section.container
    app-logo
    div#getID 別亂跑

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
