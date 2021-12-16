<template>
  <router-view ></router-view>
</template>
<script>
// import Header from "@/components/admin/layoutUnit/Header.vue";

export default {
  components: {
    // Header,
    // Footer,
  },
  data() {
    return { 
      // loginStatus:false
    };
  },
  created() {
    if (process.client) {
      // console.log('xxx')
      // document.addEventListener("gesturestart", (event) => {
      //   event.preventDefault();
      // });
      // this._imageDataInit();
    }
  },
  mounted() {
    // console.log('zzz')
    // this.$store.dispatch("delToken");

    // 原: this.$store.state.service.authToken.send()
    
  },
  watch: {

  },
  method: {

  }
};
</script>

<style lang="scss">
// @import "@/assets/scss/layout/backend.scss";

// .layout-footer-center{
//     text-align: center;
// }

</style>
