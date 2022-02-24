<template>
<div class="main">
    <Layout class="main">
        <div class="add-form">
            <!-- <EditModal v-if="isEditModal" /> -->
            <div class="add-form-content">
                <div class="form-head">
                    <div class="form-head-title">新增推播訊息</div>
                </div>
                <Divider style="margin:16px 0px" />

                <Form id="addFormValidate" ref="addFormValidate" :model="addFormValidate" :rules="addRuleValidate" label-position="top">

                    <Row>
                        <i-Col span="12">
                            <FormItem class="add-form-item" label="訊息主題" prop="subject">
                                <Input v-model.trim="addFormValidate.subject" maxlength="65" placeholder="限制輸入65字元內"></Input>
                            </FormItem>
                        </i-Col>
                    </Row>
                    <Row>
                        <i-Col span="24">
                            <FormItem class="add-form-item" label="訊息內容" prop="content">
                                <Input v-model.trim="addFormValidate.content" type="textarea"  maxlength="240" placeholder="限制輸入240字元內" :rows="5"></Input>
                            </FormItem>
                        </i-Col>
                    </Row>

                    <Row>
                        <i-Col span="6">
                            <FormItem class="add-form-item" label="訊息連結頁面類型" prop="pageType">
                                <Select v-model="addFormValidate.pageType" style="width:200px" placeholder="請選擇">
                                    <Option v-for="item in typeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                </Select>
                            </FormItem>
                        </i-Col>
                        <i-Col v-if="addFormValidate.pageType=='eventDetail' || addFormValidate.pageType=='eventEnterpriseDetail' || addFormValidate.pageType=='eventSupplyDetail'" span="12">
                            <FormItem class="add-form-item" label="指定活動" prop="eventId">
                                <Select v-if="addFormValidate.pageType=='eventDetail'" v-model="addFormValidate.pageTypeId" style="width:500px" placeholder="請選擇" filterable>
                                    <Option v-for="item in volunteerEventList" :value="item.id" :key="item.id">{{ item.subject }}</Option>
                                </Select>
                                <Select v-if="addFormValidate.pageType=='eventEnterpriseDetail'" v-model="addFormValidate.pageTypeId" style="width:500px" placeholder="請選擇" filterable>
                                    <Option v-for="item in enterpriseEventList" :value="item.id" :key="item.id">{{ item.subject }}</Option>
                                </Select>
                                <Select v-if="addFormValidate.pageType=='eventSupplyDetail'" v-model="addFormValidate.pageTypeId" style="width:500px" placeholder="請選擇" filterable>
                                    <Option v-for="item in supplyEventList" :value="item.id" :key="item.id">{{ item.subject }}</Option>
                                </Select>                                                                
                            </FormItem>
                        </i-Col>                        
                    </Row>
                    <Row>
                        <i-Col span="6">
                            <FormItem class="add-form-item" label="推送對象" prop="msgType">
                                <Select v-model="addFormValidate.msgType" style="width:200px" placeholder="請選擇">
                                    <Option v-for="item in targetList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                </Select>
                            </FormItem>
                        </i-Col>
                        <i-Col v-if="addFormValidate.msgType=='1'" span="12">
                            <FormItem class="add-form-item" label="選擇NPO" prop="msgSubscribeNpoId">
                                <Select v-model="addFormValidate.msgSubscribeNpoId" style="width:500px" placeholder="請選擇" filterable>
                                    <Option v-for="item in npoList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                                </Select>
                            </FormItem>
                        </i-Col>      
                        <i-Col v-if="addFormValidate.msgType=='2'" span="12">
                            <FormItem class="add-form-item" label="選擇會員" prop="msgUserId">
                                <Select v-model="addFormValidate.msgUserId" style="width:500px" placeholder="請選擇" filterable>
                                    <Option v-for="item in usersList" :value="item.id" :key="item.id">{{ item.username }}</Option>
                                </Select>
                            </FormItem>
                        </i-Col>                                             
                    </Row>


                </Form>

                <div style="text-align:center">
                    <Button style="width:150px" @click="$router.back()">返回</Button>
                    <Button type="primary" style="margin-left: 8px; width:150px" @click="addHandleSubmit('addFormValidate')">送出</Button>
                </div>
            </div>
        </div>
    </Layout>
</div>
</template>

