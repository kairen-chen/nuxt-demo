<template>
<div class="main">
    <Layout class="main">
        <div class="edit-form">
            <!-- <EditModal v-if="isEditModal" /> -->
            <div class="edit-form-content">
                <div class="form-head">
                    <div class="form-head-title">編輯圖片</div>
                </div>
                <Divider style="margin:16px 0px" />

                <Form id="editFormValidate" ref="editFormValidate" :model="editFormValidate" :rules="editRuleValidate" label-position="top">

                    <Row>
                        <i-Col span="12">
                            <FormItem class="edit-form-item" label="圖片網址" prop="url">
                                <Input v-model.trim="editFormValidate.url" maxlength="64"></Input>
                            </FormItem>
                        </i-Col>
                    </Row>
                    <Row>
                        <i-Col span="24">
                            <FormItem class="edit-form-item" label="宣傳圖片" prop="mapPath">
                                <i-Col span="20">
                                    <a v-show="!updSrc" :href="editFormValidate.image" target="_blank"><img :src="editFormValidate.image" class="previewPlanes"></a>
                                    <div class="upd-img" v-show="updSrc">
                                        <img class="previewPlanes" :src="updSrc" alt="">
                                    </div>                                    
                                    <Upload ref="uploadImg" v-model="editFormValidate.mapPath" action="" :show-upload-list="false" accept="image/png, image/jpeg" :before-upload="handleUpload">
                                        <Button icon="ios-cloud-upload-outline">更新檔案</Button>
                                        <!-- <div class="upload-c">
                                            <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                                            <div class="upload-txt">單擊或拖拉文件上傳</div>
                                        </div> -->
                                    </Upload>


                                </i-Col>
                                <!-- <i-Col span="4">
                            <div class="uploadAction">
                                <Upload ref="uploadImg" action="" :show-upload-list="false" accept="image/png, image/jpeg" :before-upload="handleUpload">
                                    <Button icon="icon icon-ic-output">上傳</Button>
                                </Upload>
                            </div>
                        </i-Col> -->
                            </FormItem>
                            <div class="hint">電腦版圖片：1800*540，與台灣大基金會官網Banner相同。</div>
                        </i-Col>
                    </Row>
                    <Row>
                        <i-Col span="24">
                            <FormItem class="edit-form-item" label="手機版宣傳圖片" prop="verifiedImage">
                                <a v-show="!VerifiedImageUpdSRC" :href="editFormValidate.smallImage" target="_blank"><img :src="editFormValidate.smallImage" class="previewPlanes"></a>
                                <div class="upd-img" v-show="VerifiedImageUpdSRC">
                                    <img class="previewPlanes" :src="VerifiedImageUpdSRC" alt="">
                                </div>
                                <Upload ref="uploadImg" action="" :show-upload-list="false" accept="image/png, image/jpeg" :before-upload="handleUploadVerifiedImage">
                                    <Button icon="ios-cloud-upload-outline">更新檔案</Button>
                                </Upload>
                            </FormItem>
                            <div class="hint">手機版圖片：900*810，與台灣大基金會官網Banner相同。</div>
                        </i-Col>
                    </Row>
                    <Row>
                        <i-Col span="12">
                            <FormItem class="edit-form-item" label="排序(依數字由大至小顯示)" prop="displaySort">
                                <Input type="number" v-model.number="editFormValidate.displaySort"></Input>
                            </FormItem>
                            <div class="hint">可填入任意數字，圖片顯示順序會依照數字由大至小依序顯示。</div>
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
    components: {},
    data() {
        const validateUpload = (rule, value, callback) => {
            if (this.editFormValidate.mapPath === null) {
                callback(new Error('請選擇宣傳圖片'))
            } else {
                callback()
            }
        }
        const validateMobileUpload = (rule, value, callback) => {
            if (this.editFormValidate.verifiedImage === null) {
                callback(new Error('請選擇手機版宣傳圖片'))
            } else {
                callback()
            }
        }         
        return {
            maxSize: 100, //MB
            updSrc: '',
            VerifiedImageUpdSRC: '',
            cancelConfirm: false,
            file: null,
            verifiedImageFile: null, //npo icon
            //
            detail: [],
            userList: [],
            editFormValidate: {
                url: '',
                mapPath: {},
                displaySort: 0
            },
            editRuleValidate: {
                url: [{
                    // A-Za-z 0-9 @ : $
                    required: true,
                    type: 'string',
                    message: '請輸入圖片網址',
                    trigger: 'submit'
                }],
                mapPath: [
                    {
                        required: true,
                        validator: validateUpload,
                        trigger: 'submit',
                        type: 'object',
                    },
                ],
                verifiedImage: [
                    {
                        required: true,
                        validator: validateMobileUpload,
                        trigger: 'submit',
                        type: 'object',
                    },
                ],                
                displaySort: [{
                    required: true,
                    trigger: 'submit',
                    message: '請輸入排序',
                    type: 'number',
                }, ]
            },
        };

    },
    mounted() {
        this.getDetail()
        var form = document.querySelector('#editFormValidate');
        let _this = this
        form.addEventListener('change', function () {
            if (!_this.cancelConfirm) {
                _this.cancelConfirm = true
            }
        })
    },
    methods: {

        getDetail() {
            console.log('this.$route.params.id:' + this.$route.params.id)
            let _this = this
            let str = ' id eq ' + this.$route.params.id
            let params = {
                search: str,
                inlinecount: true,
            }
            // this.$service.getUserRolesPage.requestCommon(_this.queryStr, current, pageSize)
            this._API.getBanner.send(params).then((data) => {
                // _this.detail = data.results
                _this.editFormValidate = _this.dataCopy(data.results[0])
                _this.editFormValidate.mapPath = _this.editFormValidate.image

                // _this.updSrc = _this.editFormValidate.image
                // _this.total = data.count
                console.log(JSON.stringify(_this.editFormValidate))
            })
        },
        editHandleSubmit(name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    this.modal_loading = true
                    let data = []

                    data.push({
                        id: this.$route.params.id,
                        url: this.editFormValidate.url,
                        displaySort: this.editFormValidate.displaySort,
                    })
                    // console.log(data)
                    let _this = this
                    let errorDesc = ''
                    this._API.patchBanner.send(data).then((data) => {

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
                                        case 'quantityExceeded':
                                            errorDesc = '請求數量超過上限'
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
                            let bannerID = data[0].id
                            console.log('file:' + JSON.stringify(_this.file))
                            if (_this.file) {

                                // upload plane photo
                                let data = []
                                let errorDesc = ''
                                // console.log('xxxx:'+_this.file[0]+'|bannerID:'+bannerID)
                                this._API.putBanner.requestCommon(this.$route.params.id, 'image')
                                this._API.putBanner.fileUpload({
                                    id: this.$route.params.id,
                                    type: 'image',
                                    image: _this.file[0]
                                }).then((data) => {
                                    console.log('SUCCESS')

                                }).catch((error) => {
                                    // delete data
                                    console.log('xxxx')
                                    // this.itemDelete(this.editFormValidate.code)

                                })
                            } 
                            if (_this.verifiedImageFile) {

                                // upload plane photo
                                let data = []
                                let errorDesc = ''
                                // console.log('xxxx:'+_this.file[0]+'|bannerID:'+bannerID)
                                this._API.putBanner.requestCommon(this.$route.params.id, 'smallImage')
                                this._API.putBanner.fileUpload({
                                    id: this.$route.params.id,
                                    type: 'smallImage',
                                    image: _this.verifiedImageFile[0]
                                }).then((data) => {
                                    if (data.errors) {
                                    }
                                }).catch((error) => {
                                    // delete data
                                    // this.itemDelete(this.editFormValidate.code)
                                })
                            }
                            
                            
                                _this.$Notice.success({
                                    title: '成功',
                                    desc: '編輯成功',
                                    duration: Config.successDuration
                                })
                                this.$router.push({
                                    name: 'backendBannerList'
                                })
                            

                        }
                    })
                }
            })
        },
        goList() {

        },

        handleUpload(file) { // 上传文件前的事件钩子
            // console.log('file size:' + file.size)
            if (file.size >= (this.maxSize * 1024000)) {
                this.handleMaxSize(file)
                return false;
            } else {
                this.file = []
                // 选择文件后 这里判断文件类型 保存文件 自定义一个keyid 值 方便后面删除操作
                let keyID = Math.random().toString().substr(2);
                file['keyID'] = keyID;
                // 保存文件到总展示文件数据里
                this.file.push(file);
                //利用Blob预览本地上传的图片
                this.handlePreview();

                this.editFormValidate.mapPath = file
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
                title: this.$t('LocaleString.W00022'),
                desc: this.$t('LocaleString.W00023', {
                    0: this.maxSize
                })
            });
        },
        handlePreview(updSrc) {
            const self = this;
            const reader = new FileReader();
            switch (updSrc) {
                case 'VerifiedImageUpdSRC':
                    reader.readAsArrayBuffer(this.verifiedImageFile[0]);
                    break;
                default:
                    reader.readAsArrayBuffer(this.file[0]);
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
                    case 'VerifiedImageUpdSRC':
                        self.VerifiedImageUpdSRC = str;
                        break;
                    default:
                        self.updSrc = str;
                        break;
                }
            };
        },
        // handlePreview() {
        //     const self = this;
        //     const reader = new FileReader();
        //     reader.readAsArrayBuffer(this.file[0]);
        //     reader.onload = function (e) {
        //         const bf = this.result;
        //         const blob = new Blob([bf], {
        //             type: "text/plain"
        //         });
        //         const str = URL.createObjectURL(blob);
        //         self.updSrc = str;
        //     };
        // },
        upload() { // 上传文件
            // this.$refs.uploadImg.post(this.file[0]);
            console.log(this.file[0])
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
.previewPlanes {
    max-width: 100%;
    max-height: 300px;
}
.hint {
    padding-bottom:10px;
    margin:10px
}
</style>
