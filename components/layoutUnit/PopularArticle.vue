<template>
  <div class="popularArticleWrapper" :class="{ active: toggleShow }">
    <div
      class="title"
      @click="
        () => {
          toggleShow = !toggleShow;
        }
      "
    >
      愛心小編推薦
    </div>
    <!-- 手機板 -->
    <div class="mobile ivu-tabs-container" v-if="show">
      <Tabs
        class="tabContainer block"
        size="small"
        @on-click="
          (type) => {
            currentTab = type + '';
          }
        "
        :animated="false"
        v-model="currentTab"
      >
        <TabPane
          v-for="item of articleData"
          :key="item.type"
          :name="item.type + ''"
          :label="item.title"
          context-menu
        />
      </Tabs>
      <section class="block atricleBlock">
        <div
          class="linkContainer"
          v-for="(listItem, listItemIndex) of articleData[currentTab]
            .articleList"
          :key="`mobile_${listItemIndex}`"
          @click="goTo(listItem.href)"
        >
          <div v-if="articleData[currentTab].articleList === 0">
            {{ listItemIndex == 0 ? "暫無活動" : "暫無資訊" }}
          </div>
          <img
            :src="
              currentTab === '0'
                ? require('@/assets/images/header/nav/D/ic_event_select.svg')
                : require('@/assets/images/other/card_organization.svg')
            "
            alt=""
          />
          <span class="content">{{ listItem.content }}</span>
        </div>
      </section>
    </div>
    <!-- 桌機板 -->
    <section
      class="deskTop atricleBlock"
      v-for="(articleItem, articleItemIndex) of articleData"
      :key="articleItemIndex"
    >
      <div class="articleType">
        {{ articleItem.title }}
      </div>
      <div v-if="articleItem.articleList.length === 0">
        {{ articleItemIndex === 0 ? "暫無活動" : "暫無資訊" }}
      </div>
      <div
        class="linkContainer"
        v-for="(listItem, listItemIndex) of articleItem.articleList"
        :key="`deskTop_${listItemIndex}`"
        @click="goTo(listItem.href)"
      >
        <img
          :src="
            articleItem.type === '0'
              ? require('@/assets/images/header/nav/D/ic_event_select.svg')
              : require('@/assets/images/other/card_organization.svg')
          "
          alt=""
        />
        <span class="content">{{ listItem.content }}</span>
      </div>
    </section>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["eventDataGetter", "npoPromoteDataGetter"]),
    // articleData() {
    //   return [
    //     {
    //       title: "公益活動",
    //       type: "0",
    //       articleList: [],
    //     },
    //     {
    //       title: "公益社團及機構",
    //       type: "1",
    //       articleList: [],
    //     },
    //   ];
    // },
    eventData() {
      return this.eventDataGetter.results;
    },
    npoPromoteData() {
      return this.npoPromoteDataGetter.results;
    },
  },
  data() {
    return {
      currentTab: "0",
      toggleShow: false,
      show: false,
      articleData: [
        {
          title: "公益活動",
          type: "0",
          articleList: [],
        },
        {
          title: "公益社團及機構",
          type: "1",
          articleList: [],
        },
      ],
    };
  },
  watch: {
    eventData: {
      immediate: true,
      handler() {
        let tempArr = [];
        this.eventDataGetter.results.forEach((item) => {
          tempArr.push(this.dataHandler(item));
        });
        const set = new Set();
        const result = tempArr.filter((item) =>
          !set.has(item.href) ? set.add(item.href) : false
        );
        this.articleData[0].articleList = result;
      },
    },
    npoPromoteData: {
      immediate: true,
      handler() {
        this.npoPromoteDataGetter.results.forEach((item) => {
          this.articleData[1].articleList.push(this.dataHandler(item));
        });
      },
    },
  },
  mounted() {
    window.addEventListener("resize", this.resizeHandler);
    this.resizeHandler();
  },
  methods: {
    goTo(url) {
      this.$router.push(url);
    },
    resizeHandler() {
      this.show = process.client
        ? window.innerWidth < this.breakPointLarge
        : false;
    },
    // articleList資料處理
    dataHandler(item) {
      let results = {};
      Object.keys(item).forEach(function(key) {
        if (key === "subject" || key === "name") {
          results.content = item[key];
        }
        if (key === "id") {
          results.href = `/${!item.isNpoFlag ? "event" : "npo"}/${item[key]}`;
        }
      });
      return results;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/common/_common.scss";
$popularArticleWrapperWidth: 240px;
.popularArticleWrapper {
  margin: 0 20px 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid map-get($color, "Gary50");

  .deskTop {
    display: none;
  }
  .title {
    display: none;
  }

  @include BreakPointLarge {
    box-shadow: 0 8px 10px 0 rgba(0, 0, 0, 0.07),
      0 -2px 4px 0 rgba(0, 0, 0, 0.05);
    border: 0;
    .deskTop {
      display: block;
    }
    position: fixed;
    right: 0;
    top: 300px;
    width: $popularArticleWrapperWidth;
    margin: 0;
    border-bottom-left-radius: 10px;
    transition: transform 0.3s;
    transform: translateX($popularArticleWrapperWidth);
    z-index: 12;
    padding: 10px 30px;
    background-color: map-get($color, White);
    &.active {
      transition: transform 0.3s;
      transform: translateX(0);
    }
    .title {
      display: block;
      width: 20px;
      position: absolute;
      top: 0;
      left: -50px;
      font-size: 16px;
      line-height: 1.33;
      letter-spacing: 1px;
      padding: 20px 15px;
      width: 50px;
      text-align: center;
      color: map-get($color, White);
      background-image: linear-gradient(
        to bottom,
        map-get($color, "Orange10"),
        map-get($color, "Orange20")
      );
      border-top-left-radius: 10px;
      border-bottom-left-radius: 10px;
      cursor: pointer;
    }
  }
  @media (max-width: map-get($breakPoint, large)) and (max-height: 700px) {
    top: 100px;
  }
  .block {
    margin: 20px auto;
    background-color: map-get($color, "White30");
    border-radius: 8px;
  }
  .atricleBlock {
    &.deskTop {
      padding: 5px 0 10px;
    }
    text-align: left;

    &:last-child {
      padding-bottom: 0;
    }
    &:last-child {
      padding-top: 0;
    }
    .articleType {
      display: inline-block;
      padding: 3px 12px;
      color: map-get($color, White);
      background: map-get($color, "Blue10");
      margin: 10px 0;
      border-radius: 4px;
      font-family: PingFangTC;
      font-size: 14px;
    }
    &:last-child {
      .articleType {
        margin-top: 0;
      }
    }

    .linkContainer {
      display: flex;
      align-items: center;
      font-size: 16px;
      font-family: PingFangTC;
      color: map-get($color, Black10);
      cursor: pointer;
      padding: 5px;
      &:not(:last-child) {
        margin-bottom: 8px;
      }
      &:hover {
        color: map-get($color, White);
        background-color: map-get($color, "Gary30");
        border-radius: 8px;
        transition: background-color 0.3s, color 0.5s;
      }
      .content {
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
        @include ForIE {
          width: 100%;
          overflow: hidden;
          max-height: 19px;
        }
      }
      img {
        width: 20px;
        margin: 0 5px 3px 0;
      }
    }
  }
  .tabContainer {
    padding: 7px 20px 0;
  }
  .mobile {
    .atricleBlock {
      padding: 20px;
    }
  }
}
</style>
