<template>
  <div class="wrapper">
    <div class="container">
      <BreadCrumb />
      <Waterfall>
        <DonateCard
          v-for="(item, index) in resultData"
          :key="index"
          :item="item"
        />
      </Waterfall>
      <ReadMore
        :loadingFlag="loadingFlag"
        :dataLength="resultData.length"
        :searchStrGetter="searchStrGetter"
        :count="count"
        @readMore="getDonateData()"
      />
      <ProcessAPIState
        :dataLength="resultData.length"
        :loadingFlag="loadingFlag"
      />
    </div>
  </div>
</template>

<script>
import DonateCard from "@/components/cards/DonateCard.vue";
import waterfallMixin from "@/plugins/mixins/waterfallMixin";
import ProcessAPIState from "@/components/unit/ProcessAPIState.vue";
import ReadMore from "@/components/unit/ReadMore.vue";
import { mapGetters } from "vuex";

export default {
  mixins: [waterfallMixin],
  components: {
    DonateCard,
    ProcessAPIState,
    ReadMore,
  },
  data() {
    return {
      donateData: [],
      loadingFlag: false,
    };
  },
  computed: {
    ...mapGetters(["donateDataGetter"]),
  },
  watch: {
    donateDataGetter: {
      immediate: true,
      handler() {
        if (this.donateDataGetter !== null) {
          this.count = this.donateDataGetter.count;
          this.donateDataGetter.results.forEach((item) => {
            item.name = this.nameFilter(item.name);
            this.donateData.push(item);
          });
          this.resultData = this.donateData;
        }
      },
    },
    searchStrGetter: {
      handler() {
        this.resultData = [];
        this.donateData = [];
        this.page = 0;
        this.getDonateData();
      },
    },
  },
  async asyncData(context) {
    await context.store.dispatch("getDonateData", {
      page: 0,
      size: 12,
      sort: `displaySort,desc`,
    });
  },
  methods: {
    nameFilter(str) {
      let reg = /社團法人|財團法人/g;
      return str.replace(reg, "");
    },
    getDonateData() {
      this.searchConditionHandler();
      this.loadingFlag = true;
      return this.$store
        .dispatch("getDonateData", {
          page: this.page++,
          size: this.size,
          sort: `displaySort,desc`,
          search: this.searchConditionHandler(),
        })
        .then(() => {
          this.loadingFlag = false;
        });
    },
    // alert('此單位不同意使用數位捐款\n請選擇語音捐款或洽此單位官網，謝謝！')
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/page/normalStyle.scss";
.waterfall {
  justify-content: flex-start;
}
</style>
