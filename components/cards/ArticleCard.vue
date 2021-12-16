<template>
  <div class="articleCard" @click="goTo(item.id)">
    <!-- @error="
        () => {
          _imageLoadError(item.image1);
        }
      " -->
    <img
      :src="item.image1"
      @error="
        (e) => {
          e.target.src = require('@/assets/images/other/default_userprofile_image.png');
        }
      "
    />
    <div>
      <div class="titleContainer">
        <div class="articleTitie">
          {{ item.subject }}
        </div>
        <Favorites
          class="favorites"
          :action_id="item.id"
          :favoritesType="favoritesType"
          :isFocus="item.isFocus"
          @focusHandler="focusHandler"
        />
      </div>

      <div class="divider"></div>
      <div class="articleContent">
        <div class="contentLeft">
          <div class="contentDetail">
            <img src="@/assets/images/other/card_time.svg" alt="" />
            <span>{{ happenDate }}</span>
            <span class="activityState">{{ activityState }}</span>
          </div>
          <div class="contentDetail">
            <img src="@/assets/images/other/card_people.svg" alt="" />
            <span
              >尚缺{{
                item.requiredVolunteerNum -
                  (item.currentVolunteerNum < 0 ? 0 : item.currentVolunteerNum)
              }}{{
                item.isVolunteerEvent === true || item.isVolunteerEvent == null
                  ? isSupplyEvent
                    ? "件"
                    : "名"
                  : "件"
              }}/共需{{ item.requiredVolunteerNum
              }}{{
                item.isVolunteerEvent === true || item.isVolunteerEvent == null
                  ? isSupplyEvent
                    ? "件"
                    : "名"
                  : "件"
              }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Favorites from "@/components/unit/Favorites.vue";
export default {
  components: {
    Favorites,
  },
  props: {
    item: {
      type: Object,
      default() {
        return {
          subject: "榮欣志工招募(長期)",
          image1:
            "https://www.isharing.tw/uploads/origin/event_90b81db6437c4f80912e6fead1397cd6.420x420.PNG",
          happenDate: "2021-01-01",
          activityState: "活動開始",
          id: "2",
          requiredVolunteerNum: 20,
          currentVolunteerNum: 13,
        };
      },
    },
    favoritesType: {
      type: String,
      default() {
        return "event";
      },
    },
    isSupplyEvent: {
      type: Boolean,
    },
  },
  computed: {
    happenDate() {
      return this._moment(this.item.happenDate).format("YYYY-MM-DD");
    },
    activityState() {
      if (
        this._moment(this.item.closeDate).valueOf() > this._moment().valueOf()
      ) {
        return "活動開始";
      } else {
        return "";
      }
    },
  },
  methods: {
    goTo(id) {
      this.$router.push(`/event/${id}`);
    },
    focusHandler(val) {
      this.$set(this.item, "isFocus", val);
      this.$emit("focusHandler", val, this.item);
    },
  },
};
</script>
<style lang="scss" scoped>
@import "@/assets/scss/common/_variableAndUtility.scss";
@import "@/assets/scss/common/_rwd.scss";
.articleCard {
  max-width: 400px;
  width: calc(100% - 40px);
  box-shadow: 0 8px 20px 0 rgba(0, 0, 0, 0.07);
  border-radius: 8px;
  font-size: 16px;
  font-weight: normal;
  position: relative;
  cursor: pointer;
  margin: 0 0 30px;
  padding: 18px 20px 20px;
  background-color: map-get($color, White);
  @include BreakPointLarge {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: calc((#{$ContainerMaxWidth} - 7px * 8) / 4);
    margin: 0 7px 20px;
  }
  img {
    width: 100%;
    min-height: 1px;
  }
  .titleContainer {
    display: flex;
    align-items: flex-start;
    margin-top: 17px;

    .articleTitie {
      flex-basis: 80%;
      overflow-wrap: anywhere;
      text-align: left;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
      min-height: 48px;
    }
    .favorites {
      flex: 1;
      justify-content: flex-end;
      @include BreakPointLarge {
        // top: 5px;
      }
      img {
        cursor: pointer;
      }
    }
  }

  .divider {
    width: 100%;
    border-bottom: 1px solid map-get($color, "White10");
    margin: 5px 0 0;
  }
  .articleContent {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 0 4px;
    .contentLeft {
      width: 100%;
      font-size: 16px;
      @include BreakPointSmall {
        font-size: 14px;
      }
      .contentDetail {
        display: flex;
        align-items: center;
        font-size: 16px;
        &:nth-child(1) {
          margin-bottom: 6px;
          .activityState {
            flex: 1;
            text-align: right;
          }
        }
        .activityState {
          align-self: flex-end;
          color: red;
          margin-left: 5px;
        }
      }
      img {
        width: 16px;
      }
    }
    .contentLeft {
      img {
        margin-right: 5px;
      }
    }
  }
}
</style>
