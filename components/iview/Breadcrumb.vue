<template>
  <div class="breadcrumbContainer">
    <Breadcrumb separator="<div class='retang'></div>">
      <BreadcrumbItem :to="{ name: 'home' }">首頁</BreadcrumbItem>
      <span v-for="(item, index) in breadcrumbData" :key="item.routeName">
        <BreadcrumbItem
          v-if="index + 1 !== breadcrumbData.length"
          :to="{ name: item.routeName }"
          >{{ item.title }}</BreadcrumbItem
        >
        <BreadcrumbItem v-else>{{ item.title }}</BreadcrumbItem>
      </span>
    </Breadcrumb>
  </div>
</template>

<script>
export default {
  props: {
    route: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      parentRouteName: "",
    };
  },
  computed: {
    breadcrumbData() {
      if (
        this.route.from &&
        (this.route.from.name == "home" ||
          this.route.from.name == "enterprise" ||
          this.route.from.name == "supply")
      ) {
        this.parentRouteName = this.route.from.name;
      }

      // 報名活動因會觸發this.route.from,所以另外
      if (this.$route.name === "signInEvent") {
        return this.eventBreadcrumb();
      }

      switch (this.$route.name) {
        case "event":
          if (this.route.from) {
            return this.eventBreadcrumb();
          } else {
            return [{ title: "活動" }];
          }
        case "donate":
          return [{ title: "捐款" }];
        case "npo":
          return [{ title: "活動單位" }];
        case "eventUnit":
          return [
            { title: "活動單位", routeName: "npo" },
            { title: "關於單位" },
          ];
        case "me":
          return [{ title: "個人資料" }];
        case "meEdit":
          return [{ title: "個人資料", routeName: "me" }, { title: "編輯" }];
        case "footerAbout":
          return [{ title: "關於我們" }];
        case "footerJoin":
          return [{ title: "成為夥伴" }];
        case "footerFaq":
          return [{ title: "常見問題" }];
        case "footerPrivacy":
          return [{ title: "隱私權政策" }];
        case "footerTos":
          return [{ title: "服務條款" }];
      }
    },
  },
  methods: {
    homeFlag() {
      return this.route.from ? this.route.from.name !== "home" : true;
    },
    eventBreadcrumb() {
      let result = [];
      if (this.route.from)
        if (
          this.route.from.name === "home" ||
          this.parentRouteName === "home"
        ) {
          result.push({ title: "志工", routeName: "home" });
        } else if (
          this.route.from.name === "enterprise" ||
          this.parentRouteName === "enterprise"
        ) {
          result.push({ title: "企業志工", routeName: "enterprise" });
        } else if (
          this.route.from.name === "supply" ||
          this.parentRouteName === "supply"
        ) {
          result.push({ title: "物資", routeName: "supply" });
        }
      result.push({ title: "活動" });
      return result;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/common/_common.scss";
.breadcrumbContainer::v-deep {
  width: 100%;
  .ivu-breadcrumb {
    max-width: $ContainerMaxWidth;
    color: map-get($color, "Black10");
    font-size: 16px;
    margin: 13px 0 15px 10px;
    text-align: left;
    @include BreakPointLarge {
      margin-top: 26px;
    }
  }
  .ivu-breadcrumb-item-separator {
    margin: 0 4px 0;
  }
  .retang {
    display: inline-block;
    width: 8px;
    height: 8px;
    transform: rotate(45deg);
    border-right: 3px solid map-get($color, "Gary30");
    border-top: 3px solid map-get($color, "Gary30");
    margin: 0 5px 1px 0;
  }
}
</style>
