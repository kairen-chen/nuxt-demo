<template>
  <div
    v-if="dataLength > 0 && !loadingFlag"
    class="readMore"
    :class="dataLength < count ? 'active' : ''"
    @click="$emit('readMore')"
    v-prevent-re-click
  >
    Read more
  </div>
</template>

<script>
export default {
  props: ["dataLength", "searchStrGetter", "count", "loadingFlag"],
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/common/_common.scss";
.readMore {
  display: none;
  cursor: pointer;
  background-image: linear-gradient(
    to right,
    map-get($color, "Orange10"),
    map-get($color, "Orange20")
  );
  color: map-get($color, White);
  padding: 5px 20px;
  border-radius: 25px;
  font-weight: bold;
  &.active {
    display: inline-block;
  }
}
</style>
