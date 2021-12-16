<template>
  <div class="container" v-cloak>
    <BreadCrumb :route="route" />
    <div class="mobile" v-if="device === 'mobile'">
      <div class="articleFileContainer ">
        <div class="titleContainer">
          <h1 class="title">
            <div></div>
            {{ eventData.subject }}
          </h1>
        </div>
      </div>
      <Carousel
        class="carouselContent"
        :articleBanner="'articleBanner'"
        :imgData="imgData"
      />
    </div>
    <div class="articleFileContainer">
      <div class="left">
        <div v-if="device === 'deskTop'">
          <div class="titleContainer">
            <h1 class="title">
              <div></div>
              {{ eventData.subject }}
            </h1>
          </div>
          <Carousel
            class="carouselContent"
            :imgData="imgData"
            :articleBanner="'articleBanner'"
          />
        </div>
        <div class="tabContent contentNormalStyle ivu-tabs-container">
          <Tabs
            size="small"
            :animated="false"
            v-model="currentTab"
            @on-click="
              (type) => {
                currentTab = type + '';
              }
            "
          >
            <TabPane
              v-for="item of tabData"
              :key="item.type"
              :name="item.type + ''"
              :label="item.title"
              context-menu
            />
          </Tabs>
        </div>
        <transition name="fade" mode="out-in">
          <div
            v-show="currentTab == 1"
            class="introduceContent contentNormalStyle"
          >
            <div class="title">{{ eventData.npoName }}</div>
            <section v-html="eventData.newDescription"></section>
          </div>
        </transition>
        <!-- <transition name="fade" mode="out-in">
          <div
            v-show="currentTab == 2"
            class="discussContent contentNormalStyle"
          >
            <div class="left">活動分數</div>
            <div class="score">
              <Evaluation :starNum="5" />
              <div>尚未有人評分</div>
            </div>
            <div class="right">無評分</div>
          </div>
        </transition> -->
      </div>
      <div class="right">
        <div class="socialContent contentNormalStyle">
          <a href="javascript:window.print()"><Icon type="md-print" />列印</a>
          <a
            :href="
              `https://twitter.com/intent/tweet?original_referer=${domain}&amp;ref_src=twsrc%5Etfw&amp;text=%E5%BE%AE%E6%A8%82%E5%BF%97%E5%B7%A5&amp;tw_p=tweetbutton&amp;url=${domain}${pathname}`
            "
            class="btn twitter"
            id="b"
            target="_blank"
          >
            <Icon type="logo-twitter" />
            <span class="label" id="l">推文</span></a
          >
          <div class="FB">
            <div
              class="fb-share-button"
              :data-href="getReferer()"
              data-layout="button"
            ></div>
            <!-- 不同樣式data-layout="box_count、button_count、button" -->
          </div>
          <a
            :href="
              `mailto:?subject=${eventData.subject}&amp;body=${eventData.description} ...%0A%0A 詳情請見：${domain}${pathname}`
            "
            target="_blank"
          >
            <Icon type="md-mail" />
            寄給朋友
          </a>
        </div>
        <div class="acitvityInfoContent contentNormalStyle">
          <div class="title">
            {{ eventData.isVolunteerEvent ? "活動資訊" : "物資募集" }}
          </div>
          <div class="detail">
            <div
              class="rowStyle"
              v-for="(item, index) of activeDetail"
              :key="index"
              v-show="item.content"
            >
              <img :src="item.icon" />
              <span class="rowTitle"> {{ item.title }}</span>
              <div class="colon">:</div>
              <div v-if="typeof item.content === 'object'">
                <span
                  v-for="(content, contentIndex) of item.content"
                  :key="contentIndex"
                  >{{ content.name }} <br
                /></span>
              </div>
              <span v-else-if="!item.href">{{ item.content }}</span>
              <span
                class="goTo hrefColor"
                v-else
                :to="{
                  path: item.href,
                }"
                @click="goTo(item.href)"
              >
                {{ item.content }}
              </span>
            </div>
          </div>
          <ChooseUnit :data="eventData" @chooseHandler="chooseHandler" />
        </div>
        <div class="contentNormalStyle">
          <Participate
            :data="eventData"
            :isRegistered="isRegistered"
            :isFocus="isFocus"
            :isJoined="isJoined"
            :isLeaved="isLeaved"
            @focusHandler="resetGetEventsHandler"
            @deleteRegistHandler="deleteRegistHandler"
          />
        </div>
        <div class="contentNormalStyle" v-if="eventData.volunteerTrainingDesc">
          <div class="title">
            {{ eventData.isVolunteerEvent ? "志工須知" : "捐贈須知" }}
          </div>
          <div class="rowStyle" v-html="eventData.volunteerTrainingDesc"></div>
        </div>
        <div class="addressContent contentNormalStyle">
          <div class="title">
            {{ eventData.isVolunteerEvent ? "活動舉辦地點" : "物資募集地點" }}
          </div>
          <!-- <iframe
            width="100%"
            height="300"
            frameborder="0"
            scrolling="no"
            marginheight="0"
            marginwidth="0"
            src="http://maps.google.com.tw/maps?f=q&hl=zh-TW&geocode=&q=台北市新生南路三段90號&z=16&output=embed&t="
          ></iframe> -->
          <div class="rowStyle">
            <img src="https://www.isharing.tw/static/images/place.png" alt="" />
            <a
              :href="
                `https://maps.google.com/?q=${eventData.addressCity}${eventData.address}`
              "
              target="_blank"
            >
              {{ `${eventData.addressCity}${eventData.address}` }}
            </a>
          </div>
        </div>
      </div>
    </div>

    <router-view
      @modalHandler="registSuccessHandler"
      :data="eventData"
      :chooseResult="chooseResult"
    ></router-view>
  </div>
