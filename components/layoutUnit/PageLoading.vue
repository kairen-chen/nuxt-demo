<template>
  <div class="loading">
    <div class="container">
      <div>Loading...</div>
      <img class="loadImg" src="@/assets/images/other/loading.gif" alt="" />
    </div>
    <div class="slotContainer">
      <slot />
    </div>
  </div>
</template>
<script>
export default {};
</script>
<style lang="scss" scoped>
@import "@/assets/scss/common/_common.scss";
.container {
  position: fixed;
  top: 0;
  max-width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
  font-size: 20px;
  font-weight: blod;
  backdrop-filter: blur(10px);
  background-color: map-get($color, "White30_opacity");
  z-index: 12;
  .loadImg {
    width: 20px;
  }
  // @media (prefers-reduced-motion: no-preference) {
  //   .loadImg {
  //     animation: loadinSpin infinite 0.5s linear;
  //   }
  // }
  // @keyframes loadinSpin {
  //   from {
  //     transform: rotate(0deg);
  //   }
  //   to {
  //     transform: rotate(360deg);
  //   }
  // }
}
.slotContainer {
  display: flex;
  flex-direction: column;
  align-items: center;
  @include BreakPointLarge {
    display: block;
    position: relative;
  }
}
</style>
