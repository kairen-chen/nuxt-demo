<template>
<div class="main">
    <Layout class="main">
    <div class="edit-form">
        <!-- <EditModal v-if="isEditModal" /> -->
        <div class="edit-form-content">
            <div class="form-head">
                <div class="form-head-title">{{npoTitle}}資料更新</div>
            </div>
            <Divider style="margin:16px 0px" />
            
            <Form id="editFormValidate" ref="editFormValidate" :model="editFormValidate" :rules="editRuleValidate" label-position="top">

                <Row>
                    <i-Col span="12">
                        <FormItem class="edit-form-item" label="NPO User Account" prop="userId">
                            <Select v-model="editFormValidate.userId" :transfer="true" placeholder="請選擇或搜尋帳號" filterable>
                                <Option v-for="item in usersList" :value="item.id" :key="item.id">{{item.username}}</Option>
                            </Select>   
                        </FormItem>
                        
                    </i-Col>
                    <i-Col span="12">
                        <FormItem class="edit-form-item" :label="companyTitle" prop="name">
                            <Input v-model.trim="editFormValidate.name" maxlength="64" ></Input>
                        </FormItem>
                    </i-Col>
                </Row>
                <Row>
                    <i-Col span="12">
                        <FormItem class="edit-form-item" :label="companyIcon" prop="npoIcon">
                            <!-- <div v-if="editFormValidate.mapPath" class="align-r" >
                                <Icon type="md-close" @click="removeFile()" />
                            </div>                             -->
                            <a v-show="!NpoIconUpdSRC" :href="editFormValidate.npoIcon" target="_blank"><img :src="editFormValidate.npoIcon" width="100"></a>
                            <div class="upd-img" v-show="NpoIconUpdSRC">
                                <img class="previewPlanes" :src="NpoIconUpdSRC" alt="">
                            </div>                                
                            <Upload ref="uploadImg" action="" :show-upload-list="false" accept="image/png, image/jpeg" :before-upload="handleUploadNpoIcon">
                                <Button icon="ios-cloud-upload-outline">更新檔案</Button>
                            </Upload>     
                                               
                            <!-- <Input v-model.trim="editFormValidate.npoIcon" maxlength="20" ></Input> -->
                        </FormItem>
                    </i-Col>
                    <i-Col span="12">
                        <FormItem class="edit-form-item" :label="companyDescription" prop="description">
                            <Input v-model.trim="editFormValidate.description" type="textarea" :rows="5"  ></Input>
                        </FormItem>
                    </i-Col>
                </Row>    
                <Row>
                    <i-Col span="12">
                        <FormItem class="edit-form-item" :label="companySerialNo" prop="serialNumber">
                            <Input v-model.trim="editFormValidate.serialNumber"></Input>
                        </FormItem>
                    </i-Col>
                    <i-Col span="12">
                        <FormItem class="edit-form-item" label="服務項目(服務類型、服務對象)" prop="serviceTarget">
                            <Input v-model.trim="editFormValidate.serviceTarget" ></Input>
                        </FormItem>
                    </i-Col>

                </Row>  
                <Row>
                    <i-Col span="12">
                        <FormItem class="edit-form-item" label="志工服務計畫核備文號(上傳主管機關回文公文掃描檔)" prop="verifiedImage">
                            <a v-show="!VerifiedImageUpdSRC" :href="editFormValidate.verifiedImage" target="_blank"><img :src="editFormValidate.verifiedImage" width="100"></a>
                            <div class="upd-img" v-show="VerifiedImageUpdSRC">
                                <img class="previewPlanes" :src="VerifiedImageUpdSRC" alt="">
                            </div>                                
                            <Upload ref="uploadImg" action="" :show-upload-list="false" accept="image/png, image/jpeg" :before-upload="handleUploadVerifiedImage">
                                <Button icon="ios-cloud-upload-outline">更新檔案</Button>
                            </Upload>     
                        </FormItem>
                    </i-Col>
                    <i-Col span="12">
                        <FormItem class="edit-form-item" label="法人登記證書影本" prop="registerImage">
                            <a v-show="!RegisterImageUpdSRC" :href="editFormValidate.registerImage" target="_blank"><img :src="editFormValidate.registerImage" width="100"></a>
                            <div class="upd-img" v-show="RegisterImageUpdSRC">
                                <img class="previewPlanes" :src="RegisterImageUpdSRC" alt="">
                            </div>                                
                            <Upload ref="uploadImg" action="" :show-upload-list="false" accept="image/png, image/jpeg" :before-upload="handleUploadRegisterImage">
                                <Button icon="ios-cloud-upload-outline">更新檔案</Button>
                            </Upload>                                                        
                        </FormItem>
                    </i-Col>
                </Row>  

                <Divider />

                <div class="form-head-subtitle">聯絡資訊</div>
                    <Row>
                        <i-Col span="12">
                            <FormItem class="edit-form-item" label="主要連絡人姓名" prop="contactName">
                                <Input v-model.trim="editFormValidate.contactName" ></Input>
                            </FormItem>
                        </i-Col>
                        <i-Col span="12">
                            <FormItem class="edit-form-item" label="主要連絡人電話" prop="contactPhone">
                                <Input v-model.trim="editFormValidate.contactPhone" ></Input>
                            </FormItem>
                        </i-Col>
                    </Row>
                    <Row>
                        <i-Col span="12">
                            <FormItem class="edit-form-item" label="主要連絡人電子郵件" prop="contactEmail">
                                <Input v-model.trim="editFormValidate.contactEmail"  ></Input>
                            </FormItem>
                        </i-Col>
                        <i-Col span="12">
                            <FormItem class="edit-form-item" label="主要連絡人職稱" prop="contactJob">
                                <Input v-model.trim="editFormValidate.contactJob"  ></Input>
                            </FormItem>
                        </i-Col>
                    </Row>    
                    <Row>
                        <i-Col span="12">
                            <FormItem class="edit-form-item" label="次要連絡人姓名" prop="contact2Name">
                                <Input v-model.trim="editFormValidate.contact2Name"  ></Input>
                            </FormItem>
                        </i-Col>
                        <i-Col span="12">
                            <FormItem class="edit-form-item" label="次要連絡人電話" prop="contact2Phone">
                                <Input v-model.trim="editFormValidate.contact2Phone" ></Input>
                            </FormItem>
                        </i-Col>
                    </Row>  
                    <Row>
                        <i-Col span="12">
                            <FormItem class="edit-form-item" label="次要連絡人電子郵件" prop="contact2Email">
                                <Input v-model.trim="editFormValidate.contact2Email"  ></Input>
                            </FormItem>
                        </i-Col>
                        <i-Col span="12">
                            <FormItem class="edit-form-item" label="次要連絡人職稱" prop="contact2Job">
                                <Input v-model.trim="editFormValidate.contact2Job"  ></Input>
                            </FormItem>
                        </i-Col>
                    </Row>  
                    <Row>
                        <i-Col span="12">
                            <FormItem class="edit-form-item" label="通訊地址" prop="contactAddress">
                                <Input v-model.trim="editFormValidate.contactAddress"  ></Input>
                            </FormItem>
                        </i-Col>
                        <i-Col span="12">
                            <FormItem class="edit-form-item" label="官方網站" prop="contactWebsite">
                                <Input v-model.trim="editFormValidate.contactWebsite"  ></Input>
                            </FormItem>
                        </i-Col>
                    </Row>
                    <Row>
                        <i-Col span="12">
                            <FormItem class="edit-form-item" label="其他宣傳管道: FB粉絲頁" prop="contactSite">
                                <Input v-model.trim="editFormValidate.contactSite" ></Input>
                            </FormItem>
                        </i-Col>
                         <i-Col span="12">
                            <FormItem class="edit-form-item" label="Youtube影片代碼" prop="youtubeCode">
                                <Input v-model.trim="editFormValidate.youtubeCode" ></Input>
                            </FormItem>
                            <div class="hint">(範例: https://www.youtube.com/watch?v=<span style="color:red">za8Rh8HlNPo</span>，紅色字體即為影片代碼)</div>
                        </i-Col>

                    </Row>
                    <Row>
                        <i-Col span="6">                  
                            <FormItem class="edit-form-item" label="是否已核可" prop="isVerified">
                                <Checkbox v-model="editFormValidate.isVerified"></Checkbox>
                                <!-- <Input v-model.trim="editFormValidate.isVerified" maxlength="64" ></Input> -->
                            </FormItem>
                        </i-Col>                        
                        <i-Col span="6">
                            <FormItem class="edit-form-item" label="是否同時為物資需求組織" prop="isInventory">
                                <Checkbox v-model="editFormValidate.isInventory"></Checkbox>
                                <!-- <Input v-model.trim="editFormValidate.isInventory" maxlength="20"  disabled></Input> -->
                            </FormItem>
                        </i-Col>
                        <i-Col span="6">
                            <FormItem class="edit-form-item" label="是否為企業" prop="isEnterprise">
                                <Checkbox v-model="editFormValidate.isEnterprise"></Checkbox>
                                <!-- <Input v-model.trim="editFormValidate.isEnterprise" maxlength="64" ></Input> -->
                            </FormItem>
                        </i-Col>
                        <i-Col span="6">
                            <FormItem class="edit-form-item" label="愛心小編推薦" prop="promote">
                                <Checkbox v-model="editFormValidate.promote"></Checkbox>
                                <!-- <Input v-model.trim="editFormValidate.isEnterprise" maxlength="64" ></Input> -->
                            </FormItem>
                        </i-Col>                        
                    </Row>                                        
                <Divider />


                <!-- <FormItem class="edit-form-item edit-form-action">
                    <Button v-if="cancelConfirm" style="width:150px" @click="cancelConfirmModal=true">{{$t("LocaleString.B00015")}}</Button>
                    <Button v-if="!cancelConfirm" style="width:150px" @click="goList()">{{$t("LocaleString.B00015")}}</Button>
                    <Button type="primary" style="margin-left: 8px; width:150px" @click="editHandleSubmit('editFormValidate')">{{$t("LocaleString.B00012")}}</Button>

                </FormItem> -->
            </Form>

            <!-- <Modal v-model="cancelConfirmModal" title="" :mask-closable="false">
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
                <Button style="width:150px" @click="$router.back()">返回</Button>
                <Button type="primary" style="margin-left: 8px; width:150px" @click="editHandleSubmit('editFormValidate')">送出</Button>
            </div>            
        </div>
    </div>
    </Layout>
</div>
</template>

<script>
import Config from '@/common/config'
import baseURL from "@/common/baseConfig"

export default {
    layout: 'backend',
    components: {

    },
    data() {
        return {
            username: '',
            maxSize: 100, //MB
            NpoIconUpdSRC: '',
            VerifiedImageUpdSRC: '',
            RegisterImageUpdSRC: '',
            cancelConfirm: false,            
            npoIconFile: null,  //npo icon
            verifiedImageFile: null,  //npo icon
            registerImageFile: null,  //npo icon          
            //
            detail: [],
            usersList: [],
            editFormValidate: {
                // userId: '',
                name: '',
            },
            editRuleValidate: {
                userId: [{
                        required: true,
                        message: '請選擇NPO帳號',
                        trigger: 'submit',
                        type: 'number'
                    },
                ],                
                name: [{
                        required: true,
                        message: '請輸入NPO名稱',
                        trigger: 'submit'
                    },
                ],
                npoIcon: [{
                        required: true,
                        message: '請選擇NPO代表圖示',
                        trigger: 'submit'
                }],
                description: [{
                        required: true,
                        message: '請輸入NPO詳細資訊',
                        trigger: 'submit'
                }],   
                registerImage: [{
                        required: true,
                        message: '請選擇法人登記證書影本',
                        trigger: 'submit'
                }],                
                contactName: [{
                        required: true,
                        message: '請輸入主要連絡人姓名',
                        trigger: 'submit'
                }],                
                contactPhone: [{
                        required: true,
                        message: '請輸入主要連絡人電話',
                        trigger: 'submit'
                }], 
                contactEmail: [{
                        required: true,
                        message: '請輸入主要連絡人電子郵件',
                        trigger: 'submit'
                }], 
                contactJob: [{
                        required: true,
                        message: '請輸入主要連絡人職稱',
                        trigger: 'submit'
                }], 
                contact2Name: [{
                        required: true,
                        message: '請輸入次要連絡人姓名',
                        trigger: 'submit'
                }], 
                contact2Phone: [{
                        required: true,
                        message: '請輸入次要連絡人電話',
                        trigger: 'submit'
                }], 
                contact2Email: [{
                        required: true,
                        message: '請輸入次要連絡人電子郵件',
                        trigger: 'submit'
                }], 
                contact2Job: [{
                        required: true,
                        message: '請輸入次要連絡人職稱',
                        trigger: 'submit'
                }], 

            },
        };

    },
    mounted() {
        this.getDetail()
        this.getUsersMenu()
    },    
    computed: {
        npoTitle(){
            if(this.editFormValidate.isEnterprise){
                return '企業'
            }else {
                return 'NPO'
            }
        },        
        companyTitle(){
            if(this.editFormValidate.isEnterprise){
                return '企業名稱'
            }else {
                return 'NPO名稱'
            }
        },
        companyIcon(){
            if(this.editFormValidate.isEnterprise){
                return '企業代表圖示'
            }else {
                return 'NPO代表圖示'
            }
        },
        companyDescription(){
            if(this.editFormValidate.isEnterprise){
                return '企業詳細資訊'
            }else {
                return 'NPO詳細資訊'
            }
        },  
        companySerialNo(){
            if(this.editFormValidate.isEnterprise){
                return '企業統編'
            }else {
                return 'NPO統編'
            }
        },                         
    },
    methods: {

        getDetail() {
            let _this = this
            let str = ' id eq ' + this.$route.params.id
            let params = {
                search: str,
                inlinecount: true,
            }
            // this.$service.getUserRolesPage.requestCommon(_this.queryStr, current, pageSize)
            this._API.getNpos.send(params).then((data) => {
                // _this.detail = data.results
                _this.editFormValidate = _this.dataCopy(data.results[0])

                 _this.editFormValidate.promote = _this.editFormValidate.promote ? true:false
                // _this.editFormValidate.verifiedImageURL = baseURL+'uploads/'+_this.editFormValidate.verifiedImage
                // _this.editFormValidate.registerImageURL = baseURL+'uploads/'+_this.editFormValidate.registerImage
                // _this.editFormValidate.registerImageURL = 'https://www.isharing.tw/uploads/'+_this.editFormValidate.registerImage
                // _this.getUsers(_this.editFormValidate.id)

                // _this.total = data.count
                console.log(JSON.stringify(_this.editFormValidate))
                
            })
        },
        // getUsers(uid) {
        //     let _this = this
        //     let str = ' id eq ' + uid
        //     let params = {
        //         search: str,
        //         inlinecount: true,
        //         // sort: 'username,asc',
        //         // page: current,
        //         // size: pageSize
        //     }

        //     // this.$service.getUserRolesPage.requestCommon(_this.queryStr, current, pageSize)
        //     this._API.getUsers.send(params).then((data) => {
        //         _this.userDetail = data.results[0]
        //         _this.username = _this.userDetail.username
        //         // console.log(data)
        //     })
        // },   
        getUsersMenu() {
            let _this = this
            // let str = ' id eq ' + this.$route.params.id
            let params = {
                // search: str,
                inlinecount: true,
            }
            // this.$service.getUserRolesPage.requestCommon(_this.queryStr, current, pageSize)
            this._API.getUsersMenu.send(params).then((data) => {
                this.usersList = data
            })
        },               
        editHandleSubmit(name) {
            this.$refs[name].validate((valid, error) => {
                if (valid) {
                    this.modal_loading = true
                    let data = []
                    
                    data.push({
                        id: this.$route.params.id,
                        userId: this.editFormValidate.userId,
                        name: this.editFormValidate.name,
                        description: this.editFormValidate.description,
                        registerNumber: this.editFormValidate.registerNumber,
                        serialNumber: this.editFormValidate.serialNumber,
                        serviceTarget: this.editFormValidate.serviceTarget,
                        contactName: this.editFormValidate.contactName,
                        contactPhone: this.editFormValidate.contactPhone,
                        contactEmail: this.editFormValidate.contactEmail,
                        contactJob: this.editFormValidate.contactJob,
                        contact2Name: this.editFormValidate.contact2Name,
                        contact2Phone: this.editFormValidate.contact2Phone,
                        contact2Email: this.editFormValidate.contact2Email,
                        contact2Job: this.editFormValidate.contact2Job,
                        contactAddress: this.editFormValidate.contactAddress,
                        contactWebsite: this.editFormValidate.contactWebsite,
                        contactSite: this.editFormValidate.contactSite,
                        
                        youtubeCode: this.editFormValidate.youtubeCode,
                        verified: this.editFormValidate.isVerified,
                        inventory: this.editFormValidate.isInventory, //是否為物資需求組織
                        enterprise: this.editFormValidate.isEnterprise,
                        promote: this.editFormValidate.promote,   //小編推薦   
                        admViewed: true                
                    })
                    // console.log(data)
                    let _this = this
                    let errorDesc = ''
                    let npoId = this.$route.params.id
                    this._API.patchNpos.send(data).then((data) => {
                        
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
                                        case 'userNpoExists':
                                            errorDesc = 'NPO User Account已關聯其他NPO，請重新選擇'
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

                        if (_this.npoIconFile || _this.verifiedImageFile || _this.registerImageFile) {
                            if(_this.npoIconFile) {
                                // let data = []
                                // let errorDesc = ''
                                // console.log('xxxx:'+_this.file[0]+'|bannerID:'+bannerID)
                                this._API.putNposFile.requestCommon(npoId,'icon')
                                this._API.putNposFile.fileUpload({
                                    id: npoId,
                                    type: 'icon',
                                    image: _this.npoIconFile[0]
                                }).then((data) => {
                                    if(_this.verifiedImageFile || _this.registerImageFile) {
                                        if(_this.verifiedImageFile) {
                                            // let data = []
                                            // let errorDesc = ''
                                            this._API.putNposFile.requestCommon(npoId,'verifiedImg')
                                            this._API.putNposFile.fileUpload({
                                                id: npoId,
                                                type: 'verifiedImg',
                                                image: _this.verifiedImageFile[0]
                                            }).then((data) => {
                                                // if (data.errors) {
                                                //     console.log('xxxx:'+data.errors)
                                                // }
                                                if(_this.registerImageFile) {
                                                    // let data = []
                                                    // let errorDesc = ''
                                                    this._API.putNposFile.requestCommon(npoId,'registerImg')
                                                    this._API.putNposFile.fileUpload({
                                                        id: npoId,
                                                        type: 'registerImg',
                                                        image: _this.registerImageFile[0]
                                                    }).then((data) => {
                                                        if (data.errors) {
                                                        }
                                                    }).catch((error) => {
                                                        // delete data
                                                        // this.itemDelete(this.editFormValidate.code)
                                                    })                                                    
                                                }
                                            }).catch((error) => {
                                                // delete data
                                                // this.itemDelete(this.editFormValidate.code)
                                            })                                           
                                        }else {
                                            if(_this.registerImageFile) {
                                                // let data = []
                                                // let errorDesc = ''
                                                this._API.putNposFile.requestCommon(npoId,'registerImg')
                                                this._API.putNposFile.fileUpload({
                                                    id: npoId,
                                                    type: 'registerImg',
                                                    image: _this.registerImageFile[0]
                                                }).then((data) => {
                                                    if (data.errors) {
                                                    }
                                                }).catch((error) => {
                                                    // delete data
                                                    // this.itemDelete(this.editFormValidate.code)
                                                })                                                    
                                            }                                            
                                        }
                                    }

                                }).catch((error) => {
                                    // delete data
                                    // this.itemDelete(this.editFormValidate.code)
                                })

                            }else {
                                if(_this.verifiedImageFile) {
                                    // let data = []
                                    // let errorDesc = ''
                                    this._API.putNposFile.requestCommon(npoId,'verifiedImg')
                                    this._API.putNposFile.fileUpload({
                                        id: npoId,
                                        type: 'verifiedImg',
                                        image: _this.verifiedImageFile[0]
                                    }).then((data) => {
                                        // if (data.errors) {
                                        //     console.log('xxxx:'+data.errors)
                                        // }
                                        if(_this.registerImageFile) {
                                            // let data = []
                                            // let errorDesc = ''
                                            this._API.putNposFile.requestCommon(npoId,'registerImg')
                                            this._API.putNposFile.fileUpload({
                                                id: npoId,
                                                type: 'registerImg',
                                                image: _this.registerImageFile[0]
                                            }).then((data) => {
                                                if (data.errors) {
                                                }
                                            }).catch((error) => {
                                                // delete data
                                                // this.itemDelete(this.editFormValidate.code)
                                            })                                                    
                                        }
                                    }).catch((error) => {
                                        // delete data
                                        // this.itemDelete(this.editFormValidate.code)
                                    })                                           
                                }else {
                                    if(_this.registerImageFile) {
                                        // let data = []
                                        // let errorDesc = ''
                                        this._API.putNposFile.requestCommon(npoId,'registerImg')
                                        this._API.putNposFile.fileUpload({
                                            id: npoId,
                                            type: 'registerImg',
                                            image: _this.registerImageFile[0]
                                        }).then((data) => {
                                            if (data.errors) {
                                            }
                                        }).catch((error) => {
                                            // delete data
                                            // this.itemDelete(this.editFormValidate.code)
                                        })                                                    
                                    }                                    
                                }
                                    
                            }
                             
                                
                        } 

                        // if (_this.npoIconFile) {
                                
                        //         // upload plane photo
                        //         let data = []
                        //         let errorDesc = ''
                        //         // console.log('xxxx:'+_this.file[0]+'|bannerID:'+bannerID)
                        //         this._API.putNposFile.requestCommon(this.$route.params.id,'icon')
                        //         this._API.putNposFile.fileUpload({
                        //             id: this.$route.params.id,
                        //             type: 'icon',
                        //             image: _this.npoIconFile[0]
                        //         }).then((data) => {
                        //             if (data.errors) {
                        //             }
                        //         }).catch((error) => {
                        //         })
                        // } 

                        // if (_this.verifiedImageFile) {
                                
                        //         // upload plane photo
                        //         let data = []
                        //         let errorDesc = ''
                        //         // console.log('xxxx:'+_this.file[0]+'|bannerID:'+bannerID)
                        //         this._API.putNposFile.requestCommon(this.$route.params.id,'verifiedImg')
                        //         this._API.putNposFile.fileUpload({
                        //             id: this.$route.params.id,
                        //             type: 'verifiedImg',
                        //             image: _this.verifiedImageFile[0]
                        //         }).then((data) => {
                        //             if (data.errors) {
                        //             }
                        //         }).catch((error) => {
                        //         })
                        // }

                        // if (_this.registerImageFile) {
                                
                        //         // upload plane photo
                        //         let data = []
                        //         let errorDesc = ''
                        //         // console.log('xxxx:'+_this.file[0]+'|bannerID:'+bannerID)
                        //         this._API.putNposFile.requestCommon(this.$route.params.id,'registerImg')
                        //         this._API.putNposFile.fileUpload({
                        //             id: this.$route.params.id,
                        //             type: 'registerImg',
                        //             image: _this.registerImageFile[0]
                        //         }).then((data) => {
                        //             if (data.errors) {
                        //             }
                        //         }).catch((error) => {
                        //         })
                        // }


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
                            // 更新dumpFile
                            this._API.refreshDumpFile.send(data).then((data) => {})
                            // this.getDetail()
                            this.$router.push({ name: 'backendNpoList'})    
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
        handleUploadVerifiedImage(file) { // 上传文件前的事件钩子
            // console.log('file size:' + file.size)
            if (file.size >= (this.maxSize * 1024000)) {
                this.handleMaxSize(file)
                return false;
            } else {
                this.verifiedImageFile = []
                // 选择文件后 这里判断文件类型 保存文件 自定义一个keyid 值 方便后面删除操作
                let keyID = Math.random().toString().substr(2);
                file['keyID'] = keyID;
                // 保存文件到总展示文件数据里
                this.verifiedImageFile.push(file);
                //利用Blob预览本地上传的图片
                this.handlePreview('VerifiedImageUpdSRC');

                // this.editFormValidate.verifiedImage = file
                // console.log('this.editFormValidate.mapPath:' + this.editFormValidate.mapPath)
                // 选择文件后触发验证关闭错误提示
                // this.$refs['editFormValidate'].validate(() => {})

                // 返回 false 停止自动上传 我们需要手动上传
                return false;
            }
        },      
        handleUploadRegisterImage(file) { // 上传文件前的事件钩子
            // console.log('file size:' + file.size)
            if (file.size >= (this.maxSize * 1024000)) {
                this.handleMaxSize(file)
                return false;
            } else {
                this.registerImageFile = []
                // 选择文件后 这里判断文件类型 保存文件 自定义一个keyid 值 方便后面删除操作
                let keyID = Math.random().toString().substr(2);
                file['keyID'] = keyID;
                // 保存文件到总展示文件数据里
                this.registerImageFile.push(file);
                //利用Blob预览本地上传的图片
                this.handlePreview('RegisterImageUpdSRC');

                // this.editFormValidate.registerImage = file
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
            switch(updSrc) {
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
                switch(updSrc) {
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
        // upload() { // 上传文件
        //     // this.$refs.uploadImg.post(this.file[0]);
        //     console.log(this.file[0])
        // },
        
    }
};
</script>

<style lang="scss" scoped>
.previewPlanes {
    width: 100px;
}
.hint {
    padding-bottom: 10px;
    margin: 10px
}
</style>