</template>
<script>
import Evaluation from "@/components/unit/Evaluation.vue";
import Carousel from "@/components/iview/Carousel.vue";
import ChooseUnit from "@/components/unit/ChooseUnit.vue";
import Participate from "@/components/unit/Participate.vue";
import { mapGetters } from "vuex";

export default {
  props: ["route"],
  components: {
    Evaluation,
    Carousel,
    ChooseUnit,
    Participate,
  },
  head() {
    return {
      meta: [
        {
          property: "og:url",
          content: this.getReferer(),
        },
        { property: "og:type", content: "website" },
        { property: "og:title", content: this.eventData.subject },
        { property: "og:description", content: this.eventData.description },
        { property: "og:image", content: this.eventData.thumbPath },
        { property: "fb:app_id", content: "292691020832720" },
      ],
      script: [
        {
          hid: "fb",
          src: "https://connect.facebook.net/zh_TW/sdk.js#xfbml=1&version=v3.0",
          defer: true,
          // changed after script load
          callback: () => {
            FB.XFBML.parse();
          },
        },
      ],
    };
  },
  data() {
    return {
      domain: "",
      eventData: {
        // 是否超過報名時間
        overRegisterDateFlag: false,
      },
      activeDetail: [],
      currentTab: "1",
      imgData: [],
      domain: "",
      pathname: "",
      modalShow: false,
      // 活動資訊選項
      chooseResult: "",
      // 關注
      isFocus: false,
      // 紀錄已報名
      isRegistered: "",
      // 已簽到
      isJoined: false,
      // 已簽退
      isLeaved: false,
    };
  },
  computed: {
    ...mapGetters([
      "articleFileDataGetter",
      "profileGetter",
      "webVisibilityGetter",
    ]),
    tabData() {
      return [
        {
          title: "詳細介紹",
          type: 1,
        },
        // {
        //   title: "活動討論",
        //   type: 2,
        // },
      ];
    },
    device() {
      return this.breakPoint > parseInt(this.breakPointLarge, 10)
        ? "deskTop"
        : "mobile";
    },
  },
  watch: {
    eventData: {
      handler() {
        this.imgData = [];
        //==== 圖片處理 start ====
        let i = 1;
        for (i; i <= 5; i++) {
          if (this.eventData[`image${i}`]) {
            //  {
            //   image:"",
            //   alt: "",
            //   href: "",
            // },
            this.imgData.push({ image: this.eventData[`image${i}`] });
          }
        }
        if (this.eventData.resultImages) {
          this.eventData.resultImages.forEach((item) => {
            this.imgData.push({ image: item.image });
          });
        }
        //==== 圖片處理 end ====

        // 詳細介紹文字處理
        this.eventData.newDescription = this.eventData.description.replace(
          /(\r\n)|(\n)/g,
          "</br>"
        );
        // 寄信內容
        this.eventData.description = this.eventData.description
          .replace(/(\r\n)|(\n)/g, "%0A")
          .substr(0, 200);
        // 社群分享網址
        this.domain = location.origin;
        this.pathname = location.pathname;

        // 志工須知
        this.eventData.volunteerTrainingDesc = this.eventData.volunteerTrainingDesc.replace(
          /(\r\n)|(\n)/g,
          "</br>"
        );

        // 是否超過報名時間
        this.eventData.overRegisterDateFlag =
          this.$moment(this.eventData.registerDeadlineDate).valueOf() <=
          this.$moment().valueOf()
            ? true
            : false;

        this.activeDetail = [
          {
            title: `${
              this.eventData.isVolunteerEvent ? "活動開始時間" : "募集開始時間"
            }`,
            icon: "https://www.isharing.tw/static/images/new_event.png",
            content: this.$moment(this.eventData.happenDate).format(
              "YYYY-MM-DD HH:mm"
            ),
          },
          {
            title: `${
              this.eventData.isVolunteerEvent ? "活動結束時間" : "募集結束時間"
            }`,
            icon: "https://www.isharing.tw/static/images/new_event.png",
            content: this.$moment(this.eventData.closeDate).format(
              "YYYY-MM-DD HH:mm"
            ),
          },
          {
            title: `${
              this.eventData.isVolunteerEvent ? "活動地點" : "募集地點"
            }`,
            icon: "https://www.isharing.tw/static/images/place.png",
            content: `${this.eventData.addressCity}${this.eventData.address}`,
          },
          {
            title: `${
              this.eventData.isVolunteerEvent ? "志工需求" : "物資需求"
            }`,
            icon: "https://www.isharing.tw/static/images/required_number.png",
            content: `尚缺 ${this.eventData.requiredVolunteerNum -
              (this.eventData.currentVolunteerNum < 0
                ? 0
                : this.eventData.currentVolunteerNum)} ${
              this.eventData.isVolunteerEvent ? "名" : "件"
            } / 共需 ${this.eventData.requiredVolunteerNum} ${
              this.eventData.isVolunteerEvent ? "名" : "件"
            }`,
          },
          {
            title: `${
              this.eventData.isVolunteerEvent ? "活動類型" : "募集類型"
            }`,
            icon: "https://www.isharing.tw/static/images/volunteer_type.png",
            content: this.eventData.volunteerType,
          },
          {
            title: "志工時數",
            icon: "https://www.isharing.tw/static/images/event_hour.png",
            content: this.eventData.isVolunteerEvent
              ? `${this.eventData.eventHour + " 小時"} `
              : null,
          },
          {
            title: "主辦單位",
            icon: "https://www.isharing.tw/static/images/npo_icon.png",
            content: `${this.eventData.npoName}`,
            href: `/npo/${this.eventData.npoId}`,
          },
          {
            title: "合作NPO",
            icon: "https://www.isharing.tw/static/images/npo_icon.png",
            content: this.eventData.cooperationNpos,
          },
        ];
      },
    },
    profileGetter: {
      immediate: true,
      handler() {
        this.getFocus();
        if (this.isRegistered !== "") this.getRegistered();
        this.postEvent();
      },
    },
    webVisibilityGetter: {
      handler(flag) {
        if (flag) {
          this.$set(this, "isFocus", false);
          this.$set(this, "isRegistered", false);
          this.getEvents();
        }
      },
    },
    articleFileDataGetter: {
      immediate: true,
      handler() {
        if (this.articleFileDataGetter !== null) {
          this.eventData = Object.assign({}, this.eventData, {
            ...this.articleFileDataGetter.results[0],
          });
          this.$nextTick(() => {
            this.getFocus();
            this.getRegistered();
          });
        }
      },
    },
  },
  async asyncData(context) {
    await context.store
      .dispatch("getArticleFileData", {
        search: `id eq ${context.route.params.id}`,
      })
      .catch((err) => {
        console.warn("#### Get Data fail ! #### (" + err + ") ");
      });
    return {
      domain: process.server ? context.req.headers.host : location.host,
    };
  },
  beforeRouteUpdate(to, from, next) {
    if (to.name === "signInEvent" && to.meta.requiresFrontStationAuth) {
      if (!localStorage.getItem("accessToken")) {
        this.$router
          .replace({ name: "login", query: this.$route.fullPath })
          .catch(() => {});
      }
    }
    next();
  },
  mounted() {
    document.getElementsByClassName("loading")[0].style.display = "none";
    window.addEventListener("resize", this.resizeHandler);
    this.resizeHandler();
  },
  methods: {
    getReferer() {
      this.domain = this.domain.replace(/http:\/\/|https:\/\//, "");
      return `${!process.env.MODE ? "https://" : "http://"}${this.domain}${
        this.$route.path
      }`;
    },
    getEvents() {
      return this.$store.dispatch("getArticleFileData", {
        search: `id eq ${this.$route.params.id}`,
      });
    },
    getFocus() {
      if (this.profileGetter && this.eventData.id) {
        let APIName = this.eventData.isVolunteerEvent
          ? "getFocusEvent"
          : "getSuppliedFocus";
        // 登入下取得關注該檔活動
        this._API[APIName].send({
          search: `id eq ${this.$route.params.id}`,
        }).then((res) => {
          let { count, results } = res;
          if (count > 0) {
            // 有無關注
            this.isFocus = results[0].isFocus;
          }
        });
      } else {
        this.isFocus = false;
      }
    },
    getRegistered() {
      if (this.profileGetter) {
        this._API.getEventRegistered
          .send({
            search: `userId eq ${this.profileGetter.id} and eventId eq ${this.$route.params.id}`,
          })
          .then((res) => {
            let { count, results } = res;
            if (count > 0) {
              //  有無報名,
              this.isRegistered = true;
              this.isJoined = results[0].isJoined;
              this.isLeaved = results[0].isLeaved;
            }
          });
      } else {
        this.isRegistered = false;
        this.isJoined = false;
        this.isLeaved = false;
      }
    },
    postEvent() {
      if (this.profileGetter) {
        this._API.postEventVisit
          .send([
            {
              id: this.$route.params.id * 1,
            },
          ])
          .then((res) => {});
      }
    },
    // 關注 / 取消關注,刷新
    resetGetEventsHandler() {
      this.getEvents();
    },
    // 報名成功
    registSuccessHandler() {
      this.isRegistered = true;
      this.getEvents();
    },
    // 取消成功
    deleteRegistHandler() {
      this.isRegistered = false;
      this.getEvents();
    },
    tabHandler(val) {
      this.currentTab = val;
    },
    goTo(url) {
      Window.prototype.articleFile_scrollTop = document.querySelector(
        ".articleFileContainer"
      ).scrollTop;
      this.$router.push(url);
    },
    chooseHandler(val) {
      this.chooseResult = val;
    },
  },
};
</script>
<style lang="scss" scoped>
@import "@/assets/scss/common/_common.scss";
.container {
  .mobile {
    @include BreakPointLarge {
      display: none;
    }
    .articleFileContainer {
      padding-bottom: 0;
    }
  }
  .articleFileContainer {
    display: flex;
    width: 100%;
    padding: 10px 10px 25px;
    flex-direction: column;
    @include BreakPointLarge {
      flex-direction: row;
      .left {
        width: calc(50% - 8px);
        margin-right: 8px;
      }
      .right {
        width: calc(50% - 8px);
        margin-left: 8px;
      }
    }
    .titleContainer {
      display: flex;
      align-items: stretch;
      justify-content: flex-start;
      margin: 0 0 25px;
      .title {
        display: flex;
        line-height: 1em;
        div {
          width: 4px;
          margin-right: 10px;
          border-radius: 2px;
          background-color: map-get($color, "Orange10");
        }
      }
    }
    .carouselContent {
      width: 100%;
    }
    .tabContent {
      margin-top: 10px;
      padding: 5px 10px 0 !important;
    }
    .introduceContent {
      p {
        line-height: 25px;
        color: #595757;
        padding: 5px;
      }
      .title {
        font-size: 20px;
        color: map-get($color, "Orange10");
      }
    }
    .discussContent {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0;
      position: relative;
      .left,
      .right {
        display: flex;
        align-items: center;
        justify-content: center;
        min-height: 41px;
        flex-basis: 25%;
        padding: 5px 10px;
        font-size: 15px;
        background: map-get($color, "Orange10");
        color: map-get($color, White);
      }
      .left {
        position: relative;
        padding-right: 0;
        z-index: 1;
        &::before {
          content: "";
          display: block;
          position: absolute;
          width: 40px;
          height: 40px;
          right: -39px;
          top: -1px;
          z-index: -1;
          border-radius: 2px;
          border-style: solid;
          border-width: 22px 0 20px 24px;
          border-color: transparent transparent transparent
            map-get($color, "Orange10");
        }
      }
      .right {
        position: relative;
        padding-left: 0;
        z-index: 1;
        &::before {
          content: "";
          display: block;
          position: absolute;
          width: 40px;
          height: 40px;
          left: -39px;
          top: -1px;
          z-index: -1;
          border-radius: 2px;
          border-style: solid;
          border-width: 21px 20px 21px 0;
          border-color: transparent map-get($color, "Orange10") transparent
            transparent;
        }
      }
      .score {
        flex-basis: 50%;
        display: flex;
        flex-direction: column;
        align-items: center;
        div {
          text-align: center;
        }
        img {
          width: calc(70% / 5);
        }
      }
    }
    .contentNormalStyle {
      border-radius: 8px;
      text-align: left;
      margin-bottom: 20px;
      padding: 20px;
      background: map-get($color, "White30");
      color: map-get($color, "Gary40");
      &.tab {
        padding-bottom: 0;
      }
      .title {
        padding-bottom: 10px;
        font-size: 20px;
        color: map-get($color, "Orange10");
        border-bottom: 1px solid map-get($color, "Orange10");
        margin-bottom: 23px;
      }
    }
    .rowStyle {
      display: flex;
      align-items: flex-start;
      img {
        height: 20px;
        margin-right: 10px;
      }
      .rowTitle {
        min-width: 99px;
      }
      .colon {
        align-self: start;
        margin: 0 10px;
      }
      .hrefColor {
        color: map-get($color, Blue);
      }
      .goTo {
        cursor: pointer;
      }
    }
    .socialContent {
      display: flex;
      align-items: baseline;
      align-items: center;
      flex-wrap: wrap;
      .twitter {
        z-index: 1;
      }
      .FB {
        position: relative;
        border: 1px solid map-get($color, Black);
        border-radius: 5px;
        height: 23px;
        background: #1877f2;
        margin: 0 3px;
        width: 85px;
        display: flex;
        justify-content: center;
        .fb_iframe_widget {
          top: -1px;
        }
        @include BreakPointLarge {
          margin: 0 5px;
        }
      }
      > span {
        color: map-get($color, White);
      }
      > a {
        padding: 0 5px;
        color: map-get($color, Black);
        border: 1px solid map-get($color, Black);
        border-radius: 5px;
        margin: 0 2px;
        @include BreakPointMinSmall {
          margin: 0 2px;
          &:last-child {
            margin-top: 10px;
          }
        }
        @include BreakPointLarge {
          margin: 0 5px;
        }
        i {
          background-image: url(data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2072%2072%22%3E%3Cpath%20fill%3D%22none%22%20d%3D%22M0%200h72v72H0z%22%2F%3E%3Cpath%20class%3D%22icon%22%20fill%3D%22%23fff%22%20d%3D%22M68.812%2015.14c-2.348%201.04-4.87%201.744-7.52%202.06%202.704-1.62%204.78-4.186%205.757-7.243-2.53%201.5-5.33%202.592-8.314%203.176C56.35%2010.59%2052.948%209%2049.182%209c-7.23%200-13.092%205.86-13.092%2013.093%200%201.026.118%202.02.338%202.98C25.543%2024.527%2015.9%2019.318%209.44%2011.396c-1.125%201.936-1.77%204.184-1.77%206.58%200%204.543%202.312%208.552%205.824%2010.9-2.146-.07-4.165-.658-5.93-1.64-.002.056-.002.11-.002.163%200%206.345%204.513%2011.638%2010.504%2012.84-1.1.298-2.256.457-3.45.457-.845%200-1.666-.078-2.464-.23%201.667%205.2%206.5%208.985%2012.23%209.09-4.482%203.51-10.13%205.605-16.26%205.605-1.055%200-2.096-.06-3.122-.184%205.794%203.717%2012.676%205.882%2020.067%205.882%2024.083%200%2037.25-19.95%2037.25-37.25%200-.565-.013-1.133-.038-1.693%202.558-1.847%204.778-4.15%206.532-6.774z%22%2F%3E%3C%2Fsvg%3E);
        }
      }
    }
    .acitvityInfoContent {
      .rowStyle {
        margin-bottom: 10px;
        font-size: 16px;
      }
    }
    .addressContent {
      .title {
        margin-bottom: 13px;
      }
      .rowStyle {
        margin-top: 23px;
        a {
          font-size: 16px;
        }
      }
    }
  }
}
</style>
