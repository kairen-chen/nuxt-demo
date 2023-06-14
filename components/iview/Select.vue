<template>
  <div>
    <Select
      placement="top-start"
      @on-select="changeHandler"
      :key="listKey"
      v-model="currentVal"
      :placeholder="
        this.listItem[0].disabled === true ? this.listItem[0].label : ''
      "
    >
      <Option
        v-for="(optionItem, optionIndex) in listItemFilter"
        :value="optionItem.value"
        :tag="listKey"
        :key="optionIndex"
        >{{ optionItem.label }}
      </Option>
    </Select>
  </div>
</template>

<script>
export default {
  props: {
    currentSelectObj: {
      type: Object,
      default: {
        time: "all",
        volunteerType: "",
        location: "",
        period: "all",
        fullStatus: "not_full",
      },
    },
    listKey: {
      type: String,
      default: "time",
    },
    listItem: {
      type: [Object, Array],
      default: function() {
        return [
          {
            value: "New York",
            label: "New York",
          },
          {
            value: "London",
            label: "London",
          },
        ];
      },
    },
  },
  data() {
    return {
      result: Object,
    };
  },
  computed: {
    listItemFilter() {
      return this.listItem.filter((item) => {
        return item.disabled !== true;
      });
    },
    currentVal: {
      // 設定預設值
      get() {
        // 無預設
        this.result = this.listItem[0];
        this.listItem.forEach((item) => {
          // 預設
          // if (item.selected) {
          //   this.result = item;
          // }
          // 若值有變連動desk and mobil select
          if (
            this.currentSelectObj &&
            item.value == this.currentSelectObj[this.listKey]
          ) {
            this.result = item;
          }
        });
        return this.result.value;
      },
      // 選擇後改變值
      set(val) {
        return val;
      },
    },
  },
  methods: {
    changeHandler(item) {
      this.$emit("changeHandler", item);
    },
  },
};
</script>

<style lang="scss">
@import "@/assets/scss/common/_variableAndUtility.scss";
.container {
  .ivu-select {
    width: 130px;
    margin-right: 10px;
    .ivu-select-selected-value {
      color: map-get($color, "Orange10");
    }
    .ivu-select-selection {
      // background: map-get($color, "Orange10_opacity") !important;
      // color: map-get($color, White);
      .ivu-select-placeholder {
        color: map-get($color, "Black10");
      }
    }
  }
  .ivu-select-dropdown {
    // background: map-get($color, "Orange10_opacity") !important;
    .ivu-select-item {
      // color: map-get($color, White);
      // font-weight: bold;
      font-size: 16px !important;
      &:hover {
        // background: unset;
        // color: map-get($color, White);
      }
      &.ivu-select-item-disabled {
        background: unset;
        // color: map-get($color, White);
        // border-bottom: 1px solid map-get($color, White);
      }
      &.ivu-select-item-selected {
        color: map-get($color, "Orange10");
      }
    }
    .ivu-select-item-focus,
    .ivu-select-item-focus:hover {
      // background: map-get($color, White);
      // color: map-get($color, "Orange10");
      // font-size: 18px !important;
    }
  }
}
</style>
