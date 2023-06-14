<template>
  <div class="container">
    <BreadCrumb />
    <div class="content-event">
      <div class="event-block">
        <h2>關於我們</h2>
        <span style="line-height: 150%">
          台灣大哥大基金會2014年推出全國首創跨網站與APP的微樂志工公益媒合平台，提供公益團體尋找志工人力的管道，也鼓勵全民利用零散時間輕鬆報名做志工。此後陸續新增捐物資、找企業志工、信用卡捐款等功能，使得找志工、募物資、捐善款得以一站完成。<br />
          <br />
          誠摯歡迎全民一起集合「微」小志工力量，替社會創造巨大快「樂」能量，也歡迎公益團體上架微樂志工平台，以科技化方式更快速找到所需的資源！<br />
          <br />
          下載微樂志工APP<br />
          Android版本：<a
            href="https://play.google.com/store/apps/details?id=com.taiwanmobile.volunteers"
            target="_blank"
            >https://play.google.com/store/apps/details?id=com.taiwanmobile.volunteers</a
          ><br />
          iOS版本：<a
            href="https://itunes.apple.com/tw/app/wei-le-zhi-gong/id823341128?l=zh&mt=8"
            target="_blank"
            >https://itunes.apple.com/tw/app/wei-le-zhi-gong/id823341128?l=zh&mt=8</a
          ><br />
          <br />
          ※公益團體成為微樂志工夥伴：<a href="https://www.isharing.tw/join/"
            >https://www.isharing.tw/join/</a
          ><br />
        </span>

        <h2>關於台灣大哥大基金會</h2>
        <span style="line-height: 150%">
          台灣大哥大基金會成立於1999年，以發展電信學術、提升電信科技、促進國際交流、舉辦公益活動為宗旨，結合企業核心資源，投入各項社會、文化、教育、環保活動，持續服務社會、回饋大眾。
          <br />
          <br />
          Email :
          <a href="mailto:TWMSBD@taiwanmobile.com ">TWMSBD@taiwanmobile.com </a
          ><br />
          網址：<a href="http://www.twmf.org.tw">www.twmf.org.tw</a><br />
          FB :
          <a href="https://zh-tw.facebook.com/twmf.org"
            >https://zh-tw.facebook.com/twmf.org</a
          ><br />
        </span>
        <br />

        <span style="line-height: 150%">
          <h2>隱私權政策</h2>
          <router-link :to="{ name: 'footerPrivacy' }">
            {{ `${origin}/privacy` }}</router-link
          >
          <br />
          <h2>服務條款</h2>
          <router-link :to="{ name: 'footerTos' }">
            {{ `${origin}/tos` }}</router-link
          >
        </span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      origin: "",
    };
  },
  mounted() {
    document.getElementsByClassName("loading")[0].style.display = "none";
    this.origin = location.origin;
  },
};
</script>
<style lang="scss" scoped>
@import "@/assets/scss/common/_common.scss";
@import "@/assets/scss/page/footer/common.scss";
</style>
