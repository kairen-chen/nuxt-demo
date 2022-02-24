<template>
  <section>
    <div>
      <h1>PicList</h1>
      <router-link class="pic" to="/pic/1">1</router-link>
      <router-link class="pic" to="/pic/2">2</router-link>
    </div>
  </section>
</template>

<script>
export default {
  components: {
    // AppLogo
  },
  data() {
    return {};
  },
  created() {},
  mounted() {},
  methods: {},
  beforeRouteLeave(to, from, next) {
    if (from.matched.length) {
      const fromMatch = from.matched[0];
      const toMatch = to.matched[0];
      let defaultComponent = null;

      // 處理前一個
      if (fromMatch.meta.type === "container" && to.meta.type === "content") {
        defaultComponent = fromMatch.components.default;
      } else if (fromMatch.components.lightbox) {
        defaultComponent = fromMatch.components.default;
        fromMatch.components.default = fromMatch.components.lightbox;
        fromMatch.components.lightbox = null;
        fromMatch.meta.lightbox = false;
      }

      // 處理下一個
      if (defaultComponent && to.meta.type === "content") {
        //modify bug way1
        if (!toMatch.components.lightbox) {
          //  lightbox是建構在default.vue的router-view name
          toMatch.components.lightbox = toMatch.components.default;
        }
        // toMatch.components.lightbox = Pic; // modify bug way2
        toMatch.components.default = defaultComponent;
        to.meta.lightbox = true;
      }
    }
    next();
  },
};
</script>

<style lang="scss" scoped>
.pic {
  display: inline-block;
  width: 150px;
  height: 100px;
  border: 2px solid;
  margin: 0 10px;
}
</style>
