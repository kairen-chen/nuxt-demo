import Waterfall from "@/components/unit/Waterfall.vue";
import { mapGetters } from "vuex";

export default {
  components: {
    Waterfall,
  },
  computed: {
    ...mapGetters(["searchStrGetter", "profileGetter", "webVisibilityGetter"]),
  },
  watch: {
    profileGetter: {
      immediate: true,
      handler() {
        if (!this.profileGetter) {
          this.resetFocusEvent();
        } else {
          this.getFocusEvent();
        }
      },
    },
    webVisibilityGetter: {
      handler(flag) {
        if (flag) {
          this.resultData.forEach((item) => {
            this.$set(item, "isFocus", false);
          });
          this.getFocusEvent();
        }
      },
    },
  },
  data() {
    return {
      // 頁數
      page: 1,
      // 一次12筆
      size: 12,
      // 總數
      count: 0,
      // orgin Data
      articleData: [],
      // filter Data
      saerchData: [],
      // render Data
      resultData: [],
      // API search condition
      searchStr: null,
    };
  },
  mounted() {
    document.getElementsByClassName("loading")[0].style.display = "none";
  },
  methods: {
    // 搜尋條件
    searchConditionHandler() {
      let inputResult = "";
      // 捐款
      if (this.$route.name === "donate") {
        if (this.searchStrGetter) {
          inputResult = `name like ${this.searchStrGetter}`;
        }
        return inputResult;
      }
      // 活動單位
      else if (this.$route.name === "npo") {
        if (this.searchStrGetter) {
          inputResult = ` and name like ${this.searchStrGetter}`;
        }
        return this.searchStr === null
          ? "isVerified eq true" + inputResult
          : this.searchStr + inputResult;
      }
      // 個人資料,各項活動
      else if (this.$route.name === "me") {
        let colName = "";
        if (this.currentTab === "subscribedNpo") {
          colName = "npoName";
        } else {
          colName = "subject";
        }
        return this.searchStrGetter
          ? `${colName} like ${this.searchStrGetter}`
          : "";
      }
      // 志工.企業志工.物資
      else {
        if (this.searchStrGetter) {
          inputResult = ` and subject like ${this.searchStrGetter}`;
        }
        return this.searchStr === null
          ? `isFull eq false and closeDate gte '${this.$moment().format(
              "YYYY-MM-DD HH:mm:ss"
            )}${inputResult}`
          : this.searchStr + inputResult;
      }
    },
    // 處理關注狀態
    getFocusEvent() {
      if (process.client && document.querySelector(".favorites")) {
        if (this.profileGetter) {
          let routeName = this.$route.name;
          if (this.resultData.length > 0 || routeName !== "eventUnit") {
            let search = {
                // 志工 0 / 企業志工 1
                search: `isEnterprise eq ${routeName == "home" ? 0 : 1}`,
              },
              APIName =
                routeName !== "supply" ? "getFocusEvent" : "getSuppliedFocus";

            this._API[APIName].send(routeName !== "supply" ? search : "").then(
              (res) => {
                res.results.forEach((focusItem) => {
                  this.resultData.forEach((resultItem) => {
                    if (focusItem.id === resultItem.id) {
                      this.$set(resultItem, "isFocus", true);
                    }
                  });
                });
              }
            );
          }
          // 活動單位 過去活動回顧/即將舉辦的活動
          else {
            this._API.getFocusEvent
              .send({
                search: `isEnterprise eq 0`,
              })
              .then((res) => {
                res.results.forEach((focusItem) => {
                  this[this.currentTab].forEach((resultItem) => {
                    if (focusItem.id === resultItem.id) {
                      this.$set(resultItem, "isFocus", true);
                    }
                  });
                });
              });
          }
        }
      }
    },
    resetFocusEvent() {
      if (this[!this.currentTab ? "resultData" : this.currentTab].length)
        this[!this.currentTab ? "resultData" : this.currentTab].forEach(
          (resultItem) => {
            this.$set(resultItem, "isFocus", null);
          }
        );
    },
  },
};
