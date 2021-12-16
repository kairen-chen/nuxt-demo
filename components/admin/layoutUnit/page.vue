<style lang="scss">
  .pageSelect {
    width: fit-content;
    margin: 0 auto;
    overflow: hidden;
    ul {
      float: left;
      .ivu-select-dropdown-list {
        width: 100%;
      }
    }
    span {
      padding-top: 1px;
      padding-left: 5px;
      float: left;
      vertical-align: middle;
    }
  }

  @media only screen and (min-width: 1200px) {
    .pageSelect .ivu-select-single .ivu-select-selection .ivu-select-placeholder,
    .pageSelect .ivu-select-single .ivu-select-selection .ivu-select-selected-value {
      font-size: 18px !important;
    }
    .pageSelect .ivu-page-options-elevator input {
      font-size: 18px !important;
      vertical-align: top;
    }
    .pageSelect span {
      font-size: 18px !important;
    }
  }

  @media only screen and (max-width: 1200px) {
    .pageSelect .ivu-select-single .ivu-select-selection .ivu-select-placeholder,
    .pageSelect .ivu-select-single .ivu-select-selection .ivu-select-selected-value {
      font-size: 14px !important;
    }
    .pageSelect .ivu-page-options-elevator input {
      font-size: 14px !important;
      vertical-align: top;
    }
    .pageSelect span {
      font-size: 14px !important;
    }
  }
</style>
<template>
  <div class="pageSelect font-middle">
    <!--<Page :total="pageData" size="small" show-elevator show-sizer @on-change="pageChange"-->
    <!--:current="this.current" :page-size-opts="pageSizeOptsArray" :page-size="pageSizeNumber"-->
    <!--@on-page-size-change="pageSizeChange"></Page>-->
    <Page :total="pageData" @on-change="pageChange" :page-size="pageSizeNumber" :page-size-opts="pageSizeOptsArray" :current="current" @on-page-size-change="pageSizeChange"></Page>
    
    <!-- <i-select @on-change="pageSizeChange" style="float:left;width:180px;margin-left:10px" v-model="pageSizeNumber">
        <i-option v-for="item in pageSizeOptsArray" :key="item" :value="item">{{ item }} {{$t("LocaleString.L00256")}} </i-option>
    </i-select> -->
    <!-- <span class="pageSelect">{{ $t('LocaleString.L00019', { 0: pageData }) }}</span> -->
    <!-- <span class="pageSelect">{{$t("lang.common.total")}} {{pageData ? pageData : 0}} {{$t("lang.common.pen")}}</span> -->

    <!-- 
      <Page :total="pageData" size="small" @on-change="pageChange" @on-page-size-change="pageSizeChange" 
      :page-size="pageSizeNumber" :current="current" :label-in-value="true">
    </Page>
    
    <i-select @on-change="pageSizeChange" size="small" style="float:left;width:130px;margin-top:5px" v-model="pageSizeNumber">
        <i-option v-for="item in pageSizeOptsArray" :key="item" :value="item">{{ item }} / {{$t("lang.common.page")}} </i-option>
    </i-select>
  
    <span class="pageSelect">，{{$t("lang.common.total")}} [ {{pageData ? pageData : 0}} ] {{$t("lang.common.pen")}} </span> -->
  </div>
</template>
<script>
  export default {
    props: ['pageData', 'pageSizeOpts', 'pageSize'],
    data () {
      return {
        current: 1,
        pageSizeOptsArray: [10, 25, 50, 100],
        pageSizeNumber: 10
      }
    },
    methods: {
      // 页码改变的回调，返回改变后的页码
      pageChange: function (value) {
        this.current = value
        this.$emit('pageChange', value)
      },
      // 切换每页条数时的回调，返回切换后的每页条数
      pageSizeChange: function (value) {
         this.$emit('onPageSizeChange', value)
        //  localStorage.setItem('pageSize', value)
      },
      // 页码调整
      currentChange (value) {
        this.current = !value ? 1 : value
      }
    }
  }
</script>
