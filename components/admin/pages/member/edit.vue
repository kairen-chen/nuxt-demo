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
                    <i-Col span="12">
                        <FormItem class="edit-form-item" label="是否已綁定台灣大哥大企業帳號" prop="isTtwm">
                            {{editFormValidate.isTwm? "是":"否"}}
                            <!-- <Input v-model.trim="editFormValidate.skillsDescription" ></Input> -->
                        </FormItem>
                    </i-Col>
                    <i-Col span="12">
                        <FormItem class="edit-form-item" label="是否已綁定富邦愛心志工社帳號" prop="isFubon">
                            {{editFormValidate.isFubon? "是":"否"}}
                            <!-- <Input v-model.trim="editFormValidate.aboutMe" maxlength="64" ></Input> -->
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
        editHandleSubmit() {

        },
        goList() {

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

</style>
