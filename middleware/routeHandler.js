import Pic from "~/pages/Pic.vue";
export default ({ app, route, redirect }) => {
  /*
    請勿在universal使用
    
    !!!! mode: "universal",時首次會跑SSR,beforeEach不執行,所以首次點擊list方框不會開啟lightbox

    !!!! 解法:在PicList.vue內做beforeRouteLeave
  */
  // app.router.beforeEach((to, from, next) => {
  //   // 站內過來的
  //   if (from.matched.length) {
  //     const fromMatch = from.matched[0];
  //     const toMatch = to.matched[0];
  //     let defaultComponent = null;
  //     // 處理前一個
  //     if (fromMatch.meta.type === "container" && to.meta.type === "content") {
  //       defaultComponent = fromMatch.components.default;
  //     } else if (fromMatch.components.lightbox) {
  //       defaultComponent = fromMatch.components.default;
  //       fromMatch.components.default = fromMatch.components.lightbox;
  //       fromMatch.components.lightbox = null;
  //       fromMatch.meta.lightbox = false;
  //     }
  //     // 處理下一個
  //     if (defaultComponent && to.meta.type === "content") {
  //       //modify bug way1
  //       if (!toMatch.components.lightbox) {
  //         //  lightbox是建構在default.vue的router-view name
  //         toMatch.components.lightbox = toMatch.components.default;
  //       }
  //       // toMatch.components.lightbox = Pic; // modify bug way2
  //       toMatch.components.default = defaultComponent;
  //       to.meta.lightbox = true;
  //     }
  //   }
  //   next();
  // });
};
