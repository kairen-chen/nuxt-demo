<template>
  <div class="articleSelectContainer">
    <section class="mobile" :class="selectotShow ? 'active' : ''">
      <div class="title" @click="selectotShow = !selectotShow">
        活動篩選
        <Icon :type="!selectotShow ? 'ios-arrow-down' : 'ios-arrow-up'" />
      </div>
      <transition-group appear name="select" tag="div">
        <section
          class="selectContent"
          v-show="selectotShow"
          v-for="(listItem, listKey) in articleTypeList"
          :key="`mobile_${listKey}`"
        >
          <Select
            v-if="show(listKey)"
            :listItem="listItem"
            :listKey="listKey"
            :currentSelectObj="articleSelect"
            @changeHandler="changeHandler"
          />
        </section>
      </transition-group>
    </section>
    <section class="deskTop">
      <div class="title">篩選</div>
      <section v-for="(listItem, listKey) in articleTypeList" :key="listKey">
        <Select
          v-if="show(listKey)"
          :listItem="listItem"
          :listKey="listKey"
          :currentSelectObj="articleSelect"
          @changeHandler="changeHandler"
        />
      </section>
      <!-- <div class="clear">清空條件</div> -->
    </section>
  </div>
</template>

<script>
import articleTypeList from "@/plugins/data/articleSelectData";
import Select from "@/components/iview/Select.vue";

export default {
  props: {
    supply: {
      default: false,
    },
  },
  components: {
    Select,
  },
  computed: {
    articleTypeList() {
      return articleTypeList;
    },
  },
  data() {
    return {
      selectotShow: false,
      articleSelect: {
        // 預設值
        fullStatus: "not_full",
      },
      searchStr: "",
    };
  },
  watch: {
    articleSelect: {
      // immediate: true,
      handler() {
        this.searchStr = "";
        let {
            time,
            volunteerType,
            supplyType,
            location,
            period,
            fullStatus,
          } = this.articleSelect,
          andHandler = (searchStr, result) => {
            return searchStr == "" ? "" : result == "" ? "" : ` and `;
          },
          timeHandler = (val) => {
            /*
              使用參考: https://codertw.com/%E7%A8%8B%E5%BC%8F%E8%AA%9E%E8%A8%80/122725/#outline__1_1_1_1
              use moment
              console.log(
                context.$moment("2015-12-16 16:00:00"),
                // object
                context.$moment().format("YYYY-MM-DD HH:mm:ss"),
                // 現在時間 -> 2021-xx-xx xx:00:00
                context.$moment("2015-12-16 16:00:00").format("YYYY-MM-DD HH:mm:ss"),
                // 2015-12-16 16:00:00
                context.$moment("2015-12-16 16:00:00").valueOf()
                // 1450252800000
              );

              注意: 後端的API SQL 只要是撈全部的就給空字串!!!!
           */
            let result = "";
            if (val === "today") {
              result = this.$moment()
                .endOf("day")
                .format("YYYY-MM-DD HH:mm:ss");
            } else if (val === "week") {
              result = this.$moment()
                .endOf("day")
                .add(7, "days")
                .format("YYYY-MM-DD HH:mm:ss");
            } else if (val === "month") {
              result = this.$moment()
                .endOf("day")
                .add(30, "days")
                .format("YYYY-MM-DD HH:mm:ss");
            } else {
              result = "";
            }
            return result
              ? `${andHandler(
                  this.searchStr,
                  result
                )}closeDate between '${this.$moment()
                  .startOf("day")
                  .format("YYYY-MM-DD HH:mm:ss")},${result}'`
              : result;
          },
          volunteerTypeHandler = (val) => {
            let result = "";
            if (val == "all") {
              result = "";
            } else if (val) {
              result = `volunteerType like '${val}'`;
            }
            return `${andHandler(this.searchStr, result)}${result}`;
          },
          locationHandler = (val) => {
            let result = "";
            if (val == "all") {
              result = "";
            } else if (val) {
              result = `addressCity like '${val}'`;
            }
            return `${andHandler(this.searchStr, result)}${result}`;
          },
          periodHandler = (val) => {
            let result = "";
            if (val === "urgent") {
              result = `isUrgent eq true`;
            } else if (val === "short") {
              result = `isShort eq true`;
            } else if (val === "long") {
              result = `isShort eq 'false'`;
            }
            return `${andHandler(this.searchStr, result)}${result}`;
          },
          fullStatusHandler = (val) => {
            // 已額滿且已截止的活動不顯示
            // 已額滿且未截止要顯示
            // 只要已截止皆不顯示 (不管是否額滿)
            let closeDate = () => {
              if (!time || time === "all") {
                return `${
                  result ? " and " : ""
                }closeDate gte '${this.$moment().format(
                  "YYYY-MM-DD HH:mm:ss"
                )}'`;
              } else {
                return "";
              }
            };
            let result = "";
            if (val == "all") {
              result = closeDate();
            } else if (val === "not_full") {
              result = `isFull eq false`;
              result += closeDate();
            } else if (val === "is_full") {
              result = `isFull eq true`;
              result += closeDate();
            }
            return `${andHandler(this.searchStr, result)}${result}`;
          },
          supplyTypelHandler = (val) => {
            let result = "";
            if (val == "all") {
              result = "";
            } else if (val) {
              result = `volunteerType like '${val}'`;
            }
            return `${andHandler(this.searchStr, result)}${result}`;
          };
        this.searchStr = timeHandler(time);
        this.searchStr += !this.supply
          ? volunteerTypeHandler(volunteerType)
          : supplyTypelHandler(supplyType);
        this.searchStr += locationHandler(location);
        this.searchStr += periodHandler(period);
        this.searchStr += fullStatusHandler(fullStatus);
        this.$emit("changeHandler", this.searchStr, this.articleSelect);
      },
    },
  },
  mounted() {},
  methods: {
    changeHandler(item) {
      this.articleSelect = Object.assign({}, this.articleSelect, {
        [item.tag]: item.value,
      });
    },
    show(listKey) {
      return this.supply
        ? listKey == "volunteerType"
          ? false
          : true
        : listKey == "supplyType"
        ? false
        : true;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/common/_variableAndUtility.scss";
@import "@/assets/scss/common/_rwd.scss";
.articleSelectContainer {
  text-align: center;
  font-size: 16px;
  .deskTop {
    display: none;
  }
  @include BreakPointLarge {
    .mobile {
      display: none;
    }
    .deskTop {
      display: flex;
      background-color: map-get($color, "White30");
      margin: 20px 0;
      padding: 0 20px;
      height: 60px;
      align-items: center;
      border-radius: 8px;
      .title {
        margin-right: 15px;
        font-family: PingFangTC;
      }
      .clear {
        margin-left: 5px;
        color: map-get($color, "Blue20");
      }
    }
  }
  .mobile {
    height: 51px;
    transition: all 0.5s;
    &.active {
      transition: all 0.5s;
      height: 285px;
    }
    .title {
      display: inline-block;
      padding: 10px 0 17px;
      cursor: pointer;
      font-weight: bold;
      font-size: 16px;
    }
    .selectContent {
      margin-bottom: 10px;
    }
    .select-enter-active,
    .select-leave-active {
      transition: all 0.5s;
    }
    .select-enter,
    .select-leave-to {
      opacity: 0;
      transform: translateY(-10px);
    }
  }
}
</style>
