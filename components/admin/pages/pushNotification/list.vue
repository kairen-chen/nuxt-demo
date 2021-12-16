<template>
<div class="main">
    <Layout class="main">
        <div class="breadcrumb-flex">
            <div>
                <H1>推播訊息通知</H1>
            </div>
            <div>
                <Button type="primary" icon="icon icon-ic-add" @click="add()">新增推播訊息</Button>
            </div>
        </div>


        <Content>
            <Table :columns="columns" :data="list" no-data-text="暫無資料"></Table>
            <div style="text-align:center; padding-top:20px;">
                <Page :page-size="pageSize" @pageChange="pageChange" @onPageSizeChange="pageSizeChange" :pageData="total" ref="page"></Page>
            </div>
        </Content>
    </Layout>

</div>
</template>

<script>
import Config from '@/common/config'
import Page from '@/components/admin/layoutUnit/page.vue'

export default {
    layout: 'backend',
    components: {
        Page
    },
    data() {
        return {
            // 分頁
            total: 0,
            current: 0,
            pageSize: 10,
            params: '',
            isSearchModal: true,
            sort: 'id,desc',
            // sortStr: ['pubDate,desc'],
            selectItems: [],
            deleteConfirmModal: false,
            columns: [
                {
                    title: '主題',
                    key: 'subject',
                },                
                {
                    title: '訊息',
                    key: 'content',
                },
                {
                    title: '發送日期',
                    key: 'broadcastTime',
                },                
                {
                    title: '發送人數',
                    key: 'sendNum',
                },
                
            ],
            // list: [],
            list: [
                {
                    id: 18,
                    message: '防疫優先，愛不停歇！一起支持視障遠距服務看不見，如何線上學習？疫情衝擊改變了孩童的學習模式，然而現行的遠距平台沒有無障礙化，以致視障學習障礙倍增。北視家協需要投入更多資源，不讓孩童變成數位弱勢。邀請您與我們疫起加油，讓視障服務不間斷！',
                    count: '1',
                    sendDate: '2016-10-03'
                },
                {
                    id: 19,
                    message: '防疫優先，愛不停歇！一起支持視障遠距服務看不見，如何線上學習？疫情衝擊改變了孩童的學習模式，然而現行的遠距平台沒有無障礙化，以致視障學習障礙倍增。北視家協需要投入更多資源，不讓孩童變成數位弱勢。邀請您與我們疫起加油，讓視障服務不間斷！',
                    count: '1',
                    sendDate: '2016-10-03'
                },
                
            ]

        };

    },
    mounted() {
        this.getList(this.current, this.pageSize)
    },
    methods: {
        getList(current, pageSize) {
            let _this = this
            let str = ''

            let params = {
                // search: str,
                inlinecount: true,
                // sort: _this.sort,
                page: current,
                size: pageSize
            }
            if (_this.params) {
                params.search = _this.params.search
            }
            // params = new URLSearchParams(params)
            // _this.sortStr.forEach(s => {
            //     params.append("sort", s);
            // })
            // this.$service.getUserRolesPage.requestCommon(_this.queryStr, current, pageSize)
            this._API.getPushMessage.send(params).then((data) => {
                _this.list = data.results
                _this.total = data.count
                console.log(data)
            })
        },
        // 分頁
        pageChange(value) {
            this.current = value - 1
            this.searchPage()
        },
        pageSizeChange(value) {
            this.pageSize = value
            this.current = 0
            this.searchPage()
        },
        selectChange(selection) {
            this.selection = selection
            let accountsArr = []
            selection.forEach(function (element, index) {
                accountsArr.push(element.code)
            }, this)
            this.accounts = accountsArr.join(',')
        },
        searchPage() {
            let _this = this
            let params = {}

            if (_this.params) {
                params = {
                    search: _this.params.search,
                    inlinecount: true,
                    sort: _this.sort,
                    page: _this.current,
                    size: _this.pageSize
                }
                // console.log('_this.params :' + JSON.stringify(_this.params))
                if (_this.params.isConnected != null) {
                    params.isConnected = _this.params.isConnected
                }
            } else {
                let search = ''
                params = {
                    search: search,
                    inlinecount: true,
                    sort: _this.sort,
                    page: _this.current,
                    size: _this.pageSize
                }
            }
            // params = new URLSearchParams(params)
            // _this.sortStr.forEach(s => {
            //     params.append("sort", s);
            // })

            // this.$service.getUserRolesPage.requestCommon(_this.params, _this.current, _this.pageSize)
            this._API.getBanner.send(params).then((data) => {
                _this.list = data.results
                _this.total = data.count
            })
        },
        closeSearchModal() {
            this.isSearchModal = false
        },
        searchData(data) {
            this.list = data.results
            this.total = data.count
            this.$refs.page.currentChange()
        },
        paramData(data) {
            this.params = data
        },
        selectChange(selection) {
            this.selection = selection
            let accountsArr = []
            selection.forEach(function (element, index) {
                accountsArr.push(element.code)
            }, this)
            this.accounts = accountsArr
        },
        add() {
            this.$router.push({
                name: 'backendPushNotificationAdd'
            })
        },


    }
};
</script>

<style lang="scss" scoped>

</style>