<script>
import Config from '@/common/config'
export default {
    layout: 'backend',
    components: {},
    data() {     
        return {
            targetList: [
                {
                    value: 0,
                    label: '全部會員'
                },
                {
                    value: 1,
                    label: '關注特定NPO的會員'
                },
                {
                    value: 2,
                    label: '指定會員'
                },                
            ],            
            eventList: [],
            typeList: [
                {
                    value: 'eventList',
                    label: '一般志工活動列表頁'
                },
                {
                    value: 'eventDetail',
                    label: '一般志工活動詳情頁'
                },
                {
                    value: 'eventEnterpriseList',
                    label: '企業志工活動列表頁'
                },
                {
                    value: 'eventEnterpriseDetail',
                    label: '企業志工活動詳情頁'
                },
                {
                    value: 'eventSupplyList',
                    label: '物資活動列表頁'
                },
                {
                    value: 'eventSupplyDetail',
                    label: '物資活動詳情頁'
                },
            ],
            userList: [],
            addFormValidate: {
                subject: '',
                content: '',
                pageType: null,
                pageTypeId: null,
                msgType: null,
                msgUserId: null,
                msgSubscribeNpoId: null,
            },
            addRuleValidate: {
                subject: [{
                    required: true,
                    type: 'string',
                    message: '請輸入訊息主題',
                    trigger: 'submit'
                }],  
                content: [{
                    required: true,
                    type: 'string',
                    message: '請輸入訊息內容',
                    trigger: 'submit'
                }],                 
                pageType: [{
                    required: true,
                    type: 'string',
                    message: '請選擇訊息連結頁面類型',
                    trigger: 'submit'
                }],    
                msgType: [{
                    required: true,
                    type: 'integer',
                    message: '請選擇推送對象',
                    trigger: 'submit'
                }],                 
            },
        };

    },
    mounted() {

        this.getNposMenu()
        this.getUsersMenu()
        this.getVolunteerEventsMenu()
        this.getEnterpriseEventsMenu()
        this.getSupplyEventsMenu()
    },
    methods: {
        getNposMenu() {
            let _this = this
            let str = ' id eq ' + this.$route.params.id
            let params = {
                // search: str,
                inlinecount: true,
            }
            // this.$service.getUserRolesPage.requestCommon(_this.queryStr, current, pageSize)
            this._API.getNposMenu.send(params).then((data) => {
                this.npoList = data
            })
        },
        getUsersMenu() {
            let _this = this
            // let str = ' id eq ' + this.$route.params.id
            let params = {
                // search: str,
                inlinecount: true,
            }
            // this.$service.getUserRolesPage.requestCommon(_this.queryStr, current, pageSize)
            this._API.getNotificationsMenu.send(params).then((data) => {
                this.usersList = data
            })
        },        
        getVolunteerEventsMenu() {
            let _this = this
            let str = ' id eq ' + this.$route.params.id
            let params = {
                type: 1,
                closeDate: this.getCurrentDateTime('yyyy-MM-dd hh:mm:ss'),
                inlinecount: true,
            }
            // this.$service.getUserRolesPage.requestCommon(_this.queryStr, current, pageSize)
            this._API.getEventsMenu.send(params).then((data) => {
                this.volunteerEventList = data
            })
        },  
        getEnterpriseEventsMenu() {
            let _this = this
            let str = ' id eq ' + this.$route.params.id
            let params = {
                type: 2,
                closeDate: this.getCurrentDateTime('yyyy-MM-dd hh:mm:ss'),
                inlinecount: true,
            }
            // this.$service.getUserRolesPage.requestCommon(_this.queryStr, current, pageSize)
            this._API.getEventsMenu.send(params).then((data) => {
                this.enterpriseEventList = data
            })
        },         
        getSupplyEventsMenu() {
            let _this = this
            let str = ' id eq ' + this.$route.params.id
            let params = {
                type: 3,
                closeDate: this.getCurrentDateTime('yyyy-MM-dd hh:mm:ss'),
                inlinecount: true,
            }
            // this.$service.getUserRolesPage.requestCommon(_this.queryStr, current, pageSize)
            this._API.getEventsMenu.send(params).then((data) => {
                this.supplyEventList = data
            })
        },         
        addHandleSubmit(name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    this.modal_loading = true
                    let data = []

                    data.push({
                        subject: this.addFormValidate.subject,
                        content: this.addFormValidate.content,
                        pageType: this.addFormValidate.pageType,
                        pageTypeId: this.addFormValidate.pageTypeId,
                        msgType: this.addFormValidate.msgType,
                        msgUserId: this.addFormValidate.msgUserId,
                        msgSubscribeNpoId: this.addFormValidate.msgSubscribeNpoId,
                    })
                    console.log(data)
                    let _this = this
                    let errorDesc = ''
                    this._API.postPushMessage.send(data).then((data) => {

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
                                        case 'userNotFound':
                                            errorDesc = '找不到指定會員'
                                            break
                                        case 'eventNotFound':
                                            errorDesc = '找不到指定事件'
                                            break        
                                        case 'npoNotFound':
                                            errorDesc = '找不到指定NPO'
                                            break   
                                        case 'subscribedUserNotFound':
                                            errorDesc = '找不到指定關注NPO的會員'
                                            break                                                                                                                              
                                        case 'requestUnavailable':
                                            errorDesc = '稍後重試請求'
                                            break
                                        case 'internalError':
                                            errorDesc = '系統忙碌中'
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
                                desc: '新增成功',
                                duration: Config.successDuration
                            })
                            this.$router.push({
                                name: 'backendPushNotificationList'
                            })

                        }
                    })
                }
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
    }
};
</script>

<style lang="scss" scoped>
.previewPlanes {
    max-width: 100%;
    max-height: 300px;
}
</style>
