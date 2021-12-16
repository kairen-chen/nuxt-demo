<template>
  <div class="container">
    <div class="activityUnitFileContainer">
      <Breadcrumb />
      <div class="activityUnitContent">
        <div class="contentLeft">
          <img
            :src="npoData.npoIcon"
            alt=""
            @error="
              (e) => {
                e.target.src = require('@/assets/images/other/default_userprofile_image.png');
              }
            "
          />
        </div>
        <div class="contentRight">
          <div class="titleContainer">
            <div class="title">
              {{ npoData.name }}
            </div>
            <Favorites
              class="favoritesImg"
              :action_id="npoData.id"
              :favoritesType="'npo'"
              :isFocus="isFocus"
              @focusHandler="resetGetEventsHandler"
            />
          </div>
          <a
            class="href"
            :href="npoData.contactWebsite || npoData.contactSite"
            target="_blank"
          >
            {{ npoData.contactWebsite || npoData.contactSite }}
          </a>
          <!-- <div class="evaluationContent">
            <div class="evaluation">
              <Evaluation :starNum="npoData.totalRatingScore" />
              <div class="divider"></div>
            </div>
            <img
              class="donateIcon"
              src="@/assets/images/other/card_people.svg"
              alt=""
            />
            <span> {{ npoData.ratingUserNum || 0 }} 人</span>
          </div> -->
          <div class="detailContent">
            <div>
              <div class="count">{{ npoData.joinedUserNum }}</div>
              <div class="detailTitle">總參加人數</div>
            </div>
            <div>
              <div class="count">{{ npoData.eventNum }}</div>
              <div class="detailTitle">舉辦活動</div>
            </div>
            <div>
              <div class="count">{{ npoData.subscribedUserNum }}</div>
              <div class="detailTitle">受到關注</div>
            </div>
          </div>
        </div>
      </div>
      <div class="aboutContainer">
        <div class="aboutTitle">
          <div></div>
          關於
        </div>
        <article>
          <p>緣起:</p>
          <p>
            {{ npoData.description }}
          </p>
        </article>
        <iframe
          v-if="npoData.youtubeCode"
          :src="`https://www.youtube.com/embed/${npoData.youtubeCode}`"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
      </div>
      <div class="articleContainer">
        <div class="ivu-tabs-container contentNormalStyle">
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
        <div class="articlecContent">
          <div class="dateFilter">
            <div
              v-for="item of dateFilterData"
              :key="item.type"
              @click="currentDateFilter = item.type"
              :class="{ active: currentDateFilter == item.type }"
            >
              {{ item.title }}
            </div>
          </div>
          <Waterfall>
            <ArticleCard
              v-for="item of $data[currentTab]"
              :key="item.uid"
              :item="item"
            />
          </Waterfall>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Favorites from "@/components/unit/Favorites.vue";
import Evaluation from "@/components/unit/Evaluation.vue";
import FileHeader from "@/components/layoutUnit/FileHeader.vue";
import Breadcrumb from "@/components/iview/Breadcrumb.vue";
import ArticleCard from "@/components/cards/ArticleCard.vue";
import waterfallMixin from "@/plugins/mixins/waterfallMixin";
import { mapGetters } from "vuex";

