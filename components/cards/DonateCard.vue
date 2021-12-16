<template>
  <div
    class="donateCard"
    @click="
      () => {
        item.newebpayUrl || item.newebpayPeriodUr
          ? _redirect(item.newebpayUrl || item.newebpayPeriodUr)
          : noWebpayHandler();
      }
    "
  >
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
      <div class="donaTitie">{{ item.name }}</div>
      <div class="donateTypeContainer">
        <!-- 定期定額 -->
        <div
          v-if="item.newebpayPeriodUrl"
          class="donateType quotaDonate"
          @click.stop="_redirect(item.newebpayPeriodUrl)"
        ></div>
        <!-- 數位捐款 -->
        <div
          v-if="item.newebpayUrl"
          class="donateType digitalDonate"
          @click.stop="_redirect(item.newebpayUrl)"
        ></div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    item: {
      type: Object,
      default() {
        return {
          name: "台東基督教醫院",
          npoIcon:
            "https://www.isharing.tw/uploads/npo/npo_icon/b5bddf828fcc458c9ed08f61ee873298.420x420.jpg",
          npoIcon: "https://donate.newebpay.com/canlove/isharing_canlove",
          description:
            "肯愛協會是一個以搶救身心憂鬱症，精神障礙關助、精神健康關護；並在肯愛中建立美好身心生活的非營利社會服助團體。\r\n連絡電話 02-6617-1885 \r\n網址http://www.canlove.org.tw/",
        };
      },
    },
  },
  methods: {
    noWebpayHandler() {
      alert(`此單位不同意使用數位捐款 \n 請選擇語音捐款或洽此單位官網,謝謝！`);
    },
  },
};
</script>
<style lang="scss" scoped>
@import "@/assets/scss/common/_variableAndUtility.scss";
@import "@/assets/scss/common/_rwd.scss";
.donateCard {
  max-width: 400px;
  width: calc((100% - 7px * 4) / 2);
  box-shadow: 0 8px 20px 0 rgba(0, 0, 0, 0.07);
  margin: 20px 7px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: normal;
  position: relative;
  padding: 18px 20px 20px;
  cursor: pointer;
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  @include BreakPointLarge {
    justify-content: space-between;
    width: calc((#{$ContainerMaxWidth} - 7px * 8) / 4);
  }
  .logo {
    max-height: calc(100vw / 2 - 50px);
    min-height: 1px;
    width: 100%;
    @include BreakPointLarge {
      height: auto;
    }
    img {
      width: 100%;
      min-height: 1px;
    }
  }
  .donaTitie {
    min-height: 48px;
    margin-top: 17px;
    text-align: left;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .donateTypeContainer {
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    @include BreakPointLarge {
      flex-direction: row;
    }
    .donateType {
      width: 100%;
      height: 35px;
      margin-top: 7px;
      background-repeat: no-repeat;
      background-size: contain;
      background-position: center;
      background-size: cover;
      &.quotaDonate {
        background-image: url("@/assets/images/donate/M/donate_quota_mobile.svg");
      }
      &.digitalDonate {
        background-image: url("@/assets/images/donate/M/donate_digital_mobile.svg");
      }
      @include BreakPointLarge {
        height: 20px;
        width: 47%;
        background-size: cover;
        &.quotaDonate {
          background-image: url("@/assets/images/donate/D/donate_quota.svg");
        }
        &.digitalDonate {
          background-image: url("@/assets/images/donate/D/donate_digital.svg");
        }
      }
    }
  }
}
</style>
