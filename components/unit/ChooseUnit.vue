<template>
  <section>
    <div class="chooseContainer" v-if="data.isVolunteerEvent">
      <div class="title">
        {{ data.requiredGroup ? "請選擇您要參加的組別？" : "您需具備的技能" }}
      </div>
      <div v-if="data.requiredGroup">
        <div
          class="inputContent"
          v-for="(item, index) of data.skillGroups"
          :key="index"
        >
          <input
            :id="`radio_${index}`"
            type="radio"
            :value="item"
            v-model="chooseResult"
          />
          <label :for="`radio_${index}`" class="chooseContent">
            <div class="left">
              <div class="infoTitle">
                {{ item.name }}
                <span>:</span>
                {{ item.skillsDescription }}(剩餘
                {{ item.volunteerNumber - item.currentVolunteerNumber }}
                人)
              </div>
            </div>
          </label>
        </div>
      </div>
      <!-- no skillGroups -->
      <div class="inputContent" v-else>
        <input
          id="radio"
          type="radio"
          :value="data.skillsDescription"
          :checked="true"
        />
        <label for="radio"
          >{{ data.skillsDescription }}
          {{
            data.requiredGroup
              ? `(剩餘 ${data.requiredVolunteerNum -
                  data.currentVolunteerNum} 人) `
              : ""
          }}
        </label>
      </div>
    </div>

    <!-- 物資 -->
    <div class="chooseContainer " v-else>
      <div class="title">物資需求</div>
      <div v-if="data.requiredGroup">
        <div
          class="chooseContent"
          v-for="(item, index) of data.skillGroups"
          :key="index"
        >
          <div class="left">
            <div class="infoTitle">
              {{ item.name }}
              <span>:</span>
              {{ item.skillsDescription }}(剩餘
              {{ item.volunteerNumber - item.currentVolunteerNumber }}
              份)
            </div>
            <div class="countContent">
              <div class="plus" @click="countChange(item, 'plus')"></div>
              <input
                type="number"
                min="0"
                :max="item.volunteerNumber - item.currentVolunteerNumber"
                v-model.number="item.count"
                @change="countChange(item)"
              />
              <div class="minus" @click="countChange(item, 'minus')"></div>
            </div>
          </div>
        </div>
      </div>
      <div class="inputContent" v-else>
        <input
          id="radio"
          type="radio"
          :value="data.skillsDescription"
          :checked="true"
        />
        <label for="radio">{{ data.skillsDescription }}</label>
      </div>
    </div>

    <!-- 複選 -->
    <!-- <div class="chooseContainer">
      <div class="title">請選擇您具備的技能</div>
      <div class="inputContent">
        <input id="A" type="checkbox" v-model="chooseResult" value="A" />
        <label for="A">洗碗</label>
      </div>
      <div class="inputContent">
        <input id="B" type="checkbox" v-model="chooseResult" value="B" />
        <label for="B">拖地</label>
      </div>
    </div> -->
  </section>
</template>
<script>
export default {
  props: ["type", "data"],
  data() {
    return {
      chooseResult: null,
    };
  },
  watch: {
    data: {
      immediate: true,
      handler() {
        if (this.data.requiredGroup) {
          // 物資
          if (!this.data.isVolunteerEvent) {
            this.chooseResult = {};
            this.data.skillGroups.forEach((item) => {
              item.count = 0;
            });
            // 志工
          } else {
            this.chooseResult = this.data.skillGroups
              ? this.data.skillGroups[0]
              : "";
          }
        } else {
          this.data.skillsDescription = this.data.skillsDescription
            ? this.data.skillsDescription
            : "無";
          // 處理requiredGroup=0,有/無skillGroups id
          if (this.data.skillGroups && this.data.requiredGroup) {
            this.chooseResult = this.data.skillGroups[0].id || "";
          } else {
            this.chooseResult = "noId";
          }
        }
      },
    },
    chooseResult: {
      immediate: true,
      handler() {
        this.$emit("chooseHandler", this.chooseResult);
      },
    },
  },
  methods: {
    countChange(item, type) {
      let maxCount = item.volunteerNumber - item.currentVolunteerNumber;
      // + / -
      if (type) {
        if (type === "plus") {
          if (item.count < maxCount) {
            item.count++;
          }
        } else {
          if (item.count > 0) item.count--;
        }
      }
      // input
      else {
        if (item.count === "" || item.count < 0) {
          item.count = 0;
        } else if (item.count > maxCount) {
          item.count = maxCount;
        }
      }
      this.$forceUpdate();
      this.chooseResult[item.id] = JSON.parse(JSON.stringify(item));
      // delete
      if (item.count < 1) {
        delete this.chooseResult[item.id];
      }
      this.$emit("chooseHandler", this.chooseResult);
    },
  },
};
</script>
<style lang="scss" scoped>
@import "@/assets/scss/common/_common.scss";
.articleFileContainer {
  .acitvityInfoContent {
    .chooseContainer {
      padding: 10px;
      border: 1px dashed map-get($color, Black);
      background-color: map-get($color, White);
      margin-top: 20px;
      display: flex;
      flex-direction: column;
      .inputContent {
        display: flex;
        align-items: flex-start;
        input[type="radio"] {
          margin-top: 4px;
          margin-right: 5px;
        }
        &:not(:last-child) {
          margin-bottom: 10px;
        }
      }
      .title {
        font-size: 16px;
        border: 0;
        margin-bottom: 10px;
        color: map-get($color, "Gary40");
      }
      .chooseContent {
        position: relative;
        display: flex;
        &:not(:last-child) {
          margin-bottom: 10px;
        }
      }
      .countContent {
        display: inline-flex;
        align-items: center;
        position: relative;
        input::-webkit-outer-spin-button,
        input::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
        /* Firefox */
        input[type="number"] {
          -moz-appearance: textfield;
        }
        input[type="number"] {
          border: 1px solid map-get($color, "Gary50");
          width: 60px;
          font-size: 16px;
          margin: 0 10px;
          border-radius: 4px;
          height: 26px;
          text-align: center;
        }
        .label {
          font-size: 16px;
        }
        .plus,
        .minus {
          width: 18px;
          height: 18px;
          border-radius: 25px;
          background-color: map-get($color, "Orange10");
          &::before {
            content: "";
            width: 13px;
            height: 2px;
            position: absolute;
            top: 12px;
            background-color: map-get($color, White);
          }
        }
        .plus {
          &::before {
            left: 3px;
          }
          &::after {
            content: "";
            width: 2px;
            height: 14px;
            position: absolute;
            top: 6px;
            left: 8px;
            background-color: map-get($color, White);
          }
        }
        .minus {
          &::before {
            left: 101px;
          }
        }
      }
      .left {
        word-break: break-all;
      }
    }
  }
}
</style>
