<template>
<div class="main">
    <Layout class="main">
        <div class="edit-form">
            <!-- <EditModal v-if="isEditModal" /> -->
            <div class="edit-form-content">
                <div class="form-head">
                    <div class="form-head-title">活動成果圖片管理</div>
                </div>
                <Divider style="margin:16px 0px" />

                <Form id="editFormValidate" ref="editFormValidate" :model="editFormValidate" :rules="editRuleValidate" label-position="top">

                    <Row>
                        <i-Col span="24">
                            <Row>
                                <FormItem class="edit-form-item" label="活動圖片" prop="image1">
                                    <!-- <a v-show="!NpoIconUpdSRC" :href="editFormValidate.thumbPath" target="_blank"><img :src="editFormValidate.thumbPath" height="200"></a> -->

                                    <!-- <a v-show="!NpoIconUpdSRC" :href="editFormValidate.thumbPath" target="_blank"><img :src="editFormValidate.thumbPath" width="100"></a> -->
                                    <div class="upd-img" v-show="NpoIconUpdSRC">
                                        <img class="previewPlanes" :src="NpoIconUpdSRC" alt="">
                                    </div>
                                    <div style="display:flex; align-items:center">
                                        <Upload ref="uploadImg" action="" :show-upload-list="false" accept="image/png, image/jpeg" :before-upload="handleUploadNpoIcon">
                                            <Button icon="ios-cloud-upload-outline">選擇檔案</Button>
                                        </Upload>
                                        <div v-if="npoIconFile" style="padding-left:10px"><Button icon="ios-cloud-upload-outline" @click="uploadFileHandle">上傳檔案</Button></div>
                                    </div>
                                </FormItem>
                                <!-- <div style="padding-bottom:10px;margin:10px">提醒. 請上傳 RGB 格式的 JPEG 圖片，請勿使用 CMYK 格式的 JPEG 圖片</div> -->
                            </Row>
                        </i-Col>

                    </Row>
                    <Row :gutter="16">
                        <i-Col span="8" v-for="item in editFormValidate.resultImages" :key="item.id" style="padding-bottom:15px; text-align:center">
                            <a :href="item.image" target="_blank"><img class="previewPlanes" :src="item.thumbPath"></a><br>
                            <Button icon="ios-trash" @click="deleteFileConfirm(item.id)">刪除圖片</Button>
                        </i-Col>

                    </Row>

                </Form>


                <div style="text-align:center; padding-top:20px">
                    <Button style="width:150px" @click="$router.back()">返回</Button>
                    <!-- <Button type="primary" style="margin-left: 8px; width:150px" @click="editHandleSubmit('editFormValidate')">送出</Button> -->
                </div>
            </div>
        </div>
    </Layout>
    <Modal v-model="deleteConfirmModal" title="刪除" :mask-closable="false">
        <div class="message">
            <div>
                <Icon type="md-alert" style="color:#ed4014" size="20" />
                確定刪除選中項目？
            </div>
        </div>
        <div slot="footer">
            <Button @click="deleteConfirmModal=false">取消</Button>
            <Button type="primary" @click="deleteFileHandle()">確定</Button>
        </div>
    </Modal>
</div>
</template>

<script>
import Config from '@/common/config'

