<template>
  <!-- 
    目前已關注人數，已登入狀態可點擊愛心icon加入/取消關注
    目前已報名人數
    按鈕顯示根據以下情況判斷：
    未額滿：
    顯示我要報名Button，已登入狀態並選擇完技能，可點擊前往報名活動頁。
    未登入情況點擊前往登入頁面，登入成功後回到活動頁。如果此活動後台設定需要保險，請顯示有需保險字樣的圖示。(如右圖)
    已額滿：
    顯示報名結束按鈕
    已報名：
    顯示取消報名按鈕，點擊後完成取消報名並發信通知用戶。
 -->
  <section>
    <div class="content">
      <div class="registered">
        目前{{ data.isVolunteerEvent ? "已報名" : "已捐贈"
        }}<span class="signUpNum">
          {{
            data.currentVolunteerNum < 0 ? 0 : data.currentVolunteerNum
          }} </span
        >{{ data.isVolunteerEvent ? "人" : "件" }}
      </div>
      <button v-if="isJoined && !isLeaved" class="marginLeft registEnd">
        {{ data.isVolunteerEvent ? "您已報到" : "您已捐贈" }}
      </button>
      <button v-else-if="isLeaved" class="marginLeft registEnd">
        {{ data.isVolunteerEvent ? "您已簽退" : "您已捐贈成功" }}
      </button>
      <button
        v-else-if="
          data.overRegisterDateFlag ||
            (data.isFull && !data.overRegisterDateFlag)
        "
        class="marginLeft registEnd"
      >
        {{ data.isVolunteerEvent ? "報名結束" : "募集結束" }}
      </button>
      <!-- 取消 -->
      <button
        v-else-if="isRegistered"
        class="marginLeft registCancel cursor"
        @click="deleteRegistSubmit"
        v-prevent-re-click
      >
        {{ data.isVolunteerEvent ? "取消報名" : "取消捐贈" }}
      </button>
      <button
        v-else-if="data.isVolunteerEvent"
        class="marginRight cursor"
        :class="data.insurance ? 'insurance' : ''"
        @click.prevent="registerHandler()"
      >
        <!-- 需要保險 -->
        <img
          v-show="data.insurance"
          src="@/assets/images/other/insurance.svg"
          alt=""
        />
        我要報名
      </button>
      <button
        v-else-if="!data.isVolunteerEvent"
        class="marginRight cursor"
        @click.prevent="registerHandler()"
      >
        我要捐
      </button>
      <div class="divider"></div>
      <div class="block">
        <Favorites
          class="favorites"
          :action_id="data.id"
          :favoritesType="$route.name"
          :isFocus="isFocus"
          @focusHandler="focusHandler"
        />
        <div class="numBlock">{{ data.focusNum }}</div>
      </div>
    </div>
  </section>
</template>
<script>
import Favorites from "@/components/unit/Favorites.vue";
import { mapGetters } from "vuex";

export default {
  props: ["data", "isRegistered", "isFocus", "isJoined", "isLeaved"],
  components: {
    Favorites,
  },
  computed: {
    ...mapGetters(["profileGetter"]),
  },
  methods: {
    registerHandler() {
      this.$router
        .replace({
          name: "signInEvent",
          params: this.$route.params.id,
        })
        .catch(() => {});
    },
    deleteRegistSubmit() {
      this._API.deleteEventRegister.requestCommon(this.data.id);
      this._API.deleteEventRegister.send(this.data.id).then((res) => {
        if (!res[0].errors) {
          this.$Notice.success({
            title: "已取消",
          });
          this.$emit("deleteRegistHandler");
        } else {
          this.errorNotice(res[0].errors[0].error);
        }
      });
    },
    focusHandler() {
      this.$emit("focusHandler");
    },
  },
};
</script>
<style lang="scss" scoped>
@import "@/assets/scss/common/_common.scss";
.articleFileContainer {
  .content {
    margin: 10px 0;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    font-size: 16px;
    .block {
      display: flex;
      align-items: center;
      flex-basis: 10%;
      .favorites::v-deep {
        width: 30px;
        img {
          min-width: 30px;
        }
      }
    }
    .numBlock {
      position: relative;
      margin-left: 4px;
      color: map-get($color, "Gary40");
      font-weight: 500;
    }
    .registered {
      margin-right: 10px;
    }
    .insurance {
      position: relative;
      padding-left: 25px;
      img {
        position: absolute;
        top: -5px;
        left: 30px;
      }
      @include BreakPointMinSmall {
        img {
          left: 30px;
        }
      }
    }
    @media (max-width: 414px) {
      .registered {
        width: 100%;
        text-align: center;
        margin-bottom: 20px;
        margin-right: 0;
      }
    }
    .signUpNum {
      font-size: 20px;
      color: map-get($color, "Orange10");
    }
    button {
      flex: 1;
      min-width: 170px;
      max-width: 170px;
      padding: 11px 0;
      font-size: 16px;
      font-weight: bold;
      border-radius: 21px;
      border: 0;
      background-color: map-get($color, "Yellow10");
      color: map-get($color, "Black10");
      &.registEnd {
        color: map-get($color, White);
        background-color: map-get($color, "Gary30");
      }
      &.registCancel {
        color: map-get($color, White);
        background-image: linear-gradient(
          to right,
          map-get($color, "Orange10"),
          map-get($color, "Orange20")
        );
      }
    }
    .cursor {
      cursor: pointer;
    }
  }
  .divider {
    width: 1px;
    height: 34px;
    margin: 0 15px;
    border-right: 1px solid #bebebe;
  }
}
</style>
