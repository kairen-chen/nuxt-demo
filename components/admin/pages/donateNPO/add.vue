<template>
<div class="main">
    <Layout class="main">
        <div class="edit-form">
            <!-- <EditModal v-if="isEditModal" /> -->
            <div class="edit-form-content">
                <div class="form-head">
                    <div class="form-head-title">5180企業資料新增</div>
                </div>
                <Divider style="margin:16px 0px" />

                <Form id="editFormValidate" ref="editFormValidate" :model="editFormValidate" :rules="editRuleValidate" label-position="top">

                    <Row>
                        <i-Col span="12">
                            <FormItem class="edit-form-item" label="企業名稱" prop="name">
                                <Input v-model.trim="editFormValidate.name" maxlength="64"></Input>
                            </FormItem>
                        </i-Col>
                        <i-Col span="12">
                            <FormItem class="edit-form-item" label="5180NPO代碼" prop="code">
                                <Input v-model.trim="editFormValidate.code" maxlength="64"></Input>
                            </FormItem>
                        </i-Col>
                    </Row>
                    <Row>
                        <i-Col span="12">
                            <FormItem class="edit-form-item" label="企業代表圖示" prop="npoIcon">
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
                            <FormItem class="edit-form-item" label="企業詳細資訊" prop="description">
                                <Input v-model.trim="editFormValidate.description" type="textarea" :rows="5"></Input>
                            </FormItem>
                        </i-Col>
                    </Row>
                    <Row>
                        <i-Col span="12">
                            <FormItem class="edit-form-item" label="藍新數位捐款連結" prop="newebpayUrl">
                                <Input v-model.trim="editFormValidate.newebpayUrl"></Input>
                            </FormItem>
                        </i-Col>
                        <i-Col span="12">
                            <FormItem class="edit-form-item" label="藍新定期定額捐款連結" prop="newebpayPeriodUrl">
                                <Input v-model.trim="editFormValidate.newebpayPeriodUrl"></Input>
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
                <div style="text-align:center">
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

export default {
    layout: 'backend',
    components: {
    },
    data() {
        const validateUpload = (rule, value, callback) => {
            if (this.editFormValidate.npoIcon === null) {
                callback(new Error('請選擇NPO代表圖示'))
            } else {
                callback()
            }
        }            
        return {
            maxSize: 100, //MB
            NpoIconUpdSRC: '',
            cancelConfirm: false,
            npoIconFile: null, //npo icon      
            //                  
            detail: [],
            userList: [],
            editFormValidate: {
                user: '',
                name: '',
                npoIcon: null,
            },
            editRuleValidate: {
                name: [{
                    required: true,
                    message: '請輸入NPO名稱',
                    trigger: 'submit'
                }, ],
                npoIcon: [{
                        required: true,
                        validator: validateUpload,
                        trigger: 'submit',
                        type: 'object',
                }],
                description: [{
                    required: true,
                    message: '請輸入NPO詳細資訊',
                    trigger: 'submit'
                }],
            },
        };

    },
    mounted() {
        // this.getUsers()
    },
    methods: {


        editHandleSubmit(name) {
            this.$refs[name].validate((valid, error) => {
                if (valid) {
                    this.modal_loading = true
                    let data = []

                    //判斷排序
                    let displaySort = 0
                    if(this.editFormValidate.newebpayUrl !='' && this.editFormValidate.newebpayPeriodUrl !='') {
                        displaySort = 5
                    }else if (this.editFormValidate.newebpayUrl !=''){
                        displaySort = 4
                    }else if (this.editFormValidate.newebpayPeriodUrl !='') {
                        displaySort = 3
                    }else {
                        displaySort = 0
                    }

                    data.push({
                        name: this.editFormValidate.name,
                        description: this.editFormValidate.description,
                        code: this.editFormValidate.code,
                        newebpayUrl: this.editFormValidate.newebpayUrl,
                        newebpayPeriodUrl: this.editFormValidate.newebpayPeriodUrl,
                        displaySort: displaySort
                    })
                    // console.log(data)
                    let _this = this
                    let errorDesc = ''
                    this._API.postDonationNpos.send(data).then((data) => {

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
                        let donateNPOID = data[0].id
                        if (_this.npoIconFile) {
                            
                            // upload plane photo
                            let data = []
                            let errorDesc = ''
                            // console.log('xxxx:'+_this.file[0]+'|bannerID:'+bannerID)
                            this._API.putDonateNPOFile.requestCommon(donateNPOID, 'icon')
                            this._API.putDonateNPOFile.fileUpload({
                                id: donateNPOID,
                                type: 'icon',
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
                            // this.getDetail()
                            this.$router.push({ name: 'backendDonateNPOList'})    
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

                this.editFormValidate.npoIcon = file
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

    }
};
</script>

<style lang="scss" scoped>
.previewPlanes {
    width: 100px;
}

</style>
