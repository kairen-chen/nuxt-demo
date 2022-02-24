<template>
<div class="main">
    <Layout class="main">
        <div class="search-form">
            <SearchModal v-if="isSearchModal" @searchData="searchData" @paramData="paramData" :sort="sort" />
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
// import baseURL from "@/common/baseConfig";
import { getClientDomain } from "@/common/baseConfig";
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
            // 分頁
            total: 0,
            current: 0,
            pageSize: 10,
            params: '',
            isSearchModal: true,
            sort: 'pubDate,desc',
            sortStr: ['pubDate,desc'],
            columns: [{
                    title: 'ID',
                    key: 'id',
                    width: '150px',
                },
                {
                    title: '類型',
                    key: 'type',
                    width: '100px',
                    render: (h, params) => {
                        let typeTitle = ''
                        if (params.row.isInventory) {
                            typeTitle = '物資NPO'
                        } else if (params.row.isEnterprise) {
                            typeTitle = '企業志工'
                        } else {
                            typeTitle = '志工NPO'
                        }
                        return h('span', typeTitle)
                    }
                },
                {
                    title: '名稱',
                    key: 'name'
                },
                {
                    title: '邀請連結',
                    key: 'name',
                    render: (h, params) => {
                        return h('div', [
                            h('a', {
                                attrs: {
                                    // name: 'google',
                                    href: atob(localStorage.getItem("baseURL"))+'backend',
                                    target: '_blank'
                                },
                            }, atob(localStorage.getItem("baseURL"))+'backend/'),                          
                        ])
                    }
                },
                {
                    title: '狀態',
                    key: 'action',
                    width: '100px',
                    render: (h, params) => {
                        let typeTitle = ''
                        if (params.row.contactName=='') {
                            typeTitle = '尚未填寫'
                        } else if (!params.row.isVerified) {
                            if(params.row.admViewd) {
                                typeTitle = '未通過審核'
                            }else {
                                typeTitle = '立即審核'
                            }
                        } else {
                            typeTitle = '已通過'
                        }
                        if(typeTitle=='未通過審核' || typeTitle=='立即審核') {
                            return h('a',{
                                // style: { marginRight: '5px' },
                                on: {
                                    click: () => { this.goEdit(params.row.id); }
                                }
                            },typeTitle)
                        }else {
                            return h('span',typeTitle)
                        }
                    }

                }
            ],
            list: [],
            // data1: [{
            //         id: 18,
            //         name: 'John Brown',
            //         type: '志工NPO',
            //         date: '2016-10-03'
            //     },
            //     {
            //         id: 19,
            //         name: 'Jon Snow',
            //         type: '物資NPO',
            //         date: '2016-10-03'
            //     },
            //     {
            //         id: 20,
            //         name: 'John Brown',
            //         type: '企業NPO',
            //         date: '2016-10-03'
            //     },
            // ]

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
                // sort: _this.sort,
                page: current,
                size: pageSize
            }
            if (_this.params) {
                params.search = _this.params.search
            }
            params = new URLSearchParams(params)
            _this.sortStr.forEach(s => {
                params.append("sort", s);
            })
            // this.$service.getUserRolesPage.requestCommon(_this.queryStr, current, pageSize)
            this._API.getNpos.send(params).then((data) => {
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
                    // sort: _this.sort,
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
                    // sort: _this.sort,
                    page: _this.current,
                    size: _this.pageSize
                }
            }
            params = new URLSearchParams(params)
            _this.sortStr.forEach(s => {
                params.append("sort", s);
            })

            // this.$service.getUserRolesPage.requestCommon(_this.params, _this.current, _this.pageSize)
            this._API.getNpos.send(params).then((data) => {
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
                name: 'backendNpoEdit',
                params: {
                    id: id
                }
            })
        },
    }
};
</script>

<style lang="scss" scoped>

</style>
