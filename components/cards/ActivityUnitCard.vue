<template>
  <div class="activityUnitCard" @click="goTo(item.id | item.npoId)">
    <div class="logo">
      <img
        :src="item.npoIcon"
        alt=""
        @error="
          (e) => {
            e.target.src = require('@/assets/images/other/default_userprofile_image.png');
          }
        "
      />
    </div>
    <div>
      <div class="activityUnitTitie">{{ item.name || item.npoName }}</div>
      <!-- <div class="activityContent">
        <div class="evaluation">
          <Evaluation :starNum="item.totalRatingScore || 2" />
          <div class="divider"></div>
        </div>
        <img class="icon" src="@/assets/images/other/card_people.svg" alt="" />
        <span> {{ item.ratingUserNum || 0 }} 人</span>
      </div> -->
    </div>
  </div>
</template>
<script>
import Evaluation from "@/components/unit/Evaluation.vue";
export default {
  components: {
    Evaluation,
  },
  props: {
    item: {
      type: Object,
      default() {
        return {
          name: "台北基督教醫院",
          npoIcon:
            "https://www.isharing.tw/uploads/donation_npo/0b4b230c6dfb4d858b63c9fea7b1a78d.420x420.png",

          totalRatingScore: 3,
          ratingUserNum: 3,
          id: "2",
        };
      },
    },
  },
  methods: {
    async goTo(id) {
      this.$router.push(`/npo/${id}`);
    },
  },
};
</script>
<style lang="scss" scoped>
@import "@/assets/scss/common/_variableAndUtility.scss";
@import "@/assets/scss/common/_rwd.scss";
.activityUnitCard {
  max-width: 400px;
  width: calc((100% - 7px * 4) / 2);
  box-shadow: 0 8px 20px 0 rgba(0, 0, 0, 0.07);
  margin: 0 7px 20px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: normal;
  position: relative;
  cursor: pointer;
  padding: 18px 20px 16px;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  background-color: map-get($color, White);
  @include BreakPointLarge {
    width: calc((#{$ContainerMaxWidth} - 7px * 8) / 4);
  }
  .logo {
    // max-height: calc(100vw / 2 - 40px);
    height: calc(100vw / 2 - 40px);
    display: flex;
    align-items: center;
    justify-content: center;
    @include BreakPointLarge {
      // height: auto;
      width: 186px;
      height: 186px;
    }
    img {
      // width: 100%;
      // min-height: 1px;
      max-height: 100%;
      max-width: 100%;
    }
  }
  .activityUnitTitie {
    min-height: 48px;
    margin: 17px 0 0;
    text-align: left;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .activityContent {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-wrap: wrap;
    color: map-get($color, "Orange10");
    .evaluation {
      display: flex;
      align-items: center;
      flex-basis: 100%;
      margin-bottom: 6px;
      .divider {
        width: 1px;
        height: 16px;
        margin: 0 8px;
        border: 0;
      }
      @include BreakPointLarge {
        flex-basis: unset;
        margin-bottom: 0px;
        .divider {
          border-right: 1px solid map-get($color, "Gary30");
        }
      }
    }
    .icon {
      width: 18px;
      margin: 0 5px 0 0;
      @include BreakPointLarge {
        margin: 3px 5px 3px 0;
      }
    }
    span {
      color: map-get($color, "Gary40");
    }
  }
}
</style>
