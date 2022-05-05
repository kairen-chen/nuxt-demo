<template>
<div class="main">
    <Layout class="main">
    <div class="edit-form">
        <!-- <EditModal v-if="isEditModal" /> -->
        <div class="edit-form-content">
            <div class="form-head">
                <div class="form-head-title">會員資料檢視</div>
            </div>
            <Divider style="margin:16px 0px" />
            
            <Form id="editFormValidate" ref="editFormValidate" :model="editFormValidate"  label-position="top">

                <Row>
                    <i-Col span="12">
                        <FormItem class="edit-form-item" label="帳號" prop="username">
                            {{editFormValidate.username}}
                            <!-- <Input v-model.trim="editFormValidate.username" maxlength="20"  disabled></Input>                       -->
                        </FormItem>
                    </i-Col>
                    <i-Col span="12">
                        <FormItem class="edit-form-item" label="用戶名稱" prop="name">
                            {{editFormValidate.name}}
                            <!-- <Input v-model.trim="editFormValidate.name" maxlength="64" ></Input> -->
                        </FormItem>
                    </i-Col>
                </Row>
                <Divider style="margin:16px 0px" />
                <Row>
                    <i-Col span="12">
                        <FormItem class="edit-form-item" label="個人照片" prop="icon">
                            <img :src="editFormValidate.icon" width="100">                          
                        </FormItem>
                    </i-Col>
                    <i-Col span="12">
                        <FormItem class="edit-form-item" label="電子信箱" prop="email">
                            {{editFormValidate.email}}
                            <!-- <Input v-model.trim="editFormValidate.email"></Input> -->
                        </FormItem>
                    </i-Col>
                </Row>    
                <Divider style="margin:16px 0px" />
                <Row>
                    <i-Col span="12">
                        <FormItem class="edit-form-item" label="電話" prop="phone">
                            {{editFormValidate.phone}}
                            <!-- <Input v-model.trim="editFormValidate.email"></Input> -->
                        </FormItem>
                    </i-Col>
                    <i-Col span="12">
                        <FormItem class="edit-form-item" label="專業證照" prop="licenseImages">
                            <a v-for="(item, index) in editFormValidate.licenseImages" :href="item.image" :key="item.licenseId" target="_blank" style="padding-right:5px">專業證照{{index+1}}</a>
                        </FormItem>
                    </i-Col>                    
                </Row>    
                <Divider style="margin:16px 0px" />                
                <Row>
                    <i-Col span="12">
                        <FormItem class="edit-form-item" label="公開個人頁" prop="isPublic">
                            <Checkbox v-model="editFormValidate.isPublic" :disabled="true"></Checkbox>
                        </FormItem>
                    </i-Col>
                    <i-Col span="12">
                        <FormItem class="edit-form-item" label="可服務區域" prop="interest">
                            {{editFormValidate.interest}}
                            <!-- <Input v-model.trim="editFormValidate.interest" readonly></Input> -->
                        </FormItem>
                    </i-Col>
                </Row>  
                <Divider style="margin:16px 0px" />
                <Row>
                    <i-Col span="12">
                        <FormItem class="edit-form-item" label="可服務項目" prop="skillsDescription">
                            {{editFormValidate.skillsDescription}}
                            <!-- <Input v-model.trim="editFormValidate.skillsDescription" ></Input> -->
                        </FormItem>
                    </i-Col>
                    <i-Col span="12">
                        <FormItem class="edit-form-item" label="自我介紹" prop="aboutMe">
                            {{editFormValidate.aboutMe}}
                            <!-- <Input v-model.trim="editFormValidate.aboutMe" maxlength="64" ></Input> -->
                        </FormItem>
                    </i-Col>
                </Row>  
                <Divider style="margin:16px 0px" />            
                <Row>
                    <i-Col span="12">
                        <FormItem class="edit-form-item" label="加入時間" prop="dateJoined">
                            {{editFormValidate.dateJoined}}
                            <!-- <Input v-model.trim="editFormValidate.skillsDescription" ></Input> -->
                        </FormItem>
                    </i-Col>
                    <i-Col span="12">
                        <FormItem class="edit-form-item" label="最近一次登入時間" prop="lastLogin">
                            {{editFormValidate.lastLogin}}
                            <!-- <Input v-model.trim="editFormValidate.aboutMe" maxlength="64" ></Input> -->
                        </FormItem>
                    </i-Col>
                </Row>  
                <Divider style="margin:16px 0px" />     
                <Row>
                    <i-Col span="24">
                        <FormItem class="edit-form-item" label="點數紀錄">
                           <Table :columns="columns" :data="userScoreList" no-data-text="暫無資料" height="300"></Table>
                        </FormItem>
                    </i-Col>
                </Row>                  
                <Divider style="margin:16px 0px" />     
                <Row>
                    <i-Col span="12">
                        <FormItem class="edit-form-item" label="是否已綁定台灣大哥大企業帳號" prop="isTtwm">
                            <div class="alignCenter">
                                {{editFormValidate.isTwm? "是":"否"}}&nbsp;
                                <Button v-if="editFormValidate.isTwm" type="error" size="small" @click="unbindConfirm('Twm')">解除綁定</Button>
                            </div>
                        </FormItem>
                    </i-Col>
                </Row>       
                <Row v-if="editFormValidate.isTwm">
                    <i-Col span="6">
                        <FormItem class="edit-form-item" label="真實姓名">
                            <div>
                                {{userTwm.enterpriseSerialName}}
                            </div>
                        </FormItem>
                    </i-Col>
                    <i-Col span="6">
                        <FormItem class="edit-form-item" label="公司電子信箱">
                            <div>
                                {{userTwm.enterpriseSerialEmail}}
                            </div>
                        </FormItem>
                    </i-Col>
                     <i-Col span="6">
                        <FormItem class="edit-form-item" label="員工編號">
                            <div>
                                {{userTwm.enterpriseSerialNumber}}
                            </div>
                        </FormItem>
                    </i-Col>
                     <i-Col span="6">
                        <FormItem class="edit-form-item" label="身分證字號後五碼">
                            <div>
                                {{userTwm.enterpriseSerialSecurityId}}
                            </div>
                        </FormItem>
                    </i-Col>                                      
                </Row>   
                <Row v-if="editFormValidate.isTwm">
                    <i-Col span="6">
                        <FormItem class="edit-form-item" label="電話">
                            <div>
                                {{userTwm.enterpriseSerialPhone}}
                            </div>
                        </FormItem>
                    </i-Col>
                    <i-Col span="6">
                        <FormItem class="edit-form-item" label="部門">
                            <div>
                                {{userTwm.enterpriseSerialDepartment}}
                            </div>
                        </FormItem>
                    </i-Col>
                     <i-Col span="6">
                        <FormItem class="edit-form-item" label="企業志工分組">
                            <div>
                                {{userTwm.enterpriseSerialGroup}}
                            </div>
                        </FormItem>
                    </i-Col>                                  
                </Row>      
                <Divider style="margin:16px 0px" />            
                <Row>
                    <i-Col span="12">
                        <FormItem class="edit-form-item" label="是否已綁定富邦愛心志工社帳號" prop="isFubon">
                            <div class="alignCenter">
                                {{editFormValidate.isFubon? "是":"否"}}&nbsp;
                                <Button v-if="editFormValidate.isFubon" type="error" size="small" @click="unbindConfirm('Fubon')">解除綁定</Button>
                            </div>
                        </FormItem>
                    </i-Col>
                </Row>                       
                <!-- <FormItem class="edit-form-item edit-form-action">
                    <Button v-if="cancelConfirm" style="width:150px" @click="cancelConfirmModal=true">{{$t("LocaleString.B00015")}}</Button>
                    <Button v-if="!cancelConfirm" style="width:150px" @click="goList()">{{$t("LocaleString.B00015")}}</Button>
                    <Button type="primary" style="margin-left: 8px; width:150px" @click="editHandleSubmit('editFormValidate')">{{$t("LocaleString.B00012")}}</Button>

                </FormItem> -->
            </Form>

            <!-- <Modal v-model="cancelConfirmModal" :title="$t('LocaleString.W00005')" :mask-closable="false">
                <div class="message">
                    <div>
                        <Icon type="md-alert" style="color:#ed4014" size="20" />
                        {{$t("LocaleString.M00025")}}
                    </div>
                </div>
                <div slot="footer">
                    <Button @click="cancelConfirmModal=false">{{$t("LocaleString.B00015")}}</Button>
                    <Button type="primary" @click="goList()">{{$t("LocaleString.B00014")}}</Button>
                </div>
            </Modal> -->
            <div  style="text-align:center">
                <Button type="primary" style="width:150px" @click="$router.back()">返回</Button>
                <!-- <Button type="primary" style="margin-left: 8px; width:150px" @click="editHandleSubmit('editFormValidate')">送出</Button> -->
            </div>            
        </div>
    </div>
    </Layout>

    <Modal
        v-model="confirmModal"
        title="提醒"
        ok-text="確定解除"
        cancel-text="取消"
        :closable="false"
        :mask-closable="false"
        @on-ok="unbind">
        <p>{{confirmText}}</p>
    </Modal>

