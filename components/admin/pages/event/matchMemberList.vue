<template>
<div class="main">
    <Layout class="main">
        <div class="breadcrumb-flex">
            <div>
                <H1>會員媒合列表</H1>
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
            eventType: '',
            eventCity: '',
            total: 0,
            current: 0,
            pageSize: 10,
            params: '',
            isSearchModal: true,
            sort: 'id,desc',
            sortStr: ['id,desc'],
            columns: [{
                    title: 'ID',
                    key: 'id',
                    width: '100px',
                },
                // {
                //     title: '類型',
                //     key: 'type',
                //     width: '150px',
                //     render: (h, params) => {
                //         let typeTitle = ''
                //         if(params.row.isInventory) {
                //             typeTitle = '物資NPO'
                //         }else if(params.row.isEnterprise) {
                //             typeTitle = '企業志工'
                //         }else {
                //             typeTitle = '志工NPO'
                //         }
                //         return h('span', typeTitle)
                //     }                    
                // },
                {
                    title: '帳號',
                    key: 'username'
                },                
                {
                    title: '名稱',
                    key: 'name'
                },
                {
                    title: '註冊時間',
                    key: 'dateJoined'
                },                
                // {
                //     title: ' ',
                //     key: 'action',
                //     width: '100px',
                //     render: (h, params) => {
                //         return h('div', {
                //                 style: {
                //                     height: 'auto',
                //                     overflow: 'hidden',
                //                     display: 'flex'
                //                 }
                //             },
                //             [
                //                 h('Tooltip', {
                //                     props: {
                //                         placement: 'top',
                //                         transfer: true
                //                     }
                //                 }, [h('Icon', {
                //                     props: {
                //                         type: 'ios-eye'
                //                     },
                //                     style: {
                //                         // color: '#2d8cf0',
                //                         cursor: 'pointer',
                //                         marginLeft: '17px',
                //                         fontSize: '18px'
                //                     },
                //                     on: {
                //                         click: () => {
                //                             this.goEdit(params.row.id)
                //                         }
                //                     }
                //                 }), h('span', {
                //                     slot: 'content',
                //                     style: {
                //                         whiteSpace: 'normal'
                //                     }
                //                 }, '檢視')]),
                                

                //             ]
                //         )
                //     }
                // }
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
            let eventID = _this.$route.params.eventID


            // str = ' npoId eq ' + localStorage.getItem('npoPostId')
            

            let str = ' npoId eq '+ localStorage.getItem('npoPostId') +' and id eq ' + eventID
            let params = {
                search: str,
                inlinecount: true,
            }

            this._API.getEvents.send(params).then((data) => {
                if(data.results.length>0) {
                    let eventData = data.results[0]
                    let d = Date.now()
                    let closeDate = eventData.closeDate
                    this.eventType = eventData.volunteerType
                    this.eventCity = eventData.addressCity

                    if(new Date(closeDate).getTime()>d) {
                        let substr = 'skillsDescription like \'' + this.eventType + '\' or interest like \'' + this.eventCity + '\' and isPublic eq 1  '
                        let subparams = {
                            search: substr,
                            inlinecount: true,
                            // sort: _this.sort,
                            page: current,
                            size: pageSize
                        }
                        // this.$service.getUserRolesPage.requestCommon(_this.queryStr, current, pageSize)
                        this._API.getUsers.send(subparams).then((data) => {
                            _this.list = data.results
                            _this.total = data.count
                            // console.log(data)
                        })
                    }else {
                        // this.$Notice.warning({
                        //     title: '提示',
                        //     desc: '此活動已結束'
                        // });
                        this.$router.go(-1)                   
                    }
                }else {
                    // this.$Notice.warning({
                    //     title: '提示',
                    //     desc: '此活動不存在'
                    // });
                    this.$router.go(-1)   
                }
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

            let eventType = _this.eventType
            let eventCity = _this.eventCity
            let str = 'skillsDescription like \'' + eventType + '\' or interest like \'' + eventCity + '\' and isPublic eq 1  '

            params = {
                search: str,
                inlinecount: true,
                // sort: _this.sort,
                page: _this.current,
                size: _this.pageSize
            }
            // if (_this.params) {
            //     params = {
            //         search: str,
            //         inlinecount: true,
            //         // sort: _this.sort,
            //         page: _this.current,
            //         size: _this.pageSize
            //     }
            //     // console.log('_this.params :' + JSON.stringify(_this.params))
            //     if (_this.params.isConnected != null) {
            //         params.isConnected = _this.params.isConnected
            //     }
            // } else {
            //     let search = ''
            //     params = {
            //         search: str,
            //         inlinecount: true,
            //         // sort: _this.sort,
            //         page: _this.current,
            //         size: _this.pageSize
            //     }
            // }
            // params = new URLSearchParams(params)
            // _this.sortStr.forEach(s => {
            //     params.append("sort", s);
            // })

            // this.$service.getUserRolesPage.requestCommon(_this.params, _this.current, _this.pageSize)
            this._API.getUsers.send(params).then((data) => {
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
            this.$router.push({ name: 'backendMemberEdit', params: { uid: id }})
        },       
        
    }
};
</script>

<style lang="scss" scoped>

</style>