export default {
  components: {
    Favorites,
    Evaluation,
    FileHeader,
    Breadcrumb,
    ArticleCard,
  },
  mixins: [waterfallMixin],
  props: ["route"],
  data() {
    return {
      npoData: [],
      currentTab: "happenedEvent",
      currentDateFilter: "all",
      urlRecord: "",
      happenedEvent: [],
      happeningEvent: [],
      articleData: [
        {
          title: "榮欣志工招募(長期)",
          imgSrc:
            "https://www.isharing.tw/uploads/origin/event_90b81db6437c4f80912e6fead1397cd6.420x420.PNG",
          activityDate: "2021-01-01",
          activityState: "活動開始",
          activitytID: "1",
          totalNum: 20,
          absentNum: 13,
        },
      ],
      // 關注
      isFocus: false,
    };
  },
  computed: {
    tabData() {
      return [
        {
          title: "過去活動回顧",
          type: "happenedEvent",
        },
        {
          title: "即將舉辦的活動",
          type: "happeningEvent",
        },
      ];
    },
    dateFilterData() {
      return [
        {
          title: "所有時間",
          type: "all",
        },
        {
          title: "今天截止",
          type: "today",
        },
        {
          title: "7天內截止",
          type: "week",
        },
        {
          title: "30天內截止",
          type: "month",
        },
      ];
    },
    ...mapGetters(["npoFileDataGetter", "accessToken", "webVisibilityGetter"]),
  },
  watch: {
    currentTab: {
      immediate: true,
      handler() {
        this.getEvent();
      },
    },
    currentDateFilter: {
      handler() {
        this.getEvent();
      },
    },
    accessToken: {
      immediate: true,
      handler() {
        this.getFocus();
      },
    },
    webVisibilityGetter: {
      handler(flag) {
        if (flag) {
          this.$set(this, "isFocus", false);
          this[this.currentTab].forEach((item) => {
            this.$set(item, "isFocus", false);
          });
          this.getNpos();
          this.getFocusEvent();
        }
      },
    },
    npoFileDataGetter: {
      immediate: true,
      handler() {
        if (this.npoFileDataGetter !== null) {
          this.npoData = Object.assign({}, this.npoData, {
            ...this.npoFileDataGetter.results[0],
          });
          this.getFocus();
          this.$forceUpdate();
        }
      },
    },
  },
  async asyncData(context) {
    return Promise.all([
      context.store.dispatch("getNpoFileData", {
        search: `id eq ${context.route.params.id}`,
      }),
    ]).catch((err) => {
      console.warn("#### Get Data fail ! #### (" + err + ") ");
    });
  },
  mounted() {
    document.getElementsByClassName("loading")[0].style.display = "none";
  },
  methods: {
    getNpos() {
      return this.$store.dispatch("getNpoFileData", {
        search: `id eq ${this.$route.params.id}`,
      });
    },
    getFocus() {
      if (this.accessToken) {
        this._API.getSubscribedNpo
          .send({
            search: `npoId eq ${this.$route.params.id}`,
          })
          .then((res) => {
            let { count, results } = res;
            if (count > 0) {
              this.isFocus = true;
            } else {
              this.isFocus = false;
            }
          });
      } else {
        this.isFocus = false;
      }
    },
    resetGetEventsHandler() {
      if (this.profileGetter) {
        this.getNpos();
      }
    },
    tabHandler(val) {
      this.currentTab = val;
    },
    getEvent() {
      let result = "";
      if (this.currentDateFilter === "today") {
        result = this.$moment()
          .endOf("day")
          .format("YYYY-MM-DD HH:mm:ss");
      } else if (this.currentDateFilter === "week") {
        result = this.$moment()
          .endOf("day")
          .add(7, "days")
          .format("YYYY-MM-DD HH:mm:ss");
      } else if (this.currentDateFilter === "month") {
        result = this.$moment()
          .endOf("day")
          .add(30, "days")
          .format("YYYY-MM-DD HH:mm:ss");
      } else {
        result = "";
      }
      result = result
        ? `and closeDate between '${this.$moment()
            .startOf("day")
            .format("YYYY-MM-DD HH:mm:ss")},${result}'`
        : result;

      this._API.getEvents
        .send({
          search: `npoId eq ${this.$route.params.id} and happenDate ${
            this.currentTab === "happenedEvent" ? "lte" : "gt"
          } ${this.$moment().format("YYYY-MM-DD HH:mm:ss")} ${result}`,
          sort: `closeDate,desc`,
        })
        .then((res) => {
          this[this.currentTab] = res.results;
          this.$nextTick(() => {
            this.getFocusEvent();
          });
        });
    },
  },
};
</script>
<style lang="scss" scoped>
@import "@/assets/scss/common/_common.scss";
.container {
  .activityUnitFileContainer {
    max-width: $MobileMaxWidth;
    padding: 0 10px 25px;
    @include BreakPointLarge {
      max-width: $ContainerMaxWidth;
      padding: 0;
    }
    .activityUnitContent {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      padding-bottom: 20px;
      flex-direction: column;
      border-bottom: 1px solid map-get($color, "Gary30");
      @include BreakPointLarge {
        flex-direction: row;
        align-items: flex-start;
      }
      .contentLeft {
        width: 180px;
        img {
          width: 180px;
        }
      }
      .contentRight {
        position: relative;
        width: 100%;
        text-align: center;
        @include BreakPointLarge {
          flex: 1;
          margin-left: 40px;
          margin-top: 11px;
          text-align: left;
        }
        .titleContainer {
          .title {
            text-align: center;
            font-weight: bold;
            font-size: 20px;
            color: map-get($color, "Black10");
            margin-bottom: 10px;
            @include BreakPointLarge {
              display: inline;
              text-align: left;
              margin-bottom: 8px;
              font-size: 32px;
            }
          }
          .favoritesImg {
            width: 26px;
            position: absolute;
            bottom: 63px;
            right: 0;
            margin-left: 10px;
            @include BreakPointLarge {
              display: inline;
              position: relative;
              bottom: 0;
              margin-left: 0;
              width: 26px;
            }
          }
        }
        .href {
          display: inline-block;
          font-size: 16px;
          color: map-get($color, "Orange10");
          margin-bottom: 10px;
          width: auto;
          max-width: calc(100% - 55px);
          overflow-wrap: anywhere;
          text-align: center;
          @include BreakPointLarge {
            margin-bottom: 25px;
          }
        }
        .evaluationContent {
          display: flex;
          align-items: center;
          justify-content: flex-start;
          color: map-get($color, "Orange10");
          font-size: 16px;
          margin-bottom: 10px;
          @include BreakPointLarge {
            position: absolute;
            bottom: 0;
            right: 0;
            margin-bottom: unset;
          }
          .evaluation {
            display: flex;
            align-items: center;
            .divider {
              width: 1px;
              height: 16px;
              margin: 0 8px;
              border-right: 1px solid map-get($color, "Gary30");
            }
          }
          img {
            width: 18px;
            margin: 0 5px 3px 0;
          }
          span {
            color: map-get($color, "Gary40");
          }
        }
        .detailContent {
          display: flex;
          font-size: 20px;
          justify-content: center;
          @include BreakPointLarge {
            justify-content: flex-start;
          }

          > div {
            text-align: center;
            padding: 0 10px;
            @include BreakPointLarge {
              padding: 0 30px;
            }
            &:first-child {
              padding-left: 0;
              padding-right: 10px;
              @include BreakPointLarge {
                padding-right: 30px;
              }
            }
            &:last-child {
              padding-left: 10px;
              padding-right: 0px;
              @include BreakPointLarge {
                padding-left: 30px;
              }
            }
            &:not(:last-child) {
              border-right: 1px solid map-get($color, "Gary20_opacity");
            }
          }
          .count {
            color: map-get($color, "Orange10");
            font-weight: bold;
            @include BreakPointLarge {
              font-size: 24px;
            }
          }
          .detailTitle {
            color: map-get($color, "Gary40");
            font-size: 14px;
            @include BreakPointLarge {
              font-size: 16px;
              margin-bottom: unset;
            }
          }
        }
      }
    }
    .aboutContainer {
      display: flex;
      flex-direction: column;
      padding-bottom: 25px;
      margin-bottom: 25px;
      margin-top: 25px;
      border-bottom: 1px solid map-get($color, "Gary30");
      width: 100%;
      .aboutTitle {
        display: flex;
        align-self: flex-start;
        line-height: 20px;
        font-size: 20px;
        font-weight: bold;
        div {
          width: 4px;
          margin-right: 10px;
          border-radius: 2px;
          background-color: map-get($color, "Orange10");
        }
      }
      article {
        font-size: 16px;
        margin: 20px 0;
        color: map-get($color, "Gary40");
      }
      iframe {
        width: 100%;
        height: 53.4vmin;
        @include BreakPointLarge {
          max-width: $ContainerMaxWidth;
          height: calc(#{$ContainerMaxWidth} * 0.55);
        }
      }
    }
    .articleContainer {
      font-size: 16px;
      .contentNormalStyle {
        background-color: #f7f7f7;
        border-radius: 8px;
        padding: 0 20px;
      }
      .articlecContent {
        position: relative;
        background: map-get($color, White);
        z-index: 2;
        min-height: 50px;
        .dateFilter {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          height: 50px;
          margin-bottom: 10px;
          > div {
            cursor: pointer;
            padding: 0 10px;
            @include BreakPointMinSmall {
              font-size: 12px;
            }
            &:not(:last-child) {
              border-right: 1px solid map-get($color, "Gary20_opacity");
            }
            &:last-child {
              padding-right: 0;
            }
            &.active {
              color: map-get($color, "Orange10");
            }
            @include BreakPointLarge {
              padding: 5px 24px;
            }
          }
        }
      }
    }
  }
}
</style>
