<template>
  <div class="wrapper">
    <Carousel :widthType="'fullScreen'" :imgData="bannerList" />
    <div class="container">
      <PopularArticle />
      <ArticleSelect @changeHandler="changeHandler" />
      <Waterfall>
        <ArticleCard v-for="item of resultData" :key="item.id" :item="item" />
      </Waterfall>
      <ReadMore
        :loadingFlag="loadingFlag"
        :dataLength="resultData.length"
        :searchStrGetter="searchStrGetter"
        :count="count"
        @readMore="getEnterpriseEvent()"
      />
      <ProcessAPIState
        :dataLength="resultData.length"
        :loadingFlag="loadingFlag"
      />
    </div>
  </div>
</template>

<script>
import Carousel from "@/components/iview/Carousel.vue";
import ArticleSelect from "@/components/layoutUnit/ArticleSelect.vue";
import ArticleCard from "@/components/cards/ArticleCard.vue";
import PopularArticle from "@/components/layoutUnit/PopularArticle.vue";
import waterfallMixin from "@/plugins/mixins/waterfallMixin";
import ProcessAPIState from "@/components/unit/ProcessAPIState.vue";
import ReadMore from "@/components/unit/ReadMore.vue";
import { mapGetters } from "vuex";

export default {
  mixins: [waterfallMixin],
  components: {
    Carousel,
    ArticleSelect,
    ArticleCard,
    PopularArticle,
    ProcessAPIState,
    ReadMore,
  },
  data() {
    return {
      bannerList: [],
      //文章類型篩選
      articleSelect: {},
      loadingFlag: false,
    };
  },
  computed: {
    ...mapGetters(["bannerDataGetter", "enterpriseEventDataGetter"]),
  },
  watch: {
    bannerDataGetter: {
      immediate: true,
      handler() {
        if (this.bannerDataGetter !== null)
          this.bannerList = this.bannerDataGetter.results;
      },
    },
    enterpriseEventDataGetter: {
      immediate: true,
      handler() {
        if (this.enterpriseEventDataGetter !== null) {
          this.count = this.enterpriseEventDataGetter.count;
          this.enterpriseEventDataGetter.results.forEach((item) => {
            this.articleData.push(item);
          });
          this.resultData = this.articleData;
          this.$nextTick(() => {
            this.getFocusEvent();
          });
        }
      },
    },
    searchStrGetter: {
      handler() {
        this.resultData = [];
        this.articleData = [];
        this.page = 0;
        this.getEnterpriseEvent();
      },
    },
  },
  async asyncData(context) {
    return Promise.all([
      context.store.dispatch("getBannerData"),
      context.store.dispatch("getEnterpriseEvent", {
        page: 0,
        size: 12,
        // 預設未額滿且closeDate大於等於現在
        // isFull eq false and 未額滿
        search: `closeDate gte '${context
          .$moment()
          .format("YYYY-MM-DD HH:mm:ss")}`,
      }),
      context.store.dispatch("getEvent"),
      context.store.dispatch("getNpoPromote"),
    ]).catch((err) => {
      console.warn("#### Get Data fail ! #### (" + err + ") ");
    });
  },
  methods: {
    getEnterpriseEvent() {
      this.loadingFlag = true;
      return this.$store
        .dispatch("getEnterpriseEvent", {
          page: this.page++,
          size: this.size,
          search: this.searchConditionHandler(),
        })
        .then(() => {
          this.loadingFlag = false;
        });
    },
    changeHandler(searchStr) {
      this.articleData = [];
      this.resultData = [];
      this.searchStr = searchStr;
      this.page = 0;
      this.getEnterpriseEvent();
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/page/normalStyle.scss";
</style>
