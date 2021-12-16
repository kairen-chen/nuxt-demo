<template>
<div class="main">
    <Layout class="main">
        <div class="breadcrumb-flex">
            <div>
                <H1>宣傳圖片</H1>
            </div>
            <div>
                <Button type="primary" icon="icon icon-ic-add" @click="addBanner()">新增圖片</Button>
            </div>
        </div>
        <!-- <div class="search-form">
            <p><B>您一定要知道的貼心提醒：</B></p>
            <p><B>1.「報到二維條碼」、「簽退二維條碼」：可點入二維條碼列印畫面，張貼於活動現場，參加者掃描QRcode後，即可完成報名/簽退，節省主辦單位人力</B></p>
            <p><B>2. 活動後，請主辦單位至「報名列表」做報到/簽退確認，提升志工參加時數和排名</B></p>
            <p><B>3. 欲Booking 微樂志工官網廣告版位者，請附上圖檔(700*336，png檔)及微樂志工平台上該活動網址連結，email至TWMSBD@taiwanmobile.com</B></p>
            <p style="padding-left:30px">* 請於每周五17:00前提供（依收到時間，開放5個廣告版位輪撥）</p>
            <p style="padding-left:30px">* 一次預約最長7天（超過該活動報名截止時間，將自動下架）</p>
        </div> -->

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
            columns: [{
                    title: 'ID',
                    key: 'id',
                    width: '100px',
                },

                {
                    title: '圖片',
                    key: 'name',
                    width: '400px',
                    render: (h, params) => {
                        return h('div', [
                            h('Img', {
                                attrs: {
                                    src: params.row.image,
                                    height: '150px'
                                },
                                // style: { marginRight: '5px' },
                                on: {
                                    // click: () => { this.editSchool(params.index); }
                                }
                            }),
                        ])
                    }
                },
                {
                    title: '連結',
                    key: 'url',
                    // width: '300px',
                },
                {
                    title: '排序',
                    key: 'displaySort',
                    // width: '300px',
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
            this._API.getBanner.send(params).then((data) => {
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
