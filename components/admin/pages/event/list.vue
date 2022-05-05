<template>
<div class="main">
    <Layout class="main">
        <div class="breadcrumb-flex">
            <div>
                <H1>活動列表</H1>
            </div>
            <div>
                <Button v-if="!detail.isEnterprise" type="primary"  @click="addEvent('backendEventVolunteerAdd')">新增志工活動</Button>
                <Button v-if="detail.isEnterprise" type="primary"  @click="addEvent('backendEventEnterpriseAdd')">新增企業志工活動</Button>
                <Button v-if="detail.isInventory" type="primary"  @click="addEvent('backendEventSupplyAdd')">新增物資募集</Button>
            </div>
        </div>
        <div class="search-form">
            <p><B>您一定要知道的貼心提醒：</B></p>
            <p><B>1.「報到二維條碼」、「簽退二維條碼」：可點入二維條碼列印畫面，張貼於活動現場，參加者掃描QRcode後，即可完成報名/簽退，節省主辦單位人力</B></p>
            <p><B>2. 活動後，請主辦單位至「報名列表」做報到/簽退確認，提升志工參加時數和排名</B></p>
            <p><B>3. 欲Booking 微樂志工官網廣告版位者，請附上圖檔(700*336，png檔)及微樂志工平台上該活動網址連結，email至TWMSBD@taiwanmobile.com</B></p>
            <p style="padding-left:30px">* 請於每周五17:00前提供（依收到時間，開放5個廣告版位輪撥）</p>
            <p style="padding-left:30px">* 一次預約最長7天（超過該活動報名截止時間，將自動下架）</p>
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
            detail: [],
            // 分頁
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
                    width: '80px',
                },
                {
                    title: '主題',
                    key: 'subject',
                    // width: '300px',
                },
                {
                    title: '類型',
                    key: 'type',
                    width: '100px',
                    render: (h, params) => {
                        let typeTitle = ''
                        // if(params.row.isInventory) {
                        //     typeTitle = '物資NPO'
                        // }else 
                        if(params.row.isVolunteerEvent && !params.row.isEnterprise) {
                            typeTitle = '志工活動'
                        }else if(params.row.isVolunteerEvent && params.row.isEnterprise){
                            typeTitle = '企業志工活動'
                        }else {
                            typeTitle = '物資募集'
                        }
                        return h('span', typeTitle)
                    }                   
                },                
                {
                    title: '報名列表',
                    key: 'name',
                    width: '100px',
                    render: (h, params) => {
                        return h('div', [
                            h('Button', {
                                props: {
                                    type: 'primary',
                                    size: 'small'
                                },
                                style: {
                                    marginRight: '5px'
                                },
                                on: {
                                    click: () => {
                                        this.goEventRegister(params.row.id);
                                    }
                                }
                            }, '報名列表'),
                        ])
                    }
                },
                {
                    title: '活動成果',
                    key: 'name',
                    width: '100px',
                    render: (h, params) => {
                        return h('div', [
                            h('Button', {
                                props: {
                                    type: 'primary',
                                    size: 'small'
                                },
                                style: {
                                    marginRight: '5px'
                                },
                                on: {
                                    click: () => {
                                        this.goEventResult(params.row.id);
                                    }
                                }
                            }, '活動成果'),
                        ])
                    }
                },
                {
                    title: '報到二維碼',
                    key: 'name',
                    width: '110px',
                    render: (h, params) => {
                        return h('div', [
                            h('Button', {
                                props: {
                                    type: 'primary',
                                    size: 'small'
                                },
                                style: {
                                    marginRight: '5px'
                                },
                                on: {
                                    click: () => {
                                        this.goQrcode(params.row.uid);
                                    }
                                }
                            }, '報到二維碼'),
                        ])
                    }
                },
                {
                    title: '簽退二維碼',
                    key: 'name',
                    width: '110px',
                    render: (h, params) => {
                        return h('div', [
                            h('Button', {
                                props: {
                                    type: 'primary',
                                    size: 'small'
                                },
                                style: {
                                    marginRight: '5px'
                                },
                                on: {
                                    click: () => {
                                        this.goQrcode(params.row.uid, 'leave');
                                    }
                                }
                            }, '簽退二維碼'),
                        ])
                    }
                },
                {
                    title: '活動媒合',
                    key: 'name',
                    width: '120px',
                    render: (h, params) => {
                        let d = Date.now()
                        if(new Date(params.row.closeDate).getTime()>d) {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.goMatchMemberList(params.row);
                                        }
                                    }
                                }, '媒合會員列表'),
                            ])
                        }else {
                            return null
                        }
                    }
                },
                {
                    title: ' ',
                    key: 'action',
                    width: '80px',
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
                                            this.goEdit(params.row)
                                        }
                                    }
                                }), h('span', {
                                    slot: 'content',
                                    style: {
                                        whiteSpace: 'normal'
                                    }
                                }, '編輯')]),

                            ]
                        )
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
        let npouid = this.$route.params.npouid
        if (npouid) {
            //Checky Admin only
            console.log('Checky Admin only')
            this.getDetail(npouid)
            this.getList(this.current, this.pageSize, npouid)
        } else {
            //NPO self view
            console.log('NPO self view')
            this.getDetail(false)
            this.getList(this.current, this.pageSize, false)
        }

    },
    methods: {
        getDetail(npouid) {
            let _this = this
            let str = ''
            if (npouid) {
                str = ' id eq ' + npouid
            } else {
                str = ' id eq ' + localStorage.getItem('npoId')
            }
            let params = {
                search: str,
                // inlinecount: true,
                // sort: _this.sort,
                page: 0,
                size: 1
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
                _this.detail = data.results[0]
                localStorage.setItem('npoPostId',_this.detail.id)
                // _this.total = data.count
                // console.log(data)
            })
        },
        getList(current, pageSize, npouid) {
            let _this = this
            let str = ''
            if (npouid) {
                str = ' npoId eq ' + npouid
            } else {
                str = ' npoId eq ' + localStorage.getItem('npoId')
            }
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
            params = new URLSearchParams(params)
            _this.sortStr.forEach(s => {
                params.append("sort", s);
            })

            // this.$service.getUserRolesPage.requestCommon(_this.queryStr, current, pageSize)
            this._API.getEvents.send(params).then((data) => {
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
            let str = ''
            let npouid = _this.$route.params.npouid
            if (npouid) {
                str = ' npoId eq ' + npouid
            } else {
                str = ' npoId eq ' + localStorage.getItem('npoId')
            }

            if (_this.params) {
                params = {
                    search: str,
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
                    search: str,
                    inlinecount: true,
                    sort: _this.sort,
                    page: _this.current,
                    size: _this.pageSize
                }
            }
            params = new URLSearchParams(params)
            _this.sortStr.forEach(s => {
                params.append("sort", s);
            })

            // this.$service.getUserRolesPage.requestCommon(_this.params, _this.current, _this.pageSize)
            this._API.getEvents.send(params).then((data) => {
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
        addEvent(type) {
            let routeName = ''
            switch(type) {
                case "backendEventVolunteerAdd"://志工活動
                    routeName = 'backendEventVolunteerAdd'
                    break;
                case "backendEventEnterpriseAdd"://企業活動
                    routeName = 'backendEventEnterpriseAdd'
                    break;
                case "backendEventSupplyAdd"://物資捐贈活動
                    routeName = 'backendEventSupplyAdd'
                    break;
            }
            this.$router.push({
                name: routeName
            })
        },        
        goEdit(row) {
            let routeName = ''
            if (row.isVolunteerEvent && !row.isEnterprise) {
                //志工活動
                routeName = 'backendEventVolunteerEdit'
            } else if (row.isVolunteerEvent && row.isEnterprise) {
                //企業活動
                routeName = 'backendEventEnterpriseEdit'
            } else {
                //物資捐贈活動
                routeName = 'backendEventSupplyEdit'
            }

            this.$router.push({
                name: routeName,
                params: {
                    id: row.id
                }
            })
        },
        goEventRegister(id) {
            this.$router.push({
                name: 'backendEventRegisterList',
                params: {
                    eventId: id
                }
            })
        },
        goEventResult(id) {
            this.$router.push({
                name: 'backendEventResultPhotoEdit',
                params: {
                    eventId: id
                }
            })
        },
        goQrcode(id, type = null) {
            let routeData = ''
            if (type == null) {
                routeData = this.$router.resolve({
                    name: 'backendEventQrcode',
                    params: {
                        id: id
                    }
                });
            } else {
                routeData = this.$router.resolve({
                    name: 'backendEventQrcodeLeave',
                    params: {
                        id: id
                    }
                });
            }
            window.open(routeData.href, '_blank');
            // this.$router.push({ name: 'backendEventQrcode', params: { id: id }})
        },
        goMatchMemberList(row) {
            this.$router.push({
                name: 'backendEventMatchMemberList',
                params: {
                    eventID: row.id,
                    // eventType: row.volunteerType,
                    // eventCity: row.addressCity,
                }
            })            
        }
    }
};
</script>

<style lang="scss" scoped>

</style>
