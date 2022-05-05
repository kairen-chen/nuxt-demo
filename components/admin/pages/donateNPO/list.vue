<template>
<div class="main">
    <Layout class="main">

        <div class="search-form">
            <SearchModal v-if="isSearchModal" @searchData="searchData" @paramData="paramData" :sort="sort" />
        </div>
        <div style="text-align:right;padding-bottom:20px">
            <Button type="primary" icon="icon icon-ic-add" @click="addDonationNPO()">新增5180NPO</Button>
        </div>        
        <Content>
            <Table :columns="columns" :data="list" no-data-text="暫無資料"></Table>
            <div style="text-align:center; padding-top:20px;">
                <Page :page-size="pageSize" @pageChange="pageChange" @onPageSizeChange="pageSizeChange" :pageData="total" ref="page"></Page>
            </div>
        </Content>
    </Layout>
    <Modal v-model="deleteConfirmModal" title="刪除" :mask-closable="false">
        <div class="message">
            <div>
                <Icon type="md-alert" style="color:#ed4014" size="20" />
                確定刪除選中項目？
            </div>
        </div>
        <div slot="footer">
            <Button @click="deleteConfirmModal=false">取消</Button>
            <Button type="primary" @click="patchDelete()">確定</Button>
        </div>
    </Modal>
</div>
</template>

<script>
import Config from '@/common/config'
import SearchModal from './searchModal.vue'
import Page from '@/components/admin/layoutUnit/page.vue'

export default {
    layout: 'backend',
    components: {
        SearchModal,
        Page
    },
    data() {
        return {
            selectItems: null,
            deleteConfirmModal: false,
            // 分頁
            total: 0,
            current: 0,
            pageSize: 10,
            params: '',
            isSearchModal: true,
            sort: 'id,desc',
            // sortStr: ['pubDate,desc'],
            columns: [{
                    title: 'ID',
                    key: 'id',
                    width: '100px',
                },
                {
                    title: '名稱',
                    key: 'name'
                },
                // {
                //     title: '描述',
                //     key: 'descrption'
                // },
                {
                    title: '5180NPO代碼',
                    key: 'code'
                },
                {
                    title: '藍新數位捐款連結',
                    key: 'newebpayUrl'
                },
                {
                    title: '藍新定期定額捐款連結',
                    key: 'newebpayPeriodUrl'
                },
                {
                    title: ' ',
                    key: 'action',
                    width: '120px',
                    render: (h, params) => {
                        return h('div', {
                                style: {
                                    height: 'auto',
                                    overflow: 'hidden',
                                    display: 'flex'
                                }
                            },
                            [
                                h('Tooltip', {
                                    props: {
                                        placement: 'top',
                                        transfer: true
                                    }
                                }, [h('Icon', {
                                    props: {
                                        type: 'ios-create'
                                    },
                                    style: {
                                        // color: '#2d8cf0',
                                        cursor: 'pointer',
                                        marginLeft: '17px',
                                        fontSize: '18px'
                                    },
                                    on: {
                                        click: () => {
                                            this.goEdit(params.row.id)
                                        }
                                    }
                                }), h('span', {
                                    slot: 'content',
                                    style: {
                                        whiteSpace: 'normal'
                                    }
                                }, '編輯')]),
                                h('Tooltip', {
                                    props: {
                                        placement: 'top',
                                        transfer: true
                                    }
                                }, [h('Icon', {
                                    props: {
                                        type: 'ios-trash'
                                    },
                                    style: {
                                        // color: '#2d8cf0',
                                        cursor: 'pointer',
                                        marginLeft: '17px',
                                        fontSize: '18px'
                                    },
                                    on: {
                                        click: () => {
                                            this.deleteConfirm(params.row.id)
                                            // this.downQrcode(params.row, 1)
                                        }
                                    }
                                }), h('span', {
                                    slot: 'content',
                                    style: {
                                        whiteSpace: 'normal'
                                    }
                                }, '刪除')])

                            ]
                        )
                    }
                }
            ],
            list: [],
        };

    },
    mounted() {
        this.getList(this.current, this.pageSize)
    },
    methods: {
        getList(current, pageSize) {
            let _this = this
            // let str = 'active eq true'
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
            this._API.getDonationNpos.send(params).then((data) => {
                _this.list = data.results
                _this.total = data.count
                console.log(data)
            })
            _this.accounts = []
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
            params = new URLSearchParams(params)
            // _this.sortStr.forEach(s => {
            //     params.append("sort", s);
            // })

            // this.$service.getUserRolesPage.requestCommon(_this.params, _this.current, _this.pageSize)
            this._API.getDonationNpos.send(params).then((data) => {
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
        goEdit(id) {
            this.$router.push({
                name: 'backendDonateNPOEdit',
                params: {
                    id: id
                }
            })
        },
        addDonationNPO(npouid) {
            this.$router.push({
                name: 'backendDonateNPOAdd',
            })
        },
        deleteConfirm(code) {
            this.selectItems = code
            this.deleteConfirmModal = true
        },
        patchDelete() {
            let _this = this
            let data = []
            if (_this.selectItems) {
                let errorDesc = ''
                // let arrSelectItems = _this.selectItems.join(',')

                // 先刪除檔案
                this._API.deleteDonationNposFile.requestCommon(_this.selectItems, 'icon')
                this._API.deleteDonationNposFile.fileUpload({
                    id: _this.selectItems,
                    type: 'icon',
                }).then((data) => {
                    this._API.deleteDonationNpos.send(_this.selectItems).then((data) => {
                        for (let f = 0; f < data.length; f++) {
                            if (data[f].errors) {
                                for (let i in data[f].errors) {
                                    switch (data[f].errors[i].error) {
                                        case 'npoNotFound':
                                            errorDesc = '此NPO不存在'
                                            break
                                    }
                                }
                            }
                        }
                        _this.selectItems = null
                        this.deleteConfirmModal = false
                        if (errorDesc == '') {
                            _this.$Notice.success({
                                title: '成功',
                                desc: '刪除成功',
                                duration: Config.successDuration
                            })
                            this.getList(this.current, this.pageSize)
                        } else {
                            _this.$Notice.error({
                                title: '錯誤',
                                desc: errorDesc,
                                duration: Config.errorDuration
                            })
                        }
                    })

                }).catch((error) => {})
                // this.$service.deleteUser.requestCommon(arrAccounts)

            }
        },
    }
};
</script>

<style lang="scss" scoped>

</style>
