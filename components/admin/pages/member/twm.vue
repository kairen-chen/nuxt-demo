<template>
<div class="main">
    <Layout class="main">
        <div class="breadcrumb-flex">
            <div>
                <H1>台灣大員工綁定資料管理</H1>
            </div>
            <div>
                <Upload style="display:inline-block" ref="upload" :before-upload="handleBeforeUpload" action="" accept=".xls, .xlsx">
                    <Button type="primary" ghost :loading="uploadLoading" icon="icon icon-ic-output" @click="handleUploadFile">匯入更新</Button>
                </Upload>

            </div>
        </div>        
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
import Config from '@/common/config'
import SearchModal from './searchModalTWM.vue'
import Page from '@/components/admin/layoutUnit/page.vue'
import excel from '@/plugins/common/excel'

export default {
    layout: 'backend',
    components: {
        SearchModal,
        Page
    },
    data() {
        return {
            importPreviewResults: [],
            uploadLoading: false,
            // 分頁
            total: 0,
            current: 0,
            pageSize: 10,
            params: '',
            isSearchModal: true,
            sort: 'enterpriseSerialNumber',
            sortStr: ['enterpriseSerialNumber'],
            columns: [
                {
                    title: '真實姓名',
                    key: 'enterpriseSerialName'
                },                
                {
                    title: '公司電子信箱',
                    key: 'enterpriseSerialEmail'
                },
                {
                    title: '員工編號',
                    key: 'enterpriseSerialNumber'
                },                
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
            this._API.getTWMEnterprise.send(params).then((data) => {
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
            this._API.getTWMEnterprise.send(params).then((data) => {
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
        initUpload() {
            this.file = null
            this.showProgress = false
            this.loadingProgress = 0
            this.tableData = []
            this.tableTitle = []
        },
        handleUploadFile() {
            this.initUpload()
        },
        handleBeforeUpload(file) {
            this.filename = file.name
            const fileExt = file.name.split('.').pop().toLocaleLowerCase()
            if (fileExt === 'xlsx' || fileExt === 'xls') {
                this.readFile(file)
                this.file = file
            } else {
                this.$Notice.warning({
                    title: '提醒',
                    desc: '檔案格式僅支持xlsx或xls',
                })
            }
            return false
        },
        // 读取文件
        readFile(file) {
            // https://blog.csdn.net/qq_34236316/article/details/88814252
            const reader = new FileReader()
            reader.readAsArrayBuffer(file)
            reader.onloadstart = e => {
                this.uploadLoading = true
                this.tableLoading = true
                this.showProgress = true
            }
            reader.onprogress = e => {
                this.progressPercent = Math.round(e.loaded / e.total * 100)
            }
            reader.onerror = e => {
                // console.log('error')
                this.$Message.error(this.$t('LocaleString.E00004'))
            }
            reader.onload = e => {
                // this.$Message.info('文件读取成功')
                // 清空
                let _this = this
                this.importPreviewResults = []
                this.exportPreviewFailData = []
                const data = e.target.result
                const {
                    header,
                    results
                } = excel.read(data, 'array')
                const tableTitle = header.map(item => {
                    return {
                        title: item,
                        key: item
                    }
                })
                // console.log('tableTitle:' + JSON.stringify(header))
                // 判斷欄位是否正確
                let trueHeader = ['真實姓名', '公司電子信箱', '員工編號']
                const arraysAreEqual = trueHeader.sort().toString() == header.sort().toString();
                if (!arraysAreEqual) {
                    this.$Notice.error({
                        title: '提醒',
                        desc: '匯入內容格式錯誤',
                        duration: Config.errorDuration
                    })
                    this.uploadLoading = false
                    this.tableLoading = false
                    this.showRemoveFile = true

                } 
                // else if (results.length > Config.importMaxLimit) {
                //     this.$Notice.error({
                //         title: this.$t('LocaleString.E00037'),
                //         desc: this.$t('LocaleString.W00027', {
                //             0: Config.importMaxLimit
                //         }),
                //         duration: Config.errorDuration
                //     })
                //     this.uploadLoading = false
                //     this.tableLoading = false
                //     this.showRemoveFile = true

                // } 
                else {
                    console.log(JSON.stringify(results))
                    this.tableData = results
                    this.tableTitle = tableTitle
                    this.uploadLoading = false
                    this.tableLoading = false
                    this.showRemoveFile = true

                    let newdata = []
                    let obj = {}
                    // let totalImportCount = 0
                    let pidArray = []
                    let failObj = {}
                    let errorMsg = ''
                    // let _account = '* Account'
                    results.forEach(function (item, index, array) {

                        
                            obj = {
                                enterpriseSerialName: item['真實姓名'] ? String(item['真實姓名']) : '',
                                enterpriseSerialNumber: item['員工編號'] ? String(item['員工編號']) : '',
                                enterpriseSerialEmail: item['公司電子信箱'] ? String(item['公司電子信箱']) : '',
                            }
                            newdata.push(obj)
                        

                        // obj = {
                        //     // code: item.code ? item.code : '',
                        //     pid: item['* PID (MAC)'] ? item['* PID (MAC)'] : '',
                        //     name: item['* Name'] ? item['* Name'] : '',
                        //     objectCode: item['Bind object code'] ? item['Bind object code'] : '',
                        // }
                        // newdata.push(obj)
                        // totalImportCount++
                    })

                    // this.importPreviewResults = newdata
                    console.log('newdata:' + JSON.stringify(newdata))
                    this.patchUpdate(newdata)
                }
            }
        },
        patchUpdate(newdata) {

            // console.log(data)
            let _this = this
            let errorDesc = ''
            this._API.postTWMEnterprise.send(newdata).then((data) => {

                for (let f = 0; f < data.length; f++) {
                    if (data[f].errors) {
                        _this.modal_loading = false
                        for (let i in data[f].errors) {
                            switch (data[f].errors[i].error) {
                                case 'invalidRequest':
                                    errorDesc = '參數無效或無法識別'
                                    break
                                case 'invalidToken':
                                    errorDesc = '憑證已過期無效請重新執行此操作'
                                    break
                                case 'npoNotFound':
                                    errorDesc = '此NPO不存在'
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


                if (errorDesc) {
                    _this.$Notice.error({
                        title: '錯誤',
                        desc: errorDesc,
                        duration: Config.errorDuration
                    })
                } else {
                    _this.$Notice.success({
                        title: '成功',
                        desc: '匯入成功',
                        duration: Config.successDuration
                    })
                    this.getList()
                    
                }
            })
        }
    }
};
</script>

<style lang="scss" scoped>

</style>
