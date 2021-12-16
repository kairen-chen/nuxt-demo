<template>
<div class="main">
    <Layout class="main">
        <div class="edit-form">
            <!-- <EditModal v-if="isEditModal" /> -->
            <div class="edit-form-content">
                <div class="form-head">
                    <div class="form-head-title">企業志工活動資料更新</div>
                </div>
                <Divider style="margin:16px 0px" />

                <Form id="editFormValidate" ref="editFormValidate" :model="editFormValidate" :rules="editRuleValidate" label-position="top">

                    <Row>
                        <i-Col span="12">
                            <FormItem class="edit-form-item" label="活動主題" prop="subject">
                                <Input v-model.trim="editFormValidate.subject" maxlength="300"></Input>
                            </FormItem>
                            <div class="hint">
                                <p>提醒A. 為方便於app閱讀，8字內宜佳，請勿使用（ ）, : -、等特殊符號字元</p>
                                <p>提醒B. 長期志工建議於主題欄註明，例如：國小課後輔導(長期)</p>
                                <p>提醒C. 若活動分多梯次，建議以刊登不同則活動進行區分，例如：台哥大數位營-1、台哥大數位營-2</p>
                            </div>
                        </i-Col>
                        <i-Col span="12">
                            <FormItem class="edit-form-item" label="活動類型" prop="volunteerType">
                                <!-- <Input v-model.trim="editFormValidate.code" maxlength="20"  disabled></Input> -->
                                <Select v-model="editFormValidate.volunteerType" :transfer="true" placeholder="請選擇">
                                    <Option v-show="item.value!='all'" v-for="item in articleTypeList.volunteerType" :value="item.value" :key="item.value">{{item.label}}</Option>
                                    <!-- <Option v-for="item in servicesMenu" :value="item.code" :key="item.code">{{item.code}}</Option> -->
                                </Select>
                            </FormItem>
                        </i-Col>
                    </Row>
                    <Row>
                        <i-Col span="12">
                            <FormItem class="edit-form-item" label="活動圖片" prop="image1">
                                <!-- <a v-show="!NpoIconUpdSRC" :href="editFormValidate.thumbPath" target="_blank"><img :src="editFormValidate.thumbPath" height="200"></a> -->

                                <a v-show="!NpoIconUpdSRC" :href="editFormValidate.thumbPath" target="_blank"><img :src="editFormValidate.thumbPath" width="100"></a>
                                <div class="upd-img" v-show="NpoIconUpdSRC">
                                    <img class="previewPlanes" :src="NpoIconUpdSRC" alt="">
                                </div>
                                <Upload ref="uploadImg" action="" :show-upload-list="false" accept="image/png, image/jpeg" :before-upload="handleUploadNpoIcon">
                                    <Button icon="ios-cloud-upload-outline">更新檔案</Button>
                                </Upload>
                            </FormItem>
                            <div class="hint">提醒. 請上傳 RGB 格式的 JPEG 圖片，請勿使用 CMYK 格式的 JPEG 圖片</div>
                        </i-Col>
                        <i-Col span="12">
                            <FormItem class="edit-form-item" label="活動詳細資訊" prop="description">
                                <Input v-model.trim="editFormValidate.description" type="textarea" :rows="5"></Input>
                            </FormItem>
                            <div class="hint">請註明該活動聯絡窗口(姓名、電話、email)，以便民眾有疑問可直接聯繫</div>
                        </i-Col>

                    </Row>
                    <Row>
                        <i-Col span="12">
                            <Row>
                                <i-Col span="6">
                                    <FormItem class="edit-form-item" label="活動舉辦縣市" prop="addressCity">
                                        <Select v-model="editFormValidate.addressCity" :transfer="true" placeholder="請選擇">
                                            <Option v-show="item.value!='all'" v-for="item in articleTypeList.location" :value="item.value" :key="item.value">{{item.label}}</Option>
                                            <!-- <Option v-for="item in servicesMenu" :value="item.code" :key="item.code">{{item.code}}</Option> -->
                                        </Select>
                                    </FormItem>
                                </i-Col>
                                <i-Col span="14">
                                    <FormItem class="edit-form-item" label="地址" prop="address">
                                        <Input v-model.trim="editFormValidate.address" placeholder="中正路100號"></Input>
                                    </FormItem>
                                </i-Col>
                            </Row>
                        </i-Col>
                        <i-Col span="6">
                            <FormItem class="edit-form-item" label="緯度" prop="lat">
                                <Input v-model.trim="editFormValidate.lat"></Input>
                            </FormItem>
                            <div class="hint"><a href="https://support.google.com/maps/answer/18539?hl=zh-Hant&co=GENIE.Platform%3DDesktop" target="_blank">如何取得地點座標？</a></div>
                        </i-Col>
                        <i-Col span="6">
                            <FormItem class="edit-form-item" label="經度" prop="lng">
                                <Input v-model.trim="editFormValidate.lng"></Input>
                            </FormItem>
                        </i-Col>
                    </Row>
                    <Row>
                        <i-Col span="12">
                            <FormItem class="edit-form-item" label="活動標籤(新增標籤輸入完後請按Enter鍵選取)" prop="tags">

                                <Select class="tagInput" v-model="editFormValidate.tags" filterable multiple allow-create @on-create="handleCreate2" placeholder="請選擇">
                                    <Option v-for="item in tagsList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                </Select>
                            </FormItem>
                        </i-Col>
                    </Row>  
                    <Row>
                        <i-Col span="12">
                            <FormItem class="edit-form-item" label="活動開始時間" prop="happenDate">
                                <DatePicker type="datetime" v-model.trim="editFormValidate.happenDate" placeholder="請選擇" format="yyyy-MM-dd HH:mm:ss" style="width: 200px"></DatePicker>
                            </FormItem>
                        </i-Col>
                        <i-Col span="12">
                            <FormItem class="edit-form-item" label="活動結束時間" prop="closeDate">
                                <DatePicker type="datetime" v-model.trim="editFormValidate.closeDate" placeholder="請選擇" format="yyyy-MM-dd HH:mm:ss" style="width: 200px"></DatePicker>
                            </FormItem>
                        </i-Col>

                    </Row>

                    <Row>
                        <i-Col span="12">
                            <FormItem class="edit-form-item" label="志工報名結束時間" prop="registerDeadlineDate">
                                <DatePicker type="datetime" v-model.trim="editFormValidate.registerDeadlineDate" placeholder="請選擇" format="yyyy-MM-dd HH:mm:ss" style="width: 200px"></DatePicker>
                            </FormItem>
                            <div class="hint">提醒. 志工報名結束時間一到，該活動將自動於最新活動下架<br>招募長期志工，建議志工報名結束時間為活動結束時間，方可持續開放報名</div>
                        </i-Col>
                        <i-Col span="12">
                            <FormItem class="edit-form-item" label="志工須知" prop="volunteerTrainingDesc">
                                <Input v-model.trim="editFormValidate.volunteerTrainingDesc" type="textarea" :rows="5"></Input>
                            </FormItem>
                        </i-Col>
                    </Row>
                    <Row>
                        <i-Col span="12">
                            <FormItem class="edit-form-item" label="志工可獲得時數" prop="eventHour">
                                <Input v-model.trim="editFormValidate.eventHour" maxlength="64"></Input>
                            </FormItem>
                            <div class="hint">(最小單位0.5小時)</div>
                        </i-Col>
                        <i-Col span="12">
                            <FormItem class="edit-form-item" label="是否需要身分證字號(如保險等)" prop="insurance">
                                <Checkbox v-model="editFormValidate.insurance"></Checkbox>
                            </FormItem>
                            <FormItem v-if="editFormValidate.insurance" class="edit-form-item" label="保險內容詳述" prop="insuranceDescription">
                                <Input v-model.trim="editFormValidate.insuranceDescription" type="textarea" :rows="5"></Input>
                            </FormItem>
                        </i-Col>
                    </Row>
                    <Row>
                        <i-Col span="24">
                            <Row>
                                <i-Col span="4">
                                    <FormItem class="edit-form-item" label="分組">
                                        <Checkbox v-model="editFormValidate.requiredGroup">需分組</Checkbox>
                                    </FormItem>
                                </i-Col>
                                <i-Col v-show="!editFormValidate.requiredGroup" span="8">
                                    <FormItem class="edit-form-item" label="技能" prop="skillsDescription">
                                        <Input v-model="editFormValidate.skillsDescription" placeholder="非必填"></Input>
                                    </FormItem>
                                </i-Col>
                            </Row>
                            <div class="paddingLR10">
                                <p>分組：列出各組所需條件或技能，讓民眾可直接報名想參加的組別或時段。</p>
                                <p>例如：任務分組：接待組 口齒清新、英文能力中等</p>
                                <p>攝影組：喜歡攝錄影、需扛重物</p>
                                <p>專長分組：英文翻譯組、導覽組、報表key in組</p>
                                <p>時段分組：上午9:00~12:00組、下午13:00-17:00組</p>
                                <p>日期分組：4/1周二13:00~14:00組、4/3周四14:00~15:00組</p>
                            </div>
                            <FormItem v-show="editFormValidate.requiredGroup">
                                <Row>
                                    <i-Col class="groupSection" span="8" v-for="(item, index) in editFormValidate.skillGroups" :key="item.id">
                                        <Row class="groupSection">
                                            <Col span="12">
                                            <FormItem label="組別">
                                                <Input type="text" v-model="item.name" placeholder="組別名稱"></Input>
                                            </FormItem>
                                            </Col>
                                            <Col span="11" offset="1">
                                            <FormItem label="人數(最大1,000)">
                                                <Input type="text" v-model="item.volunteerNumber" placeholder="需求數量"></Input>
                                            </FormItem>
                                            </Col>
                                        </Row>
                                        <Row class="groupSection">
                                            <Col span="16">
                                            <Input type="text" v-model="item.skillsDescription" placeholder="技能(非必填)"></Input>
                                            </Col>
                                            <Col span="7" offset="1">
                                            <Button @click="handleRemove(index, item.id)">刪除</Button>
                                            </Col>
                                        </Row>

                                        <!-- <Button @click="handleRemove(index)">Delete</Button> -->
                                        <!-- </Col> -->
                                    </i-Col>
                                </Row>
                            </FormItem>
                            <FormItem v-show="editFormValidate.requiredGroup">
                                <Row>
                                    <Col span="12" class="paddingLR10">
                                    <Button type="dashed" long @click="handleAdd" icon="md-add">新增組別</Button>
                                    </Col>
                                </Row>
                            </FormItem>
                        </i-Col>
                    </Row>
                    <Row>
                        <i-Col span="6">
                            <FormItem class="edit-form-item" label="志工報名人數上限" prop="requiredVolunteerNum">
                                <Input v-model.trim="editFormValidate.requiredVolunteerNum" maxlength="20"></Input>
                            </FormItem>
                            <div class="hint">(請填寫整數)</div>
                        </i-Col>
                        <i-Col span="6">
                            <FormItem class="edit-form-item" label="已報名人數" prop="currentVolunteerNum">
                                <div v-if="isStaff=='false'">{{editFormValidate.currentVolunteerNum}}</div>
                                <Input v-if="isStaff=='true'" v-model.trim="editFormValidate.currentVolunteerNum" maxlength="20"></Input>
                            </FormItem>
                        </i-Col>
                        <i-Col span="12">
                            <FormItem class="edit-form-item" label="備註" prop="note">
                                <Input v-model.trim="editFormValidate.note" type="textarea" :rows="5"></Input>
                            </FormItem>
                        </i-Col>
                    </Row>
                    <Row>
                        <i-Col span="12">
                            <FormItem class="edit-form-item" label="合作NPO" prop="cooperationNpoIds">
                                <Select v-model="editFormValidate.cooperationNposArray" filterable multiple class="cooperationNpoIds" placeholder="請選擇">
                                    <Option v-for="item in npoList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                                </Select>
                            </FormItem>
                        </i-Col>
                    </Row>
                    <Row>
                        <i-Col span="6">
                            <FormItem class="edit-form-item" label="是否為短期招募" prop="isShort">
                                <Checkbox v-model="editFormValidate.isShort"></Checkbox>
                            </FormItem>
                        </i-Col>
                        <i-Col span="6">
                            <FormItem class="edit-form-item" label="是否為緊急招募" prop="isUrgent">
                                <Checkbox v-model="editFormValidate.isUrgent"></Checkbox>
                            </FormItem>
                        </i-Col>
                        <i-Col span="6">
                            <FormItem class="edit-form-item" label="愛心小編推薦" prop="promote">
                                <Checkbox v-model="editFormValidate.promote"></Checkbox>
                            </FormItem>
                        </i-Col>
                    </Row>

                    <Divider />

                </Form>

                <div style="text-align:center">
                    <Button style="width:150px" @click="$router.back()">返回</Button>
                    <Button type="primary" style="margin-left: 8px; width:150px" @click="editHandleSubmit('editFormValidate')">送出</Button>
                </div>
            </div>
        </div>
    </Layout>
    <Modal v-model="deleteSkillGroupItemConfirmModal" title="刪除" :mask-closable="false">
        <div class="message">
            <div>
                <Icon type="md-alert" style="color:#ed4014" size="20" />
                確定刪除選中項目？
            </div>
        </div>
        <div slot="footer">
            <Button @click="deleteSkillGroupItemConfirmModal=false">取消</Button>
            <Button type="primary" @click="deleteSkillGroupItemHandle()">確定</Button>
        </div>
    </Modal>