export default {
    layout: 'backend',
    components: {

    },
    computed: {

    },
    data() {
        return {
            selectItems: null,
            deleteConfirmModal: false,
            maxSize: 100, //MB
            NpoIconUpdSRC: '',
            VerifiedImageUpdSRC: '',
            RegisterImageUpdSRC: '',
            cancelConfirm: false,
            npoIconFile: null, //npo icon
            verifiedImageFile: null, //npo icon
            registerImageFile: null, //npo icon   

            detail: [],
            editFormValidate: {
                user: '',
                name: '',
                mapPath: null
            },
            editRuleValidate: {
                // user: [{
                //     // A-Za-z 0-9 @ : $
                //     required: true,
                //     type: 'string',
                //     max: 20,
                //     pattern: /^[A-Za-z0-9@:_$]+$/,
                //     // message: this.$t('LocaleString.W00010'),
                //     trigger: 'submit'
                // }],
                // name: [{
                //         required: true,
                //         // message: this.$t('LocaleString.L00001', {
                //         //     0: this.$t('LocaleString.L00012')
                //         // }),
                //         trigger: 'submit'
                //     },
                //     {
                //         type: 'string',
                //         max: 64,
                //         // message: this.$t('LocaleString.W00011', {
                //         //     0: this.$t('LocaleString.L00012'),
                //         //     1: '64'
                //         // }),
                //         trigger: 'submit'
                //     }
                // ],
                // description: [{
                //     type: 'string',
                //     max: 128,
                //     // message: this.$t('LocaleString.W00011', {
                //     //     0: this.$t('LocaleString.L00039'),
                //     //     1: '128'
                //     // }),
                //     trigger: 'submit'
                // }],
            },
        };

    },
    mounted() {
        this.getDetail()
        // this.getUsers()
    },
    methods: {

        getDetail() {
            // id:264
            let _this = this
            let str = ' id eq ' + this.$route.params.eventId
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
                // _this.total = data.count
                console.log(JSON.stringify(_this.editFormValidate))
            })
        },

        // editHandleSubmit() {
        //     let _this = this
        //     console.log('editFormValidate:' + JSON.stringify(this.editFormValidate))
        //     if (_this.npoIconFile) {

        //         // upload plane photo
        //         let data = []
        //         let errorDesc = ''
        //         // console.log('xxxx:'+_this.file[0]+'|bannerID:'+bannerID)
        //         this._API.putEventsResultFile.requestCommon(this.$route.params.eventId, 'image')
        //         this._API.putEventsResultFile.fileUpload({
        //             id: this.$route.params.eventId,
        //             type: 'image',
        //             image: _this.npoIconFile[0]
        //         }).then((data) => {
        //             if (data.errors) {
        //                 console.log('xxxx:' + data.errors)
        //             }
        //         }).catch((error) => {
        //             // delete data
        //             console.log('xxxx')
        //             // this.itemDelete(this.editFormValidate.code)
        //         })
        //     }
        // },
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
        uploadFileHandle() {
            let _this = this
            console.log('editFormValidate:' + JSON.stringify(this.editFormValidate))
            if (_this.npoIconFile) {

                // upload plane photo
                let data = []
                let errorDesc = ''
                // console.log('xxxx:'+_this.file[0]+'|bannerID:'+bannerID)
                this._API.putEventsResultFile.requestCommon(this.$route.params.eventId, 'image')
                this._API.putEventsResultFile.fileUpload({
                    id: this.$route.params.eventId,
                    type: 'image',
                    image: _this.npoIconFile[0]
                }).then((data) => {
                    if (data.errors) {
                        console.log('xxxx:' + data.errors)
                    }else {
                        _this.npoIconFile = null
                        _this.NpoIconUpdSRC = null
                        _this.$Notice.success({
                            title: '成功',
                            desc: '新增成功',
                            duration: Config.successDuration
                        })                        
                    }
                    this.getDetail()
                }).catch((error) => {
                    // delete data
                    console.log('xxxx')
                    // this.itemDelete(this.editFormValidate.code)
                })
            }
        },
        deleteFileConfirm(id) {
            this.selectItems = id
            this.deleteConfirmModal = true
        },
        deleteFileHandle() {

            let errorDesc = ''
            // 先刪除檔案
            this._API.deleteEventResultFile.requestCommon(this.selectItems, 'image')
            this._API.deleteEventResultFile.fileUpload({
                id: this.selectItems,
                type: 'image',
            }).then((data) => {
                this.$Notice.success({
                    title: '成功',
                    desc: '刪除成功',
                    duration: Config.successDuration
                })   
                this.deleteConfirmModal = false
                this.getDetail()

            }).catch((error) => {
                console.log('xxxx')
            })
        }
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
    // max-width: 100%;
    max-width: 300px;
}

.uploadAction {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
}
</style>
