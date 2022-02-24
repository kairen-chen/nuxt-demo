export default ({ app, route, redirect }) => {
  app.router.beforeEach((to, from, next) => {
    // 站內過來的
    if (from.matched.length) {
      const fromMatch = from.matched[0],
        toMatch = to.matched[0];
      let defaultComponent = null;
      // 處理前一個
      if (fromMatch.meta.type === "container" && to.meta.type === "content") {
        console.log("@@@", 1);
        defaultComponent = fromMatch.components.default;
      } else if (fromMatch.components.lightbox) {
        console.log("@@@", 2);
        defaultComponent = fromMatch.components.default;
        fromMatch.components.default = fromMatch.components.lightbox;
        fromMatch.components.lightbox = null;
        from.meta.lightbox = false;
      }

      // 處理下一個
      if (defaultComponent && to.meta.type === "content") {
        console.log("@@@", 3);
        /*
          component互換的概念
        */
        //  lightbox是建構在default.vue的router-view name
        toMatch.components.lightbox = toMatch.components.default;
        toMatch.components.default = defaultComponent;
        to.meta.lightbox = true;
      }
    }
    next();
  });
};
