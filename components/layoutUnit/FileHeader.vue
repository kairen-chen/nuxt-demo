<template>
  <div class="fileHeaderContainer">
    <div class="goBack" @click="goBack">
      <Icon type="ios-arrow-round-back" />
    </div>
    <span class="title">{{ title }}</span>
  </div>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default: "傳字串給我",
    },
    route: {
      type: Object,
    },
  },
  data() {
    return {
      header_route: null,
    };
  },
  watch: {
    route: {
      immediate: true,
      handler(res) {
        if (process.client) {
          window.addEventListener("popstate", this.goBack);
        }
        this.header_route = res;
      },
    },
  },
  methods: {
    async goBack() {
      let url = "";
      if (Object.keys(this.header_route).length) {
        if (
          this.header_route.from.name &&
          this.header_route.from.name == "eventUnit"
        ) {
          url = this.header_route.to.matched[0].path;
        } else {
          url = this.header_route.from.fullPath;
        }
      } else {
        url = this.$route.matched[0].path;
      }

      await this.$router.push(url).catch(() => {});
    },
  },
  destroyed() {
    setTimeout(() => {
      window.removeEventListener("popstate", this.goBack);
    });
  },
};
</script>
<style lang="scss">
@import "@/assets/scss/common/_variableAndUtility.scss";
@import "@/assets/scss/common/_rwd.scss";

.fileHeaderContainer {
  display: flex;
  position: fixed;
  width: 100%;
  height: 50px;
  justify-content: center;
  align-items: center;
  background-color: map-get($color, "Orange10_opacity");
  z-index: 1;
  @include BreakPointLarge {
    display: none;
  }
  .title {
    font-size: 20px;
    color: map-get($color, White);
  }
  .goBack {
    position: absolute;
    left: 0;
    i {
      color: map-get($color, White);
      font-size: 40px;
      font-weight: 2;
    }
  }
}
</style>
