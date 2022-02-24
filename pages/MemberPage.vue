<template>
  <div class="container">
    <BreadCrumb />
    <div class="memberContainer">
      <div class="memberInfoContent">
        <div class="left">
          <div class="memberLogo">
            <img
              :src="proFile.icon"
              @error="
                (e) => {
                  e.target.src = require('@/assets/images/other/default_userprofile_image.png');
                }
              "
              alt=""
            />
            <!-- 手機板 -->
            <router-link class="editProfile" :to="{ name: 'meEdit' }">
              <img src="@/assets/images/other/ic_edit_member.svg" alt="" />
            </router-link>
          </div>
        </div>
        <div class="right">
          <div class="memberName">
            <span> {{ proFile.username }}</span>
            <div class="row">
              <router-link class="editProfile" :to="{ name: 'meEdit' }">
                <img src="@/assets/images/other/ic_edit_member.svg" alt="" />
              </router-link>
              <span
                class="platformIcon"
                @mouseover="
                  () => {
                    gradeFlag = true;
                  }
                "
                @mouseleave="
                  () => {
                    gradeFlag = false;
                  }
                "
              >
                <img
                  :src="gradeLogo()"
                  @error="
                    (e) => {
                      e.target.src =
                        'https://www.isharing.tw/static/images/badge_1.png';
                    }
                  "
                />
                <div v-show="gradeFlag" class="tooltip">
                  目前積分：{{ proFile.score }}
                </div>
              </span>
            </div>
          </div>
          <div class="memberTime">
            <div class="columContent">
              <div class="colum">
                <div class="count">{{ proFile.eventEnterpriseHour }}</div>
                <div class="title">企業志工時數</div>
              </div>
              <div class="colum">
                <div class="count">{{ proFile.eventGeneralHour }}</div>
                <div class="title">一般志工時數</div>
              </div>
            </div>
            <div class="columContent">
              <div class="colum">
                <div class="count">{{ proFile.eventNum }}</div>
                <div class="title">參加活動</div>
              </div>
              <div class="colum">
                <div class="count">{{ proFile.ranking }}</div>
                <div class="title">目前排名</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="ivu-tabs-container">
        <Tabs
          class="tabContent contentNormalStyle "
          size="small"
          @on-click="
            (type) => {
              currentTab = type + '';
            }
          "
          :animated="false"
          :value="currentTab + ''"
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
      <div class="infoContent contentNormalStyle">
        <section
          v-for="item in tabData"
          :key="item.type"
          v-show="currentTab == item.type"
        >
          <div class="title">
            <div></div>
            {{ item.title }}
          </div>
        </section>

        <div class="contentContainer detail">
          <!-- 個人護照 -->
          <div class="normalContent" v-if="currentTab === 'proFile'">
            <h3 class="detailTitle">關於我</h3>
            <div class="content">
              <p>{{ proFile.aboutMe }}</p>
            </div>
          </div>
          <!-- 進階搜尋志工時數 -->
          <div v-else-if="currentTab === 'volunteerTime'">
            <!-- <UnderConstruction /> -->
            <div class="normalContent">
              <div class="dateContext">
                <div>
                  開始時間
                  <span class="colon">:</span>
                  <Select
                    class="select"
                    :listItem="startDate"
                    :listKey="'startDate'"
                    @changeHandler="changeHandler"
                    :currentSelectObj="select"
                  />
                </div>
                <div>
                  結束時間
                  <span class="colon">:</span>
                  <Select
                    class="select"
                    :listItem="endDate"
                    :listKey="'endDate'"
                    @changeHandler="changeHandler"
                    :currentSelectObj="select"
                  />
                </div>
                <div class="checkContext">
                  <button class="check" @click="getVolunteerTime">確定</button>
                </div>
              </div>
              <div class="hourContext">
                <template v-if="volunteerTime.totalHour">
                  <div>
                    一般志工時數<span class="colon">:</span
                    >{{ volunteerTime.eventGeneralHour }}
                  </div>
                  <div>
                    企業志工時數<span class="colon">:</span
                    >{{ volunteerTime.eventEnterpriseHour }}
                  </div>
                  <div>
                    累計志工時數<span class="colon">:</span
                    >{{ volunteerTime.totalHour }}
                  </div>
                </template>
                <template
                  v-if="
                    volunteerTimeSearchFlag && volunteerTime.totalHour == ''
                  "
                >
                  查無志工時數!
                </template>
              </div>
            </div>
          </div>
          <!-- ˋ專業證照 -->
          <div
            v-else-if="currentTab === 'licenseImage'"
            class="normalContent licenseImageContent"
          >
            <a
              class="licenseImageContext"
              v-for="(item, index) in licenseImages"
              :key="index"
              :href="item.image"
              target="_blank"
            >
              <img
                :src="item.image"
                @error="
                  (e) => {
                    e.target.src = require('@/assets/images/other/default_userprofile_image.png');
                  }
                "
                alt=""
              />
            </a>
          </div>
          <!-- list card -->
          <div v-else class="waterFall">
            <Waterfall
              v-if="currentTab === 'subscribedNpo'"
              :key="currentTab"
              class="subscribedNpo"
            >
              <ActivityUnitCard
                v-for="resultItem of subscribedNpo"
                :key="`${currentTab}_${resultItem.npoUid}`"
                :item="resultItem"
                @focusHandler="focusHandler"
              />
            </Waterfall>
            <Waterfall v-else>
              <ArticleCard
                v-for="resultItem of $data[currentTab]"
                :key="`${currentTab}_${resultItem.uid}`"
                :item="resultItem"
                @focusHandler="focusHandler"
                :isSupplyEvent="
                  currentTab == 'suppliedEvent' || currentTab == 'suppliedFocus'
                    ? true
                    : false
                "
              />
            </Waterfall>
            <ReadMore
              :loadingFlag="loadingFlag"
              :dataLength="$data[currentTab].length"
              :count="count"
              @readMore="getCommon()"
            />
            <ProcessAPIState
              :dataLength="$data[currentTab].length"
              :loadingFlag="loadingFlag"
            />
          </div>
        </div>
      </div>
      <!-- 個人護照(可服務項目 / 可服務區域) -->
      <div
        v-show="currentTab === 'proFile'"
        class="skillContent contentNormalStyle"
      >
        <div class="title">
          <div></div>
          可服務項目 / 可服務區域
        </div>
        <div class="detail">
          <div class="subTitle">可服務項目 :</div>

          <div class="itemContent">
            <div
              class="item"
              v-for="(item, index) of proFile.skillsDescription"
              :key="index"
              v-show="item"
            >
              {{ item }}
            </div>
          </div>
        </div>
        <div class="detail">
          <div class="subTitle">可服務區域 :</div>
          <div class="itemContent">
            <div
              class="item"
              v-for="(item, index) of proFile.interest"
              :key="index"
              v-show="item"
            >
              {{ item }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import ArticleCard from "@/components/cards/ArticleCard.vue";
import ActivityUnitCard from "@/components/cards/ActivityUnitCard.vue";
import waterfallMixin from "@/plugins/mixins/waterfallMixin";
import Select from "@/components/iview/Select.vue";
import ProcessAPIState from "@/components/unit/ProcessAPIState.vue";
import ReadMore from "@/components/unit/ReadMore.vue";

export default {
  mixins: [waterfallMixin],
  components: {
    ArticleCard,
    ActivityUnitCard,
    Select,
    ProcessAPIState,
    ReadMore,
  },
  computed: {
    tabData() {
      return [
        {
          title: "個人護照",
          type: "proFile",
        },
        {
          title: "我參加過的活動",
          type: "registeredEvent",
        },
        {
          title: "我所關注的活動",
          type: "focusEvent",
        },
        {
          title: "我捐過的物資",
          type: "suppliedEvent",
        },
        {
          title: "我所關注的物資缺",
          type: "suppliedFocus",
        },
        {
          title: "我所關注的公益社團及機構",
          type: "subscribedNpo",
        },
        // {
        //   title: "評分活動",
        //   type: "ratingEvent",
        // },
        {
          title: "瀏覽過的活動",
          type: "visitEvent",
        },
        {
          title: "進階搜尋志工時數",
          type: "volunteerTime",
        },
        {
          title: "專業證照",
          type: "licenseImage",
        },
      ];
    },
    ...mapGetters(["profileGetter", "webVisibilityGetter"]),
    startDate() {
      let dateOption = [],
        all = {
          value: "all",
          label: "不限",
        },
        baseDate = 2014;
      if (this.select.endDate && this.select.endDate !== "all") {
        for (let i = this.select.endDate; i >= baseDate; i--) {
          dateOption.unshift({
            value: i,
            label: i,
          });
        }
        dateOption.unshift(all);
      } else {
        dateOption.push(all);
        for (let i = baseDate; i <= this.$moment().year(); i++) {
          dateOption.push({
            value: i,
            label: i,
          });
        }
      }
      return dateOption;
    },
    endDate() {
      let dateOption = [],
        all = {
          value: "all",
          label: "不限",
        },
        baseDate = 2014;
      dateOption.push(all);
      if (this.select.startDate == "all") {
        this.select.startDate = null;
      }
      for (
        let i = this.select.startDate || baseDate;
        i <= this.$moment().year();
        i++
      ) {
        dateOption.push({
          value: i,
          label: i,
        });
      }

      return dateOption;
    },
  },
  watch: {
    profileGetter: {
      immediate: true,
      handler() {
        this.getUserInfo();
      },
    },
    webVisibilityGetter: {
      handler(flag) {
        if (flag) {
          this[this.currentTab] = [];
          this.page = 0;
          this.getUserInfo();
        }
      },
    },
    searchStrGetter: {
      handler() {
        this[this.currentTab] = [];
        this.page = 0;
        this.getCommon();
      },
    },
    currentTab: {
      immediate: true,
      handler(val) {
        this.loadingFlag = true;
        this.page = 0;
        this.count = 0;
        this.$store.dispatch("delSearchStr");
        switch (val) {
          // 個人護照
          case "proFile":
            return this.proFile;
          // 我參加過的活動
          case "registeredEvent":
            this[this.currentTab] = [];
            this.sort = `happenDate,desc`;
            this.getCommon();
            break;
          // 我所關注的活動
          case "focusEvent":
            this[this.currentTab] = [];
            this.sort = `pubDate,desc`;
            this.getCommon();
            break;
          // 我捐過的物資
          case "suppliedEvent":
            this[this.currentTab] = [];
            this.sort = `pubDate,desc`;
            this.getCommon();
            break;
          // 我所關注的物資缺
          case "suppliedFocus":
            this[this.currentTab] = [];
            this.sort = `focusedDate,desc`;
            this.getCommon();
            break;
          // 我所關注的公益社團及機構
          case "subscribedNpo":
            this[this.currentTab] = [];
            this.sort = `focusedDate,desc`;
            this.getCommon();
            break;
          // 評分活動
          // case "ratingEvent":
          //   // alert("評分成功")
          //   this._API.getRatingEvent
          //     .send({
          //       // sort: `pubDate,desc`,
          //     })
          //     .then((res) => (this.ratingEvent = res.results));
          //   break;
          // 進階搜尋志工時數
          case "volunteerTime":
            this.volunteerTimeSearchFlag = false;
            this.select.startDate = "all";
            this.select.endDate = "all";
            this.volunteerTime = {};
            break;
          // 瀏覽過的活動
          case "visitEvent":
            this[this.currentTab] = [];
            this.sort = `visitTime,desc`;
            this.getCommon();
            break;
          // 專業證照
          case "licenseImage":
            this._API.getLicenseImage
              .send()
              .then((res) => (this.licenseImages = res.results));
            break;
          default:
            this.resultData = null;
        }
      },
    },
  },
  data() {
    return {
      // tab控制
      currentTab: "proFile",
      // 資料
      proFile: {},
      registeredEvent: {},
      focusEvent: {},
      suppliedEvent: {},
      suppliedFocus: {},
      subscribedNpo: {},
      ratingEvent: {},
      visitEvent: {},
      volunteerTime: {},
      licenseImages: {},
      // date select
      select: {
        startDate: "all",
        endDate: "all",
      },
      // 彩球分數顯示
      gradeFlag: false,
      // API載入中
      loadingFlag: false,
      // 進階搜尋時數template是否顯示
      volunteerTimeSearchFlag: false,
      // API common parameter
      page: 0,
      count: 0,
      sort: "",
    };
  },
  mounted() {
    if (!localStorage.getItem("accessToken")) {
      document.getElementsByClassName("loading")[0].style.display = "block";
    }
  },
  methods: {
    getUserInfo() {
      if (this.profileGetter) {
        this.proFile = JSON.parse(JSON.stringify(this.profileGetter));
        // 可服務項目 / 可服務區域 字串處理
        this.proFile.interest = this.proFile.interest
          .replace(/\s+/g, "")
          .split(",");
        this.proFile.skillsDescription = this.proFile.skillsDescription
          .replace(/\s+/g, "")
          .split(",");
        this.loadingFlag = false;
        this.getCommon();
      } else {
        if (!localStorage.getItem("accessToken")) {
          this.$router.replace({ name: "home" }).catch(() => {});
        }
      }
    },
    changeHandler(item) {
      this.select = Object.assign({}, this.select, {
        [item.tag]: item.value,
      });
    },
    gradeLogo() {
      let badge = Math.floor(this.proFile.score / 16) + 1;
      if (badge > 7) {
        badge = 7;
      }
      if (badge) return require(`@/assets/images/scoreBall/badge_${badge}.svg`);
    },
    getCommon() {
      if (this.currentTab === "volunteerTime") {
        this.volunteerTime = {};
      } else if (this.currentTab !== "proFile") {
        this.loadingFlag = true;
        this._API[
          `get${this.currentTab[0].toUpperCase() + this.currentTab.slice(1)}`
        ]
          .send({
            page: this.page++,
            size: 12,
            sort: this.sort,
            search: this.searchConditionHandler(),
          })
          .then((res) => {
            this.count = res.count;
            if (this[this.currentTab].length > 0) {
              res.results.forEach((item) => {
                this[this.currentTab].push(item);
              });
            } else {
              this[this.currentTab] = res.results;
            }
            this.loadingFlag = false;
          });
      }
    },
    // 進階搜尋志工時數
    getVolunteerTime() {
      this.volunteerTimeSearchFlag = true;
      this.loadingFlag = true;
      let postData = {
        startTime:
          this.select.startDate === "all" ? 2014 : this.select.startDate,
        endTime:
          this.select.endDate === "all"
            ? this.$moment().year()
            : this.select.endDate,
      };
      this._API.getVolunteerTime.send(postData).then((res) => {
        this.volunteerTime = res;
        this.loadingFlag = false;
      });
    },
    focusHandler(flag, item) {
      // 取消關注時直接移除卡片
      if (!flag) {
        // this[this.currentTab].splice(this[this.currentTab].indexOf(item), 1);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/common/_common.scss";

.memberContainer {
  width: 100%;
  margin: 0 auto;
  padding: 0 16px;
  @include BreakPointLarge {
    padding: 0;
  }
  .subscribedNpo {
    justify-content: flex-start;
  }
  .contentNormalStyle {
    border-radius: 8px;
    text-align: left;
    margin-bottom: 20px;
    padding: 20px;
    background: map-get($color, "White30");
    color: map-get($color, "Gary40");
    @include BreakPointLarge {
      padding: 0;
    }
  }
  .memberInfoContent {
    display: flex;
    padding-bottom: 35px;
    margin-bottom: 35px;
    border-bottom: 1px solid map-get($color, "Gary50");
    @include BreakPointMinSmall {
      align-items: center;
    }
    .right {
      padding: 5px;
    }
    .left {
      flex-basis: 160px;

      @include BreakPointMinSmall {
        flex-basis: 120px;
      }
      @include BreakPointLarge {
        .row {
          position: absolute;
        }
      }
    }
    .right {
      flex: 1;
      @include BreakPointLarge {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
      }
    }
    .memberLogo {
      display: flex;
      flex-direction: column;
      align-items: center;
      position: relative;
      flex-basis: calc(100% - 55%);
      > img {
        width: 100%;
        max-width: 150px;
      }
      .editProfile {
        position: absolute;
        bottom: -3px;
        right: 8px;
        @include BreakPointMinSmall {
          bottom: -5px;
          right: 1px;
        }
        @include BreakPointLarge {
          display: none;
        }
        img {
          width: 36px;
        }
      }
    }
    .memberName {
      font-size: 20px;
      color: map-get($color, "Black10");
      margin-bottom: 10px;
      font-weight: bold;
      word-break: break-all;
      @include BreakPointLarge {
        margin-top: 20px;
      }
      .row {
        display: inline-block;
        position: relative;
        bottom: -3px;
        .editProfile {
          display: none;
        }
        .platformIcon {
          display: flex;
          align-items: flex-end;
          position: relative;
          margin-left: 5px;
          img {
            width: 20px;
          }
          .tooltip {
            position: absolute;
            text-align: center;
            width: 100px;
            background-color: map-get($color, "Orange10");
            border-radius: 4px;
            color: map-get($color, White);
            font-size: 14px;
            padding: 5px 0;
            top: -35px;
            left: -80px;
            @include BreakPointLarge {
              top: 30px;
            }
          }
        }
        @include BreakPointLarge {
          .editProfile {
            display: inline-block;
            img {
              width: 20px;
            }
          }
          .platformIcon {
            display: inline-block;
          }
          a {
            &:not(:last-child) {
              margin-left: 10px;
            }
          }
        }
      }
    }
    .memberTime {
      display: flex;
      align-items: center;
      max-width: 200px;
      border-radius: 5px;
      @include BreakPointLarge {
        width: 100%;
        max-width: 100%;
      }
      .columContent {
        flex: 1;
        text-align: center;
        font-weight: bold;
        @include BreakPointLarge {
          display: flex;
          flex-direction: row;
          flex: none;
        }
        .count {
          font-size: 20px;
          line-height: 20px;
          color: map-get($color, "Orange10");
          margin-bottom: 5px;
          @include BreakPointLarge {
            font-size: 24px;
          }
        }
        .title {
          font-size: 12px;
          color: map-get($color, "Gary40");
          @include BreakPointLarge {
            font-size: 16px;
          }
        }
        &:not(:last-child) {
          border-right: 1px solid map-get($color, "Gary50");
          @include BreakPointLarge {
            border: 0;
          }
        }
        > .colum:not(:last-child) {
          border-bottom: 1px solid map-get($color, "Gary50");
          @include BreakPointLarge {
            border: 0;
          }
        }
        &:nth-child(odd) {
          .colum:nth-child(odd) {
            padding: 0 5px 5px 0;
            @include BreakPointLarge {
              padding: 0;
            }
          }
          .colum:nth-child(even) {
            padding: 5px 5px 0 0;
            @include BreakPointLarge {
              padding: 0;
            }
          }
        }
        &:nth-child(even) {
          .colum:nth-child(odd) {
            padding: 0 0 5px 5px;
            @include BreakPointLarge {
              padding: 0;
            }
          }
          .colum:nth-child(even) {
            padding: 5px 0 0 5px;
            @include BreakPointLarge {
              padding: 0;
            }
          }
        }
        @include BreakPointLarge {
          .colum {
            border-right: 1px solid map-get($color, "Gary50") !important;
            border-bottom: 0 !important;
            padding: 0 20px !important;
          }
          &:first-child {
            .colum:first-child {
              padding-left: 0 !important;
            }
          }
          &:last-child {
            .colum:last-child {
              border: 0 !important;
            }
          }
        }
      }
    }
  }
  .tabContent {
    padding: 10px 0 0;
    .ivu-tabs-nav-container {
      height: 50px;
      display: flex;
      align-items: center;
    }
    .ivu-tabs-nav-wrap {
      display: flex;
      align-items: center;
    }
    .ivu-tabs-bar {
      margin-bottom: 0;
    }
    .ivu-tabs-nav-scrollable {
      padding: 0 50px;
    }
    .ivu-tabs-tab {
      font-size: 14px;
    }
    .ivu-tabs-ink-bar {
      height: 5px;
      border-radius: 50% 0px 45% 0;
      background: map-get($color, "Orange10_opacity");
    }
    .ivu-tabs-nav .ivu-tabs-tab-active,
    .ivu-tabs-nav .ivu-tabs-tab:hover {
      color: map-get($color, "Orange10");
    }
  }
  .infoContent,
  .skillContent {
    .title {
      display: flex;
      font-size: 20px;
      line-height: 20px;
      font-weight: bold;
      color: map-get($color, "Black10");
      @include BreakPointLarge {
        padding: 20px 0 0 20px;
      }
      div {
        width: 4px;
        margin-right: 10px;
        border-radius: 2px;
        background-color: map-get($color, "Orange10");
      }
    }
    .detail {
      display: flex;
      margin-top: 20px;
      font-size: 16px;
      color: map-get($color, "Gary40");
      &.contentContainer {
        flex-direction: column;
        .content {
          margin: 10px 0 0;
        }
        .waterFall {
          text-align: center;
          padding: 0 0 10px;
        }
      }
    }
  }
  .skillContent {
    &:last-child {
      padding-bottom: 20px;
    }
  }
  .normalContent {
    display: inline-block;
    padding: 0 20px 20px;
    .dateContext {
      margin-bottom: 20px;
      text-align: center;
      > div {
        display: flex;
        align-items: center;
        margin-bottom: 20px;
      }
      .checkContext {
        display: flex;
        justify-content: flex-end;
        margin: 20px 20px 0 0;
        .check {
          width: 80px;
          font-size: 16px;
          font-weight: bold;
          color: #fff;
          border: 0;
          background-image: linear-gradient(
            to right,
            map-get($color, "Orange10"),
            map-get($color, "Orange20")
          );
          border-radius: 25px;
          padding: 5px 10px;
        }
      }
    }
    .hourContext {
      div {
        margin-top: 20px;
      }
    }
    .colon {
      margin: 0 15px;
    }
  }
  .licenseImageContent {
    display: flex;
    flex-wrap: wrap;
    padding-bottom: 5px;
    .licenseImageContext {
      text-align: center;
      width: calc(100% / 2 - 5px);
      height: 126px;
      border: 2px solid map-get($color, "Orange10");
      border-radius: 4px;
      margin-bottom: 10px;
      &:not(:last-child) {
        margin-right: 10px;
      }
      &:nth-child(2n) {
        margin-right: 0;
      }
      @include BreakPointLarge {
        width: calc(100% / 4 - 8px);
        &:not(:last-child) {
          margin-right: 10px;
        }
        &:nth-child(4n) {
          margin-right: 0;
        }
      }
      img {
        max-height: 100%;
        max-width: 100%;
        min-height: 100%;
      }
    }
  }
  .skillContent {
    .detail {
      display: flex;
      margin-left: 20px;
    }
    .subTitle {
      margin-top: 5px;
      min-width: 100px;
      font-size: 16px;
      color: map-get($color, "Gary40");
    }
    span {
      display: flex;
      align-items: center;
      margin: 0 8px 0 5px;
      padding-bottom: 2px;
    }
    .itemContent {
      display: flex;
      flex-wrap: wrap;
      .item {
        font-size: 16px;
        font-weight: bold;
        color: map-get($color, "Orange10");
        padding: 6px 13px;
        border-radius: 4px;
        border: 1px solid map-get($color, "Orange10");
        margin-bottom: 8px;
        &:not(:last-child) {
          margin-right: 8px;
        }
      }
    }
  }
  .ivu-tabs-container::v-deep {
    -webkit-overflow-scrolling: touch;
  }
}
</style>