</div>
</template>

<script>
import Config from '@/common/config'
import articleTypeList from "@/plugins/data/articleSelectData";
let moment = require('moment')
export default {
    layout: 'backend',
    components: {

    },
    computed: {
        articleTypeList() {
            return articleTypeList;
        },
    },
    data() {
        const validateUpload = (rule, value, callback) => {
            if (this.editFormValidate.image1 === null) {
                callback(new Error('請選擇活動圖片'))
            } else {
                callback()
            }
        }
        const validateLat = (rule, value, callback) => {

            let lat = this.editFormValidate.lat
            let valid = (lat.match(/^-?\d*(\.\d+)?$/))
            if (lat == '') {
                callback(new Error('請輸入緯度'))
            } else if (!valid) {
                callback(new Error('請輸入正確經緯度格式'))
            } else {
                callback()
            }
        }
        const validateLng = (rule, value, callback) => {
            let lng = this.editFormValidate.lng
            let valid = (lng.match(/^-?\d*(\.\d+)?$/))
            if (lng == '') {
                callback(new Error('請輸入經度'))
            } else if (!valid) {
                callback(new Error('請輸入正確經緯度格式'))
            } else {
                callback()
            }
        }        
        return {
            isStaff: null,
            npoList: [],
            deleteSkillGroupItemIndex: '',
            deleteSkillGroupItem: '',
            deleteSkillGroupItemConfirmModal: false,
            tagsList: [],
            //
            maxSize: 100, //MB
            NpoIconUpdSRC: '',
            cancelConfirm: false,
            npoIconFile: null, //npo icon     
            //             
            needGroup: false,
            index: 1,
            formDynamic: {
                items: [{
                    value: '',
                    index: 1,
                    status: 1
                }]
            },
            detail: [],
            editFormValidate: {
                user: '',
                name: '',
                skillGroups: [],
                requiredGroup: false,
                insurance: false,
                image1: null,
                isShort: false,
                isUrgent: false,
                promote: false,
                addressCity: '台北市',
                skillsDescription: '',
                volunteerTrainingDesc: '',
                insuranceDescription: '',
                skillGroups: [{
                    id: '',
                    index: 1,
                    status: 1,
                    name: '',
                    skillsDescription: '',
                    volunteerNumber: ''
                }]
            },
            editRuleValidate: {
                volunteerType: [{
                    required: true,
                    type: 'string',
                    message: '請選擇活動類型',
                    trigger: 'submit'
                }],
                subject: [{
                    required: true,
                    type: 'string',
                    message: '請輸入活動主題',
                    trigger: 'submit'
                }],
                image1: [{
                    required: true,
                    validator: validateUpload,
                    trigger: 'submit',
                    type: 'object',
                }],
                description: [{
                    required: true,
                    type: 'string',
                    message: '請輸入活動詳細資訊',
                    trigger: 'submit'
                }],
                addressCity: [{
                    required: true,
                    type: 'string',
                    message: '請選擇活動舉辦縣市',
                    trigger: 'submit'
                }],
                address: [{
                    required: true,
                    type: 'string',
                    message: '請輸入地址',
                    trigger: 'submit'
                }],
                happenDate: [{
                    required: true,
                    type: 'date',
                    message: '請選擇活動開始時間',
                    trigger: 'submit'
                }],
                closeDate: [{
                    required: true,
                    type: 'date',
                    message: '請選擇活動結束時間',
                    trigger: 'submit'
                }],
                registerDeadlineDate: [{
                    required: true,
                    type: 'date',
                    message: '請選擇志工報名結束時間',
                    trigger: 'submit'
                }],
                eventHour: [{
                    required: true,
                    type: 'string',
                    message: '請輸入志工可獲得時數',
                    trigger: 'submit'
                }],
                requiredVolunteerNum: [{
                    required: true,
                    type: 'string',
                    message: '請輸入志工報名人數上限',
                    trigger: 'submit'
                }],
                lat: [{
                    required: true,
                    type: 'string',
                    validator: validateLat,
                    trigger: 'submit'
                }],
                lng: [{
                    required: true,
                    type: 'string',
                    validator: validateLng,
                    trigger: 'submit'
                }],                
            },
        };

    },
    mounted() {
        this.isStaff = localStorage.getItem("isStaff");
        this.getDetail()
        this.getNposMenu()
        this.getEventsTags()
    },
    methods: {
        getEventsTags() {
            let params = []
            this._API.getEventsTags.send(params).then((data) => {
                // _this.tagsList = data.results
                data.tags.forEach(element => {
                    this.tagsList.push({
                        label: element.name,
                        value: element.name
                    })
                });
                // _this.total = data.count
                // console.log(JSON.stringify(this.tagsList))
            })
        },
        getDetail() {
            // id:2176
            let _this = this
            let str = ' id eq ' + this.$route.params.id
            let params = {
                search: str,
                inlinecount: true,
            }
            // this.$service.getUserRolesPage.requestCommon(_this.queryStr, current, pageSize)
            this._API.getEvents.send(params).then((data) => {
                // _this.detail = data.results
                _this.editFormValidate = _this.dataCopy(data.results[0])
                

                if (_this.editFormValidate.volunteerType == '食物') {
                    _this.editFormValidate.volunteerType = '食物、保健'
                }
                if (_this.editFormValidate.volunteerType == '日用品') {
                    _this.editFormValidate.volunteerType = '日用、餐廚、傢俱、寢飾'
                }
                if (_this.editFormValidate.volunteerType == '電子產品') {
                    _this.editFormValidate.volunteerType = '家電、電子產品'
                }
                _this.editFormValidate.requiredGroup = _this.editFormValidate.requiredGroup == 1 ? true : false
                let tmpArray = []
                if (_this.editFormValidate.cooperationNpos && _this.editFormValidate.cooperationNpos.length > 0) {
                    _this.editFormValidate.cooperationNpos.forEach(element => {
                        tmpArray.push(element.id)
                    });
                }
                _this.editFormValidate.cooperationNposArray = tmpArray

                _this.editFormValidate.oldCurrentVolunteerNum = _this.editFormValidate.currentVolunteerNum

                _this.editFormValidate.eventHour = String(_this.editFormValidate.eventHour)
                _this.editFormValidate.requiredVolunteerNum = String(_this.editFormValidate.requiredVolunteerNum)
                _this.editFormValidate.tags = _this.editFormValidate.tags.split(',')
                _this.editFormValidate.lat = String(_this.editFormValidate.lat)
                _this.editFormValidate.lng = String(_this.editFormValidate.lng)

                if (!_this.editFormValidate.skillGroups) {
                    _this.editFormValidate.skillGroups = [{
                        id: '',
                        status: 1,
                        name: '',
                        skillsDescription: '',
                        volunteerNumber: ''
                    }]
                }
                // _this.total = data.count
                console.log(JSON.stringify(_this.editFormValidate))
            })
        },
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
        editHandleSubmit(name) {
            this.$refs[name].validate((valid, error) => {
                if (valid) {
                    this.modal_loading = true
                    let data = []

                    // let pubDate = this.getCurrentDateTime('yyyy-MM-dd hh:mm:ss')
                    let happenDate = moment(this.editFormValidate.happenDate).format('YYYY-MM-DD HH:mm:ss')
                    let closeDate = moment(this.editFormValidate.closeDate).format('YYYY-MM-DD HH:mm:ss')
                    let registerDeadlineDate = moment(this.editFormValidate.registerDeadlineDate).format('YYYY-MM-DD HH:mm:ss')
                    let tags = this.editFormValidate.tags?this.editFormValidate.tags.join():''

                    data.push({
                        id: this.$route.params.id,
                        // npoId: this.editFormValidate.userId,
                        tags: tags,
                        // pubDate: pubDate,
                        happenDate: happenDate,
                        closeDate: closeDate,
                        registerDeadlineDate: registerDeadlineDate,
                        subject: this.editFormValidate.subject,
                        description: this.editFormValidate.description,
                        eventHour: this.editFormValidate.eventHour,
                        addressCity: this.editFormValidate.addressCity,
                        address: this.editFormValidate.address,
                        insurance: this.editFormValidate.insurance,
                        insuranceDescription: this.editFormValidate.insuranceDescription,
                        // volunteerTraining: this.editFormValidate.volunteerTraining, //顯示開關，改一直顯示
                        volunteerTrainingDesc: this.editFormValidate.volunteerTrainingDesc?this.editFormValidate.volunteerTrainingDesc: '',
                        lat: this.editFormValidate.lat,
                        lng: this.editFormValidate.lng,
                        requiredVolunteerNum: this.editFormValidate.requiredVolunteerNum, //人數上限

                        // currentVolunteerNum: this.editFormValidate.youtubeCode,
                        requiredGroup: this.editFormValidate.requiredGroup,
                        skillsDescription: this.editFormValidate.skillsDescription,
                        // userId: this.editFormValidate.userId,
                        isSupplyEvent: false,

                        isUrgent: this.editFormValidate.isUrgent,
                        shortTerm: this.editFormValidate.isShort,
                        requireSignout: true,
                        // shortTerm: this.editFormValidate.inventory, //是否為物資需求組織
                        volunteerType: this.editFormValidate.volunteerType,
                        // donationSerial: this.editFormValidate.donationSerial,   //小編推薦                          
                        // donationStartDate: this.editFormValidate.donationStartDate,
                        // donationEndDate: this.editFormValidate.donationEndDate,
                        // serviceType: this.editFormValidate.serviceType, //是否為物資需求組織
                        // foreignThirdPartyId: this.editFormValidate.foreignThirdPartyId,
                        promote: this.editFormValidate.promote, //小編推薦  
                        cooperationNpoIds: this.editFormValidate.cooperationNposArray,
                        note: this.editFormValidate.note,
                    })

                    if (this.editFormValidate.oldCurrentVolunteerNum != this.editFormValidate.currentVolunteerNum) {
                        data[0].currentVolunteerNum = this.editFormValidate.currentVolunteerNum
                    }
                    // console.log(data)
                    let _this = this
                    let errorDesc = ''
                    this._API.patchEvents.send(data).then((data) => {

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

                        if (_this.npoIconFile) {

                            // upload plane photo
                            let data = []
                            let errorDesc = ''
                            // console.log('xxxx:'+_this.file[0]+'|bannerID:'+bannerID)
                            this._API.putEventsFile.requestCommon(this.$route.params.id, 'image1')
                            this._API.putEventsFile.fileUpload({
                                id: this.$route.params.id,
                                type: 'image1',
                                image: _this.npoIconFile[0]
                            }).then((data) => {
                                if (data.errors) {
                                    console.log('xxxx:' + data.errors)
                                }
                            }).catch((error) => {
                                // delete data
                                console.log('xxxx')
                                // this.itemDelete(this.editFormValidate.code)
                            })
                        }
                        if (this.editFormValidate.requiredGroup) {
                            let requiredGroupPostData = []
                            let requiredGroupPatchData = []

                            this.editFormValidate.skillGroups.forEach(element => {
                                if (element.id) {
                                    //patch 
                                    requiredGroupPatchData.push({
                                        id: element.id,
                                        name: element.name,
                                        skillsDescription: element.skillsDescription,
                                        volunteerNumber: element.volunteerNumber
                                    })
                                } else {
                                    //post 
                                    requiredGroupPostData.push({
                                        eventId: this.$route.params.id,
                                        name: element.name,
                                        skillsDescription: element.skillsDescription,
                                        volunteerNumber: element.volunteerNumber
                                    })
                                }
                            });
                            if (requiredGroupPostData.length > 0) {
                                // requiredGroupPostData = requiredGroupPostData.reverse()
                                this._API.postSkillGroup.send(requiredGroupPostData).then((data) => {

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

                                })
                            }
                            if (requiredGroupPatchData.length > 0) {
                                this._API.patchSkillGroup.send(requiredGroupPatchData).then((data) => {

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

                                })
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
                                desc: '編輯成功',
                                duration: Config.successDuration
                            })
                            // this.getDetail()
                            // if(_this.isStaff=="true") {
                            //     this.$router.push({ name: 'backendAdminEventList', params: { npouid: _this.editFormValidate.npoId }})
                            // }else {    
                            //     this.$router.push({ name: 'backendNPOEventList'})
                            // }
                            this.$router.back()
                            
                        }
                    })
                }
            })
        },
        goList() {

        },
        // 数据深拷贝
        dataCopy: function (data) {
            let obj = {}
            obj = JSON.parse(JSON.stringify(data))
            return obj
        },
        handleAdd() {
            if (!this.editFormValidate.skillGroups) this.editFormValidate.skillGroups = []
            this.editFormValidate.skillGroups.push({
                id: '',
                status: 1,
                name: '',
                skillsDescription: '',
                volunteerNumber: ''
            });
        },
        handleRemove(index, itemID) {
            if (itemID) {
                this.deleteSkillGroupItemIndex = index
                this.deleteSkillGroupItem = itemID
                this.deleteSkillGroupItemConfirmModal = true
            } else {
                this.editFormValidate.skillGroups.splice(index, 1);
            }
        },
        handleUploadNpoIcon(file) { // 上传文件前的事件钩子
            // console.log('file size:' + file.size)
            if (file.size >= (this.maxSize * 1024000)) {
                this.handleMaxSize(file)
                return false;
            } else {
                this.npoIconFile = []
                // 选择文件后 这里判断文件类型 保存文件 自定义一个keyid 值 方便后面删除操作
                let keyID = Math.random().toString().substr(2);
                file['keyID'] = keyID;
                // 保存文件到总展示文件数据里
                this.npoIconFile.push(file);
                //利用Blob预览本地上传的图片
                this.handlePreview('NpoIconUpdSRC');

                // this.editFormValidate.npoIcon = file
                // console.log('this.editFormValidate.mapPath:' + this.editFormValidate.mapPath)
                // 选择文件后触发验证关闭错误提示
                // this.$refs['editFormValidate'].validate(() => {})

                // 返回 false 停止自动上传 我们需要手动上传
                return false;
            }
        },
        removeFile() {
            // 删除总展示文件里的当前文件
            // this.file = this.file.filter(item => {
            //     return item.keyID != keyID
            // })
            this.updSrc = ""
            this.editFormValidate.mapPath = null
        },
        handleMaxSize(file) {
            this.$Notice.warning({
                title: '提示',
                desc: '上傳檔案大小超過100MB'
            });
        },
        handlePreview(updSrc) {
            const self = this;
            const reader = new FileReader();
            switch (updSrc) {
                case 'NpoIconUpdSRC':
                    reader.readAsArrayBuffer(this.npoIconFile[0]);
                    break;
                case 'VerifiedImageUpdSRC':
                    reader.readAsArrayBuffer(this.verifiedImageFile[0]);
                    break;
                case 'RegisterImageUpdSRC':
                    reader.readAsArrayBuffer(this.registerImageFile[0]);
                    break;
            }

            // reader.readAsArrayBuffer(this.npoIconFile[0]);
            reader.onload = function (e) {
                const bf = this.result;
                const blob = new Blob([bf], {
                    type: "text/plain"
                });
                const str = URL.createObjectURL(blob);
                switch (updSrc) {
                    case 'NpoIconUpdSRC':
                        self.NpoIconUpdSRC = str;
                        break;
                    case 'VerifiedImageUpdSRC':
                        self.VerifiedImageUpdSRC = str;
                        break;
                    case 'RegisterImageUpdSRC':
                        self.RegisterImageUpdSRC = str;
                        break;
                }
            };
        },
        handleCreate2(val) {
            console.log('DD:' + val)
            this.tagsList.push({
                value: val,
                label: val
            });
        },
        deleteSkillGroupItemHandle(index) {
            if (this.deleteSkillGroupItem) {
                let errorDesc = ''
                this._API.deleteSkillGroup.send(this.deleteSkillGroupItem).then((data) => {
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
                    if (errorDesc == '') {
                        this.deleteSkillGroupItemConfirmModal = false
                        this.editFormValidate.skillGroups.splice(this.deleteSkillGroupItemIndex, 1);
                        this.$Notice.success({
                            title: '成功',
                            desc: '刪除成功',
                            duration: Config.successDuration
                        })
                    }
                })
            }
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
.groupSection {
    // padding: 10px;
    padding-top: 10px;
    padding-bottom: 10px;
    padding-left: 5px;
    padding-right: 5px;
}

.paddingLR10 {
    padding-left: 10px;
    padding-right: 10px;
    padding-bottom: 20px;
}

.previewPlanes {
    width: 100px;
}

.hint {
    padding-bottom:10px;
    margin:10px
}
</style>
