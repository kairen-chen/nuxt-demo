<template>
  <div class="layout">
    <Header />
    <transition name="fade" mode="out-in">
      <router-view :key="$route.path"></router-view>
    </transition>
    <Footer class="layout-footer-center"><a href="mailto:TWMSBD@taiwanmobile.com">聯絡我們</a> | <router-link :to="{ name: 'footerPrivacy' }" target="_blank"> 隱私權政策 </router-link> | <router-link :to="{ name: 'footerTos' }" target="_blank"> 服務條款 </router-link></Footer>
  </div>
</template>
<script>
import Header from "@/components/admin/layoutUnit/Header.vue";

export default {
  components: {
    Header,
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
@import "@/assets/scss/layout/backend.scss";

.layout-footer-center{
    text-align: center;
}

</style>
