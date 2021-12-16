<template>
  <div class="default_layout">
    <client-only>
      <noscript
        ><iframe
          :src="`https://www.googletagmanager.com/ns.html?id=${GTMID}`"
          height="0"
          width="0"
          style="display:none;visibility:hidden"
        ></iframe
      ></noscript>
    </client-only>
    <Header />
    <transition name="fade" mode="out-in">
      <router-view :route="Route"></router-view>
    </transition>
    <PageLoading />
    <ToTop />
    <Footer />
  </div>
</template>
<script>
import GTMID from "@/plugins/common/GTM";
import Header from "@/components/layoutUnit/Header.vue";
import Footer from "@/components/layoutUnit/Footer.vue";
import ToTop from "@/components/unit/ToTop.vue";
import PageLoading from "@/components/layoutUnit/PageLoading.vue";

export default {
  components: {
    Header,
    Footer,
    ToTop,
    PageLoading,
  },
  middleware: "routeAuth",
  data() {
    return { Route: {}, GTMID };
  },
  created() {
    if (process.client) {
      document.addEventListener("gesturestart", (event) => {
        event.preventDefault();
      });
    }
  },
  watch: {
    $route(to, from) {
      this.Route = { to, from };
    },
  },
};
</script>

<style lang="scss" scoped>
.layout {
  background-color: white;
}
</style>
