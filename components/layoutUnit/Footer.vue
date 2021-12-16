<template>
  <div class="footerContainer">
    <ul>
      <li>
        <router-link :to="{ name: 'footerAbout' }"> 關於我們 </router-link>
      </li>
      <li>
        <router-link :to="{ name: 'footerJoin' }"> 成為夥伴 </router-link>
      </li>
      <li>
        <router-link :to="{ name: 'footerFaq' }"> 常見問題 </router-link>
      </li>
      <li>
        <a href="mailto:TWMSBD@taiwanmobile.com">聯絡我們</a>
      </li>
      <li>
        <router-link :to="{ name: 'footerDownload' }"> 下載App </router-link>
      </li>
      <li>
        <router-link :to="{ name: 'footerPrivacy' }"> 隱私權政策 </router-link>
      </li>
      <li>
        <router-link :to="{ name: 'footerTos' }"> 服務條款 </router-link>
      </li>
      <li>
        <a
          href="https://www.facebook.com/pages/%E5%BE%AE%E6%A8%82%E5%BF%97%E5%B7%A5/395646150622221"
        >
          <img src="https://www.isharing.tw/static/images/fb.png" />
          <span>粉絲頁</span>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    // msg: String,
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/common/_common.scss";

.footerContainer {
  width: 100%;
  margin: 0 auto;
  font-size: 14px;
  background-image: linear-gradient(
    to right,
    map-get($color, "Orange10"),
    map-get($color, "Orange20")
  );
  @include BreakPointLarge {
    padding: 20px 0;
  }
  ul {
    display: flex;
    align-items: center;
    width: 100%;
    flex-wrap: wrap;
    padding: 40px 0 20px;
    @include BreakPointLarge {
      padding: 0;
      margin: 0 auto;
      flex-direction: row;
      width: map-get($breakPoint, large);
      flex-wrap: nowrap;
    }
  }
  li {
    position: relative;
    height: 15px;
    width: calc(100% / 4);
    padding: 10px 0;
    margin-bottom: 16px;
    @include BreakPointLarge {
      width: 100%;
      margin: 0;
    }
    &:not(:first-child) {
      border-left: 1px solid map-get($color, White);
    }
    &:nth-child(5n) {
      border-left: 0;
      @include BreakPointLarge {
        border-left: 1px solid map-get($color, White);
      }
    }
  }
  a {
    display: block;
    color: map-get($color, White);
    padding: 5px 0;
    width: 100%;
    position: absolute;
    margin: 0 auto;
    left: 0;
    range: 0;
    top: -6px;
    img {
      position: relative;
      top: 2px;
      left: -7px;
      width: 18px;
    }
  }
}
</style>
