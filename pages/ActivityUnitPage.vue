<template>
  <div class="wrapper">
    <div class="container">
      <div class="selectContent">
        <BreadCrumb />
        <Select
          class="select"
          :listItem="option"
          :listKey="'isEnterprise'"
          @changeHandler="changeHandler"
          :currentSelectObj="select"
        />
      </div>
      <Waterfall>
        <ActivityUnitCard
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
        @readMore="getActivityUnitData()"
      />
      <ProcessAPIState
        :dataLength="resultData.length"
        :loadingFlag="loadingFlag"
      />
    </div>
  </div>
</template>
<script>
import ActivityUnitCard from "@/components/cards/ActivityUnitCard.vue";
import waterfallMixin from "@/plugins/mixins/waterfallMixin";
import Select from "@/components/iview/Select.vue";
import ProcessAPIState from "@/components/unit/ProcessAPIState.vue";
import ReadMore from "@/components/unit/ReadMore.vue";
import { mapGetters } from "vuex";

export default {
  mixins: [waterfallMixin],
  components: {
    ActivityUnitCard,
    Select,
    ProcessAPIState,
    ReadMore,
  },
  data() {
    return {
      option: [
        {
          value: "all",
          label: "全部",
        },
        {
          value: "false",
          label: "NPO / 團體機關",
        },
        {
          value: "true",
          label: "企業",
        },
      ],
      select: {
        // 預設
        isEnterprise: "all",
      },
      activityUnitData: [],
      loadingFlag: false,
    };
  },
  computed: {
    ...mapGetters(["activityUnitGetter"]),
  },
  watch: {
    activityUnitGetter: {
      immediate: true,
      handler() {
        if (this.activityUnitGetter !== null) {
          this.count = this.activityUnitGetter.count;
          this.activityUnitGetter.results.forEach((item) => {
            this.activityUnitData.push(item);
          });
          this.resultData = this.activityUnitData;
        }
      },
    },
    select: {
      immediate: false,
      handler() {
        this.searchStr = "isVerified eq true";
        let { isEnterprise } = this.select;
        if (isEnterprise == "all") {
          this.searchStr += "";
        } else {
          this.searchStr += ` and isEnterprise eq ${isEnterprise}`;
        }
        this.resultData = [];
        this.activityUnitData = [];
        this.page = 0;
        this.getActivityUnitData();
      },
    },
    searchStrGetter: {
      handler() {
        this.resultData = [];
        this.activityUnitData = [];
        this.page = 0;
        this.getActivityUnitData();
      },
    },
  },
  async asyncData(context) {
    await context.store.dispatch("getActivityUnitData", {
      page: 0,
      size: 12,
      search: "isVerified eq true",
      sort: `name,desc`,
    });
  },
  methods: {
    getActivityUnitData() {
      this.loadingFlag = true;
      return this.$store
        .dispatch("getActivityUnitData", {
          page: this.page++,
          size: this.size,
          search: this.searchConditionHandler(),
          sort: `name,desc`,
        })
        .then(() => {
          this.loadingFlag = false;
        });
    },
    changeHandler(item) {
      this.select = Object.assign({}, this.select, {
        [item.tag]: item.value,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/page/normalStyle.scss";
.container {
  .selectContent {
    display: flex;
    justify-content: flex-end;
    .select {
      display: inline-block;
      margin: 20px 0;
    }
  }
  .waterfall {
    justify-content: flex-start;
  }
}
</style>
