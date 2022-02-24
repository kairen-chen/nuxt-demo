<template>
<div class="main">
    <Layout class="main">
        <div class="breadcrumb-flex">
            <div>
                <H1>報名列表</H1>
            </div>
            <div>
                <Button type="primary" icon="icon icon-ic-add" @click="patchExport()">匯出全部</Button>
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
// import SearchModal from './searchModal.vue'
import Page from '@/components/admin/layoutUnit/page.vue'
import excel from '@/plugins/common/excel'
import XLSX from "xlsx"

export default {
    layout: 'backend',
    components: {
        // SearchModal,
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
            sort: 'registerDate,desc',
            // sortStr: ['pubDate,desc'],
            columns: [{
                    title: '員工編號',
                    key: 'employeeSerialNumber',
                },
                {
                    title: '姓名',
                    key: 'name',
                },
                {
                    title: '電話',
                    key: 'phone',
                },
                {
                    title: '身分證字號',
                    key: 'securityId',
                },
                {
                    title: '電子郵件',
                    key: 'email',
                },
                {
                    title: '生日',
                    key: 'birthday',
                },
                {
                    title: '監護人姓名',
                    key: 'guardianName',
                },
                {
                    title: '監護人電話',
                    key: 'guardianPhone',
                },
                // {
                //     title: '組別',
                //     key: 'eventSkillGroupList',
                // },
                {
                    title: '內容',
                    key: 'note',
                },                
                {
                    title: '報名時間',
                    key: 'registerDate',
                },
                {
                    title: '是否已報到',
                    key: 'isJoined',
                    width: '120px',
                    render: (h, params) => {
                        return h('RadioGroup', {
                            props: {
                                value: params.row.isJoined ? 'true' : 'false',
                            },
                            on: {
                                'on-change': (status) => {
                                    this.changeIsJoind(params.row.eventId, params.row.userId, status)
                                }
                            }
                        }, [
                            h('Radio', {
                                props: {
                                    label: 'true',
                                    // disabled: true
                                }
                            }, '是'),
                            h('Radio', {
                                props: {
                                    label: 'false',
                                    // disabled: true
                                }
                            }, '否')
                        ]);
                    }

                },
                {
                    title: '是否已簽退',
                    key: 'isLeaved',
                    width: '120px',
                    render: (h, params) => {
                        return h('RadioGroup', {
                            props: {
                                value: params.row.isLeaved ? 'true' : 'false',
                            },
                            on: {
                                'on-change': (status) => {
                                    this.changeIsLeave(params.row.eventId, params.row.userId, status)
                                }
                            }
                        }, [
                            h('Radio', {
                                props: {
                                    label: 'true',
                                    disabled: false
                                }
                            }, '是'),
                            h('Radio', {
                                props: {
                                    label: 'false',
                                    disabled: false
                                }
                            }, '否')
                        ]);
                    }

                },
            ],
            list: [],

        };

    },
    created(){
        // eventype(type) {
        
        // }
    },
    mounted() {
        this.getList(this.current, this.pageSize)
    },
    methods: {
        getList(current, pageSize) {
            let _this = this
            let str = ''
            let eventId = this.$route.params.eventId
            let isStaff = localStorage.getItem('isStaff')
            let npoId = localStorage.getItem('npoId')

            if (isStaff=='true') {
                str = ' eventId eq ' + eventId
            } else {
                str = ' eventId eq ' + eventId + ' and uid eq ' + npoId
            }
            // str = ' eventId eq ' + eventId
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
            this._API.getEventRegistered.send(params).then((data) => {
                _this.list = data.results
                _this.total = data.count

                if(data.results.length>0) {
                    if(data.results[0].isVolunteerEvent===false) {
                        _this.columns = _this.columns.filter(col => col.key !== 'isLeaved')
                        _this.columns = _this.columns.filter(col => col.key !== 'guardianName')
                        _this.columns = _this.columns.filter(col => col.key !== 'guardianPhone')

                        let targetIndex = _this.columns.findIndex(x => x.key == 'isJoined')
                        _this.columns[targetIndex].title = '是否已捐贈'
                    }
                }
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
                let eventId = this.$route.params.eventId
                let str = ' eventId eq ' + eventId
                params = {
                    search: str,
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
            this._API.getEventRegistered.send(params).then((data) => {
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
        patchExport() {
            let _this = this
            let _exportData = []
            let obj = {}

            let str = ''
            let eventId = this.$route.params.eventId
            str = ' eventId eq ' + eventId

            let params = {
                search: str,
                inlinecount: true,
                sort: _this.sort,
                // page: _this.current,
                // size: _this.pageSize
            }
            if (_this.params) {
                params.search = _this.params.search
            }
            // params = new URLSearchParams(params)
            // _this.sortStr.forEach(s => {
            //     params.append("sort", s);
            // })
            // this.$service.getUserRolesPage.requestCommon(_this.queryStr, current, pageSize)
            this._API.getEventRegistered.send(params).then((data) => {
                // _this.list = data.results
                // _this.total = data.count
                // console.log(data)

                data.results.forEach(function (item, index, array) {

                    obj = {
                        '員工編號': String(item.employeeSerialNumber),
                        '姓名': String(item.name),
                        '電話': String(item.phone),
                        '身分證字號': String(item.securityId),
                        '電子郵件': String(item.email),
                        '生日': String(item.birthday),
                        '監護人姓名': String(item.guardianName),
                        '監護人電話': String(item.guardianPhone),
                        '內容': item.note? String(item.note) : '',
                        '報名時間': String(item.registerDate),
                        '是否已報到': item.isJoined? '是' : '否',
                        '是否已簽退': item.isLeaved? '是' : '否',
                    }

                    _exportData.push(obj)
                })
                // YYYYMMDDHHMM_UsersList.xlsx
                var exportFileName = this.getCurrentDateTime('yyyyMMddhhmm') + '_報名列表.xlsx'
                var exportSheetName = this.getCurrentDateTime('yyyyMMddhhmm') + '_報名列表'
                var animalWS = XLSX.utils.json_to_sheet(_exportData)
                var wb = XLSX.utils.book_new() // make Workbook of Excel
                XLSX.utils.book_append_sheet(wb, animalWS, exportSheetName) // sheetAName is name of Worksheet
                XLSX.writeFile(wb, exportFileName) // name of the file is 'book.xlsx'   
                // this.patchExportConfirmModal = false
            })

        },
        getCurrentDateTime: (fmt) => {
            let date = new Date()
            let o = {
                'M+': date.getMonth() + 1,
                'd+': date.getDate(),
                'h+': date.getHours(),
                'm+': date.getMinutes(),
                's+': date.getSeconds()
            }
            if (/(y+)/.test(fmt)) {
                fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
            }
            for (let k in o) {
                if (new RegExp('(' + k + ')').test(fmt)) {
                    fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
                }
            }
            return fmt
        },
        changeIsJoind(eventId, userId, status) {
            console.log('userId:'+userId)

            let postData = [{
                eventId: eventId,
                userId: userId,
                isJoined: status
            }]            
            this._API.patchEventsRegistered.send(postData).then((data) => {
                this.$Notice.success({
                    title: '成功',
                    desc: '修改成功',
                    duration: Config.successDuration
                })
            })
        },
        changeIsLeave(eventId, userId, status) {
            console.log('userId:'+userId)

            let postData = [{
                eventId: eventId,
                userId: userId,
                isLeaved: status
            }]            
            this._API.patchEventsRegistered.send(postData).then((data) => {
                this.$Notice.success({
                    title: '成功',
                    desc: '修改成功',
                    duration: Config.successDuration
                })
            })
        }        
    }
};
</script>

<style lang="scss" scoped>

</style>
