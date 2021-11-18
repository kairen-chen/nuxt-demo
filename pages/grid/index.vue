<template>
  <div class="container">
    <div class="context1">
      <a
        class="item href"
        href="https://ballaediworkshop.blogspot.com/2019/10/css-grid-introduction-and-tutorial.html"
        >ref</a
      >
      <div class="item a">A</div>
      <div class="item b">B</div>
      <div class="item c">C123C123C123C123</div>
    </div>

    <div class="context2">
      <a
        class="item href"
        href="https://ballaediworkshop.blogspot.com/2019/10/css-grid-introduction-and-tutorial.html"
        >ref</a
      >
      <div class="item a">A</div>
      <div class="item b">B</div>
      <div class="item c">C</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  flex-direction: column;
  //   display: grid;
  //   grid-template-columns: 100%;
  //   grid-template-rows: 100%;
  //   box-sizing: border-box;
  //   height: 100%;
}
.context1 {
  width: 100%;
  display: grid; /*(縱列)*/
  //   display: inline-grid; /*(橫列)*/
  //   grid-template-columns: [col-1] 40px 50px auto 50px 40px;
  // 重複3次
  grid-template-columns: repeat(3, [col] calc(100% / 3));
  grid-template-rows: [row-1] 25% [row-2] 100px [row-3] auto;
  .item {
    overflow-x: scroll;
    border: 1px solid blueviolet;
    // width: 20px;
    // 個別指定要放在容器的哪格中
    &.href {
      grid-column: 1 / 3; /* (<startLine> / <endLine>) */
      grid-row: 2 / 3; /* (<startLine> / <endLine>) */
    }
    &.a {
      grid-column: 3; /*  第2條線至第3條線的區域 */
      grid-row: 1 / 2;
    }
    &.c {
      /* <row-start> / <column-start> / <row-end> / <column-end> */
      grid-area: row-3 / 3 / 4 / 2;
    }
  }
}
.context2 {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, [col] calc(100% / 3));
  grid-template-rows: [row-1] 25% [row-2] 100px [row-3] auto;
  .item {
    border: 1px solid red;
  }
}
</style>
