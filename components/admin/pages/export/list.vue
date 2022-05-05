<template>
<div class="main">
    <Layout class="main">
        <div class="breadcrumb-flex">
            <div>
                <H1>資料匯出</H1>
            </div>
        </div>

        <Content>
            <Table :columns="columns" :data="list" stripe no-data-text="暫無資料"></Table>

        </Content>
    </Layout>
    <PageLoading v-if="isPageLoading" />

</div>
</template>

<script>
import XLSX from "xlsx"
import PageLoading from "@/components/admin/layoutUnit/PageLoading.vue";



export default {
    layout: 'backend',
    components: {
        PageLoading
    },
    data() {
        return {
            isPageLoading: false,
            exportDataArray: [],
            // 分頁
            total: 0,
            current: 0,
            pageSize: 10,
            params: '',
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
                        render: (h, params) => {
                        return h('div', [
                            h('span', {
                                class: {
                                    titleItem: true
                                },
                                on: {
                                    click: () => {
                                        this.exportData(params.row.key);
                                    }
                                }
                            }, params.row.title),
                        ])
                    }
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
            this._API.getBanner.send(params).then((data) => {
                // _this.list = data.results
                _this.list = [
                    {title:'NPO資料：名稱、聯絡人姓名電話email、地址、平台刊登活動數', key: 'npoData'},
                    {title:'活動資料：架上/已下架、組織名稱/活動名稱/時間/參與人數', key: 'eventData'},
                    {title:'志工排名：姓名/email/電話/參加過活動', key: 'rankingData'},
                    {title:'狀態統計：活動總數、志工總數、志工報名次數、志工報到次數、已完成審核NPO總數', key: 'statusData'},
                    {title:'富邦愛心志工社會員參與活動名單', key: 'bindFubonData'},
                    {title:'台灣大員工參與活動名單', key: 'bindTwmData'},
                ]

            })

        },
        exportData(item) {
            switch(item) {
                case "npoData":
                    this.exportNpoData()
                    break;
                case "eventData":
                    this.isPageLoading = true
                    this.exportEventData()
                    break;    
                case "statusData":
                    this.exportStatusData()
                    break;    
                case "rankingData":
                    this.isPageLoading = true
                    this.exportRankingData()
                    break;
                case "bindFubonData":
                    this.exportFubonData()
                    break;   
                case "bindTwmData" :
                    this.exportTwmData()
                    break;                 
            }
        },
        exportNpoData() {
            let _this = this
            let _exportData = []
            let obj = {}

            let str = 'isVerified eq true'

            let params = {
                search: str,
                inlinecount: true,
                sort: 'id,desc'
            }
            
            this._API.getNpos.send(params).then((data) => {
                // _this.list = data.results
                // _this.total = data.count
                // console.log(data)

                data.results.forEach(function (item, index, array) {

                    obj = {
                        '名稱': String(item.name),
                        '聯絡人姓名': String(item.contactName),
                        '電話': String(item.contactPhone),
                        'Email': String(item.contactEmail),
                        '地址': String(item.contactAddress),
                        '平台刊登活動數': String(item.eventNum),
                    }

                    _exportData.push(obj)
                })
                // YYYYMMDDHHMM_UsersList.xlsx
                var exportFileName = this.getCurrentDateTime('yyyyMMddhhmm') + '_NPO資料.xlsx'
                var exportSheetName = this.getCurrentDateTime('yyyyMMddhhmm') + '_NPO資料'
                var animalWS = XLSX.utils.json_to_sheet(_exportData)
                var wb = XLSX.utils.book_new() // make Workbook of Excel
                XLSX.utils.book_append_sheet(wb, animalWS, exportSheetName) // sheetAName is name of Worksheet
                XLSX.writeFile(wb, exportFileName) // name of the file is 'book.xlsx'   
            })

        },
        exportEventData() {
            let _this = this
            // let _exportData = []
            let obj = {}

            let params = {
                // search: str,
                inlinecount: true,
                sort: 'id,desc',
                page: 0,
                size: 500,
            }

            let d = Date.now()
             
            this._API.getEvents.send(params).then((data) => {
                // _this.list = data.results
                // _this.total = data.count
                // console.log(data)

                data.results.forEach(function (item, index, array) {
                    // console.log(Date.parse(item.closeDate))

                    obj = {
                        '狀態': Date.parse(item.closeDate)>d ? '上架中': '已下架',
                        '組織名稱': String(item.npoName),
                        '活動名稱': String(item.subject),
                        '活動起迄時間': String(item.happenDate)+' ~ '+String(item.closeDate),
                        '參與人數': String(item.currentVolunteerNum),
                    }

                    _this.exportDataArray.push(obj)
                })
                let totalCount = data.count
                if(totalCount>500) {                   
                    _this.getEventsSync(totalCount)                  
                }else {
                    var exportFileName = this.getCurrentDateTime('yyyyMMddhhmm') + '_活動資料.xlsx'
                    var exportSheetName = this.getCurrentDateTime('yyyyMMddhhmm') + '_活動資料'
                    var animalWS = XLSX.utils.json_to_sheet(_this.exportDataArray)
                    var wb = XLSX.utils.book_new() // make Workbook of Excel
                    XLSX.utils.book_append_sheet(wb, animalWS, exportSheetName) // sheetAName is name of Worksheet
                    XLSX.writeFile(wb, exportFileName) // name of the file is 'book.xlsx' 
                    _this.isPageLoading = false
                    _this.exportDataArray = []
                }
            })
        },   
        exportRankingData() {
            let _this = this
            // let _exportData = []
            let obj = {}

            let params = {
                // search: str,
                inlinecount: true,
                // sort: 'id,desc',
                // page: 0,
                // size: 500,
            }

            let d = Date.now()
             
            this._API.getDumpRanking.send(params).then((data) => {
                // _this.list = data.results
                // _this.total = data.count
                // console.log(data)
                let strArray = []
                let companyName = ''
                data.results.forEach(function (item, index, array) {
                    // console.log(Date.parse(item.closeDate))
                    if(item.enterpriseSerialCode) {
                        strArray = item.enterpriseSerialCode.split(',')
                        strArray.forEach(element => {
                            switch(element) {
                                case "fubon":
                                    companyName += '富邦基金會員工,'
                                    break;
                                case "twmEnterprise":
                                    companyName += '台灣大企業員工,'
                                    break;
                                // case "twmMember":
                                //     companyName += '台灣大會員,'
                                //     break;
                            }
                        });
                        companyName = companyName.slice(0, -1)
                    }
                    

                    obj = {
                        '排名': String(item.ranking),
                        '姓名': String(item.name),
                        '公司別': String(companyName),
                        'email': String(item.email),
                        '電話': String(item.phone),
                        '參加過活動': item.eventNames? String(item.eventNames) :'',
                    }

                    _this.exportDataArray.push(obj)
                    companyName = ''
                })
                let totalCount = data.count
                // if(totalCount>500) {                   
                //     _this.getEventsSync(totalCount)                  
                // }else {
                    var exportFileName = this.getCurrentDateTime('yyyyMMddhhmm') + '_志工排名.xlsx'
                    var exportSheetName = this.getCurrentDateTime('yyyyMMddhhmm') + '_志工排名'
                    var animalWS = XLSX.utils.json_to_sheet(_this.exportDataArray)
                    var wb = XLSX.utils.book_new() // make Workbook of Excel
                    XLSX.utils.book_append_sheet(wb, animalWS, exportSheetName) // sheetAName is name of Worksheet
                    XLSX.writeFile(wb, exportFileName) // name of the file is 'book.xlsx' 
                    _this.isPageLoading = false
                    _this.exportDataArray = []
                // }
            })
        },  
        exportStatusData() {
            let _this = this
            let _exportData = []
            let obj = {}

            let params = {
                // search: str,
                inlinecount: true,
            }

            this._API.getStatisticsStatus.send(params).then((data) => {
                // _this.list = data.results
                // _this.total = data.count
                // console.log(data)

                obj = {
                    '志工活動總數': data.eventCount,
                    '企業志工活動總數': data.enterpriseEventCount,
                    '物資需求總數': data.supplyEventCount,
                    '微樂樂志工會員總數': data.memberCount,
                    '志工報名次數': data.eventRegisterCount,
                    '志工報到次數': data.eventFinishCount,
                    '企業志工報名次數': data.enterpriseRegisterCount,
                    '企業志工報到次數': data.enterpriseFinishCount,
                    '物資捐贈報名次數': data.supplyEventRegisterCount,
                    '物資捐贈完成次數': data.supplyFinishCount,
                    'NPO數量 (已審核通過 / 所有NPO總數)': data.npoVerifiedCount+' / '+data.npoCount,
                }

                _exportData.push(obj)
                // YYYYMMDDHHMM_UsersList.xlsx
                var exportFileName = this.getCurrentDateTime('yyyyMMddhhmm') + '_狀態統計.xlsx'
                var exportSheetName = this.getCurrentDateTime('yyyyMMddhhmm') + '_狀態統計'
                var animalWS = XLSX.utils.json_to_sheet(_exportData)
                var wb = XLSX.utils.book_new() // make Workbook of Excel
                XLSX.utils.book_append_sheet(wb, animalWS, exportSheetName) // sheetAName is name of Worksheet
                XLSX.writeFile(wb, exportFileName) // name of the file is 'book.xlsx'   
            })

        },   
        exportFubonData() {
            let _this = this
            let _exportData = []
            let obj = {}

            // let str = 'isVerified eq true'

            let params = {
                // search: str,
                inlinecount: true,
                // sort: 'id,desc'
            }
            
            this._API.getDumpFubonEvent.send(params).then((data) => {
                // _this.list = data.results
                // _this.total = data.count
                // console.log(data)
                if(data.count>0) {
                    data.results.forEach(function (item, index, array) {

                        obj = {
                            '※活動標示編號': String(item.eventId),
                            '※報名帳號': String(item.userName),
                            '※報名人身分證號或護照號碼': String(item.securityId),
                            '※本國人士(1是0否)': 1,
                            '※姓名': String(item.name),
                            '': '',
                            '※新增活動標示': String(item.eventUid),
                            '※新增活動名稱': String(item.eventSubject),
                            '活動次標題': '',
                            '場次名稱': '',
                            '說明': String(item.note),
                            '※活動日期時間': String(item.eventDate),
                            '※服務時數': String(item.eventHour),
                        }

                        _exportData.push(obj)
                    })
                }else {
                    _exportData.push({
                            '※活動標示編號': '',
                            '※報名帳號': '',
                            '※報名人身分證號或護照號碼': '',
                            '※本國人士(1是0否)': '',
                            '※姓名': '',
                            '': '',
                            '※新增活動標示': '',
                            '※新增活動名稱': '',
                            '活動次標題': '',
                            '場次名稱': '',
                            '說明': '',
                            '※活動日期時間': '',
                            '※服務時數': '',
                        })
                }
                // YYYYMMDDHHMM_UsersList.xlsx
                var exportFileName = this.getCurrentDateTime('yyyyMMddhhmm') + '_富邦愛心社後台表單.xlsx'
                var exportSheetName = this.getCurrentDateTime('yyyyMMddhhmm') + '_富邦愛心社後台表單資料'
                var animalWS = XLSX.utils.json_to_sheet(_exportData)
                var wb = XLSX.utils.book_new() // make Workbook of Excel
                XLSX.utils.book_append_sheet(wb, animalWS, exportSheetName) // sheetAName is name of Worksheet
                XLSX.writeFile(wb, exportFileName) // name of the file is 'book.xlsx'   
            })

        },     
        exportTwmData() {
            let _this = this
            let _exportData = []
            let obj = {}

            // let str = 'isVerified eq true'

            let params = {
                // search: str,
                inlinecount: true,
                // sort: 'id,desc'
            }
            
            this._API.getDumpTwmEvent.send(params).then((data) => {
                // _this.list = data.results
                // _this.total = data.count
                // console.log(data)
                if(data.count>0) {
                    data.results.forEach(function (item, index, array) {

                        obj = {
                            '活動ID': String(item.eventId),
                            '活動名稱': String(item.eventSubject),
                            '志工時數': String(item.eventHour),
                            '員工帳號': String(item.userName),
                            '真實姓名': String(item.enterpriseSerialName),
                            '公司電子信箱': String(item.enterpriseSerialEmail),
                            '員工編號': String(item.enterpriseSerialNumber),
                            '身分證字號後五碼': String(item.enterpriseSerialSecurityId),
                            '電話': String(item.enterpriseSerialPhone),
                            '部門': String(item.enterpriseSerialDepartment),
                            // '公司別': String(item.enterpriseSerialType),
                            '企業志工分組': String(item.enterpriseSerialGroup),
                        }

                        _exportData.push(obj)
                    })
                }else {
                    _exportData.push({
                        '活動ID': '',
                        '活動名稱': '',
                        '志工時數': '',
                        '員工帳號': '',
                        '真實姓名': '',
                        '公司電子信箱': '',
                        '員工編號': '',
                        '身分證字號後五碼': '',
                        '電話': '',
                        '部門': '',
                        '企業志工分組': '',
                    })
                }
                // YYYYMMDDHHMM_UsersList.xlsx
                var exportFileName = this.getCurrentDateTime('yyyyMMddhhmm') + '_台灣大員工參與活動表單.xlsx'
                var exportSheetName = this.getCurrentDateTime('yyyyMMddhhmm') + '_台灣大員工參與活動表單資料'
                var animalWS = XLSX.utils.json_to_sheet(_exportData)
                var wb = XLSX.utils.book_new() // make Workbook of Excel
                XLSX.utils.book_append_sheet(wb, animalWS, exportSheetName) // sheetAName is name of Worksheet
                XLSX.writeFile(wb, exportFileName) // name of the file is 'book.xlsx'   
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
       
        async getEventsSync(totalCount) {
            let _this = this
            let params = {}
            let d = Date.now()
            let obj = {}
            let loop = parseInt(totalCount/500)
            for(let i=1; i<=loop; i++) {
                params = {
                    // search: str,
                    inlinecount: true,
                    sort: 'id,desc',
                    page: i,
                    size: 500,
                }
                await this._API.getEvents.send(params).then((data) => {
                    data.results.forEach(function (item, index, array) {
                        obj = {
                            '狀態': Date.parse(item.closeDate)>d ? '上架中': '已下架',
                            '組織名稱': String(item.npoName),
                            '活動名稱': String(item.subject),
                            '活動起迄時間': String(item.happenDate)+' ~ '+String(item.closeDate),
                            '參與人數': String(item.currentVolunteerNum),
                        }

                        _this.exportDataArray.push(obj)
                    })



                })
            }

            var exportFileName = this.getCurrentDateTime('yyyyMMddhhmm') + '_活動資料.xlsx'
            var exportSheetName = this.getCurrentDateTime('yyyyMMddhhmm') + '_活動資料'
            var animalWS = XLSX.utils.json_to_sheet(_this.exportDataArray)
            var wb = XLSX.utils.book_new() // make Workbook of Excel
            XLSX.utils.book_append_sheet(wb, animalWS, exportSheetName) // sheetAName is name of Worksheet
            XLSX.writeFile(wb, exportFileName) // name of the file is 'book.xlsx'     
            _this.isPageLoading = false
            _this.exportDataArray = []         
        }
        
    }
};
</script>

<style lang="scss">
    .ivu-table-cell .titleItem {
        cursor: pointer;
        color: #428bca
    }
    .ivu-table-cell .titleItem:hover {
        text-decoration: underline;
    }    
</style>
