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
  middleware: ["routeAuth", "getEnv"],
  data() {
    return { Route: {}, GTMID: this.$store.state.env.data.GTM_ID };
  },
  created() {
    if (process.client) {
      document.addEventListener("gesturestart", (event) => {
        event.preventDefault();
      });

      (function(w, d, s, l, i) {
        w[l] = w[l] || [];
        w[l].push({
          "gtm.start": new Date().getTime(),
          event: "gtm.js",
        });
        var f = d.getElementsByTagName(s)[0],
          j = d.createElement(s),
          dl = l != "dataLayer" ? "&l=" + l : "";
        j.async = true;
        j.src = "https://www.googletagmanager.com/gtm.js?id=" + i + dl;
        f.parentNode.insertBefore(j, f);
      })(window, document, "script", "dataLayer", this.GTMID);
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
