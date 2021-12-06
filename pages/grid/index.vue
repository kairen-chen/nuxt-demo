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
      <div class="item c">C</div>
    </div>

    <div class="context2">
      <a
        class="item header"
        href="https://ballaediworkshop.blogspot.com/2019/10/css-grid-introduction-and-tutorial.html"
        >ref</a
      >
      <div class="item main">A</div>
      <div class="item sidebar">B</div>
      <div class="item footer">C</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  flex-direction: column;
  justify-content: flex-start;
}
.context1 {
  width: 100%;
  height: 50vh; // 要給高度,不然會和context2小重疊
  display: grid; /*(縱列)*/
  //   display: inline-grid; /*(橫列)*/
  //   grid-template-columns: [col-1] 40px 50px auto 50px 40px;
  // 重複3次
  grid-template-columns: repeat(3, [col] calc(100% / 3));
  grid-template-rows: [row-1] 25% [row-2] 100px [row-3] auto; // 取name
  margin-bottom: 30px;
  .item {
    border: 1px solid blueviolet;
    // width: 20px;
    // 個別指定要放在容器的哪格中
    &.href {
      grid-column: 1 / 3; /* (<startLine> / <endLine>) */
      grid-row: 2 / 3; /* (<startLine> / <endLine>) */
    }
    &.a {
      grid-column: 3; /*  第3條線的區域 */
      grid-row: 1 / span 2; /* span : 若放於start=往前1 , 放於end=往後1 */
    }
    &.c {
      /* <row-start> / <column-start> / <row-end> / <column-end> */
      grid-area: row-3 / 3 / 4 / span 2;
    }
  }
}
.context2 {
  width: 50%;
  display: grid;
  // 排版
  grid-template-areas:
    "header header header header"
    "main main . sidebar"
    "footer footer footer footer"; /*一定要對稱ex: 4 4 4 | 3 3 3*/
  // 間隔
  grid-gap: 15px 10px; /* grid-gap: <grid-row-gap> <grid-column-gap> */
  // 對齊
  // place-content: space-around; /*  <align-content> / <justify-content>  */
  place-items: start stretch; /* <align-items> <justify-items> */
  .header {
    grid-area: header;
  }
  .main {
    grid-area: main;
    height: 100px;
    place-self: center start; /* <align-items> <justify-items> */
  }
  .sidebar {
    grid-area: sidebar;
  }
  .footer {
    grid-area: footer;
  }
  .item {
    border: 1px solid red;
  }
}
</style>
