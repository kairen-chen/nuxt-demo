<template>
  <transition name="fade" mode="out-in">
    <div
      class="topContainer"
      v-show="flag"
      @click="toTop"
      :style="{ bottom: bottom + 'px' }"
    >
      <img class="icon" src="@/assets/images/header/back_btn.svg" alt="" />
    </div>
  </transition>
</template>
<script>
export default {
  data() {
    return {
      flag: false,
      bottom: 20,
    };
  },
  mounted() {
    if (process.client) {
      this.handler();
      window.addEventListener("scroll", this.debounce(this.handler));
    }
  },
  methods: {
    handler() {
      let scrollTop = 0,
        wrapperHeight = 0;
      scrollTop =
        document.documentElement.scrollTop ||
        window.pageYOfset ||
        document.body.scrollTop;
      wrapperHeight = document.querySelector(".default_layout").clientHeight;
      if (scrollTop > 300) {
        this.bottom = 20;
        if (scrollTop + window.innerHeight >= wrapperHeight - 50) {
          this.bottom = 110;
        }
        return (this.flag = true);
      }
      return (this.flag = false);
    },
    toTop() {
      window.scrollTo({ top: 0, behavior: "smooth" });
      this.flag = false;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/components/member/common.scss";
.topContainer {
  position: fixed;
  right: 30px;
  bottom: 20px;
  width: 42px;
  height: 42px;
  border: 1px solid map-get($color, "Gary30");
  background-color: map-get($color, White);
  border-radius: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
  cursor: pointer;
  transition: bottom 0.5s;
  .icon {
    font-size: 20px;
    font-weight: bold;
    color: map-get($color, "Orange10");
  }
}
</style>
