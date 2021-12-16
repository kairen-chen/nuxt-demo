<template>
  <transition-group appear name="fade" class="waterfall" tag="div">
    <slot />
  </transition-group>
</template>

<style lang="scss" scoped>
@import "@/assets/scss/common/_variableAndUtility.scss";
@import "@/assets/scss/common/_rwd.scss";
.waterfall {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  @include BreakPointLarge {
    justify-content: flex-start;
  }
}
</style>
