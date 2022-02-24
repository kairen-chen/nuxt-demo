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
import SearchModal from './searchModal.vue'
import Page from '@/components/admin/layoutUnit/page.vue'

export default {
    middleware: 'routeAuth',
    meta: {
        requiresAdmin: true
    },    
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
            sort: 'id,desc',
            // sortStr: ['pubDate,desc'],
            columns: [{
                    title: 'ID',
                    key: 'id',
                    width: '150px',
                },
                {
                    title: '類型',
                    key: 'type',
                    width: '150px',
                    render: (h, params) => {
                        let typeTitle = ''
                        // if(params.row.isInventory) {
                        //     typeTitle = '物資NPO'
                        // }else 
                        if(params.row.isEnterprise) {
                            typeTitle = '企業志工'
                        }else {
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
                    title: '是否可捐贈物資',
                    key: 'isInventory',
                    render: (h, params) => {
                        let title = ''
                        if(params.row.isInventory) {
                            title = '可以'
                        }else {
                            title = '不可以'
                        }
                        return h('span', title)
                    }                      
                },                
                {
                    title: ' ',
                    key: 'action',
                    width: '150px',
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
                                        type: 'ios-apps'
                                    },
                                    style: {
                                        // color: '#2d8cf0',
                                        cursor: 'pointer',
                                        marginLeft: '17px',
                                        fontSize: '18px'
                                    },
                                    on: {
                                        click: () => {
                                            this.goEvent(params.row.id)
                                            // this.downQrcode(params.row, 1)
                                        }
                                    }
                                }), h('span', {
                                    slot: 'content',
                                    style: {
                                        whiteSpace: 'normal'
                                    }
                                }, '活動管理')])
                            
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
            let str = 'isVerified eq true'
            let params = {
                search: str,
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
                // if (_this.params.isConnected != null) {
                //     params.isConnected = _this.params.isConnected
                // }
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
        goEdit(id) {
            this.$router.push({ name: 'backendNpoEdit', params: { id: id }})
        },
        goEvent(npouid) {
            this.$router.push({ name: 'backendAdminEventList', params: { npouid: npouid }})
        }        
        
    },

};
</script>

<style lang="scss" scoped>

</style>
