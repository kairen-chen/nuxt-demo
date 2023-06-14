<template>
<div class="main">
    <Layout class="main">
        <div class="breadcrumb-flex">
            <div>
                <H1>狀態統計</H1>
            </div>
        </div>

        <Content>
            <Table :columns="columns" :data="list" stripe no-data-text="暫無資料"></Table>

        </Content>
    </Layout>

</div>
</template>

<script>
import Config from '@/common/config'

export default {
    layout: 'backend',
    components: {
    },
    data() {
        return {
            // 分頁
            total: 0,
            current: 0,
            pageSize: 10,
            params: '',
            isSearchModal: true,
            sort: 'displaySort,desc',
            // sortStr: ['pubDate,desc'],
            selectItems: [],
            deleteConfirmModal: false,
            list: [],
            columns: [
                    {
                        title: '項目',
                        key: 'title',
                        value: 'value',
                        width: '800'
                    },
                    {
                        title: '數值',
                        key: 'value',
                        value: 'value',
                        // align: 'right'
                    }
                ],

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
                sort: _this.sort,
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
            this._API.getStatisticsStatus.send(params).then((data) => {
                // _this.list = data.results
                _this.list = [
                    {title:'志工活動總數', key: '1', value: data.eventCount},
                    {title:'企業志工活動總數', key: '2', value: data.enterpriseEventCount},
                    {title:'物資需求總數', key: '3', value: data.supplyEventCount},
                    {title:'微樂樂志工會員總數', key: '4', value: data.memberCount},
                    {title:'志工報名次數', key: '5', value: data.eventRegisterCount},
                    {title:'志工報到次數', key: '6', value: data.eventFinishCount},
                    {title:'企業志工報名次數', key: '7', value: data.enterpriseRegisterCount},
                    {title:'企業志工報到次數', key: '8', value: data.enterpriseFinishCount},
                    {title:'物資捐贈報名次數', key: '9', value: data.supplyEventRegisterCount},
                    {title:'物資捐贈完成次數', key: '10', value: data.supplyFinishCount},
                    {title:'NPO數量 (已審核通過 / 所有NPO總數)', key: '11', value: data.npoVerifiedCount+' / '+data.npoCount},
                ]

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
        addBanner() {
            this.$router.push({
                name: 'backendBannerAdd'
            })
        },
        goEdit(id) {
            this.$router.push({
                name: 'backendBannerEdit',
                params: {
                    id: id
                }
            })
        },
        deleteConfirm(id) {
            this.selectItems.push(id)
            this.deleteConfirmModal = true
        },
        patchDelete() {
            let _this = this
            let data = []
            if (_this.selectItems.length > 0) {
                let errorDesc = ''
                let arrItems = _this.selectItems.join(',')
                // 先刪除檔案
                this._API.deleteBannerFile.requestCommon(arrItems, 'image')
                this._API.deleteBannerFile.fileUpload({
                    id: arrItems,
                    type: 'image',
                }).then((data) => {

                    this._API.deleteBanner.send(arrItems).then((data) => {
                        for (let f = 0; f < data.length; f++) {
                            if (data[f].errors) {
                                for (let i in data[f].errors) {
                                    switch (data[f].errors[i].error) {
                                        case 'invalidRequest':
                                            errorDesc = '參數無效或無法識別'
                                            break
                                        case 'invalidToken':
                                            errorDesc = '憑證已過期無效請重新執行此操作'
                                            break
                                        case 'bannerNotFound':
                                            errorDesc = '找不到此筆資料'
                                            break
                                        case 'requestUnavailable':
                                            errorDesc = '稍後重試請求'
                                            break
                                        case 'internalError':
                                            errorDesc = '內部錯誤'
                                            break
                                        default:
                                            errorDesc = '系統忙碌中'
                                            break
                                    }
                                }
                            }
                        }

                        this.deleteConfirmModal = false
                        if (errorDesc) {
                            _this.$Notice.error({
                                title: '錯誤',
                                desc: errorDesc,
                                duration: Config.errorDuration
                            })
                        } else {
                            _this.selectItems = []
                            _this.$Notice.success({
                                title: '成功',
                                desc: '刪除成功',
                                duration: Config.successDuration
                            })
                            this.getList(this.current, this.pageSize)
                        }
                    })

                }).catch((error) => {
                    console.log('xxxx')
                })

                // this.$service.deleteUser.requestCommon(arrAccounts)

            } else {
                _this.$Notice.warning({
                    title: '提醒',
                    desc: '請選擇項目',
                    duration: Config.warningDuration
                })
            }

            // this.resetSelect()
        },
    }
};
</script>

<style lang="scss" scoped>

</style>