</div>
</template>

<script>
import SearchModal from './searchModal.vue'
import Page from '@/components/admin/layoutUnit/page.vue'
import Config from '@/common/config'
export default {
    layout: 'backend',
    components: {
        SearchModal,
        Page
    },
    data() {
        return {
            userScoreList: [],
            confirmText: '',
            unbindCompany: '',
            confirmModal: false,
            detail: [],
            userList: [],
            editFormValidate: {
                user: '',
                name: '',
            },
            editRuleValidate: {
                user: [{
                    // A-Za-z 0-9 @ : $
                    required: true,
                    type: 'string',
                    max: 20,
                    pattern: /^[A-Za-z0-9@:_$]+$/,
                    // message: this.$t('LocaleString.W00010'),
                    trigger: 'submit'
                }],
                name: [{
                        required: true,
                        // message: this.$t('LocaleString.L00001', {
                        //     0: this.$t('LocaleString.L00012')
                        // }),
                        trigger: 'submit'
                    },
                    {
                        type: 'string',
                        max: 64,
                        // message: this.$t('LocaleString.W00011', {
                        //     0: this.$t('LocaleString.L00012'),
                        //     1: '64'
                        // }),
                        trigger: 'submit'
                    }
                ],
                description: [{
                    type: 'string',
                    max: 128,
                    // message: this.$t('LocaleString.W00011', {
                    //     0: this.$t('LocaleString.L00039'),
                    //     1: '128'
                    // }),
                    trigger: 'submit'
                }],
            },
            userTwm: {},
            columns: [      
                {
                    title: '活動名稱',
                    key: 'eventName'
                },                

                {
                    title: '累積點數',
                    key: 'score'
                },                
                {
                    title: '紀錄',
                    key: 'comment'
                }, 
                {
                    title: '紀錄時間',
                    key: 'addDate'
                },                                 
            ],
            list: [],            
        };

    },
    mounted() {
        this.getDetail()
        // this.getUsers()
    },    
    methods: {

        getDetail() {
            let _this = this
            let str = ' id eq ' + this.$route.params.uid
            let params = {
                search: str,
                inlinecount: true,
            }
            // this.$service.getUserRolesPage.requestCommon(_this.queryStr, current, pageSize)
            this._API.getUsers.send(params).then((data) => {
                // _this.detail = data.results
                _this.editFormValidate = _this.dataCopy(data.results[0])

                if(data.results[0].isTwm) {
                    let str2 = ' id eq ' + data.results[0].uid
                    let params2 = {
                        search: str,
                        inlinecount: true,
                    }                   
                    this._API.getUsersTwm.send(params2).then((data2) => {
                        _this.userTwm = _this.dataCopy(data2.results[0])
                        

                    })
                }
                _this.getUserScoreRecords(data.results[0].id)
                // _this.editFormValidate.photoURL = 'https://www.isharing.tw/uploads/'+_this.editFormValidate.photo
                // _this.total = data.count
                console.log(JSON.stringify(_this.editFormValidate))
            })
        },
        getUsers() {
            let _this = this
            // let str = 'active eq true'
            let params = {
                // search: str,
                inlinecount: true,
                // sort: 'username,asc',
                // page: current,
                // size: pageSize
            }

            // this.$service.getUserRolesPage.requestCommon(_this.queryStr, current, pageSize)
            this._API.getUsers.send(params).then((data) => {
                _this.userList = data.results
                // _this.total = data.count
                console.log(data)
            })
        },        
        getUserScoreRecords(userId) {
            let _this = this
            let str = ' userId eq '+userId
            let params = {
                search: str,
                inlinecount: true,
                sort: 'addDate,desc',
                // page: current,
                // size: pageSize
            }

            // this.$service.getUserRolesPage.requestCommon(_this.queryStr, current, pageSize)
            this._API.getUserScoreRecords.send(params).then((data) => {
                _this.userScoreList = data.results
                // _this.total = data.count
                console.log(data)
            })
        },   
        editHandleSubmit() {

        },
        unbindConfirm(type) {
            this.unbindCompany = type
            switch(type) {
                case "Fubon":
                    this.confirmText = "確定解除綁定富邦愛心志工社帳號？"
                    break;
                default:
                    this.confirmText = "確定解除綁定台灣大哥大企業帳號？"
                    break;                    
            }
            this.confirmModal = true
        },
        unbind() {
            switch(this.unbindCompany) {
                case "Fubon":
                    this._API.adminUnbindFubon.requestCommon(this.editFormValidate.id)
                    this._API.adminUnbindFubon.send(this.editFormValidate.id).then((data) => {
                        this.$Notice.success({
                            title: '成功',
                            desc: '解除綁定成功',
                            duration: Config.successDuration
                        })  
                        this.getDetail()            
                    })                    
                    break;
                default:
                    this._API.adminUnbindTWM.requestCommon(this.editFormValidate.id)
                    this._API.adminUnbindTWM.send(this.editFormValidate.id).then((data) => {
                        this.$Notice.success({
                            title: '成功',
                            desc: '解除綁定成功',
                            duration: Config.successDuration
                        })  
                        this.getDetail()
                    })             
                    break;                    
            }
        },        
        // 数据深拷贝
        dataCopy: function (data) {
            let obj = {}
            obj = JSON.parse(JSON.stringify(data))
            return obj
        },        

        
    }
};
</script>

<style lang="scss" scoped>
    .alignCenter{
        display: flex;
        align-items: center;
    }
</style>
