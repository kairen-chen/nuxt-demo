<style lang="scss" scoped>
// .layout {
//     /* border: 1px solid #d7dde4; */
//     background: #222;
//     position: relative;
//     /* border-radius: 4px; */
//     overflow: hidden;
//     // padding: 5px 40px;
//     // display: flex;
.ivu-layout-header {
    line-height: initial;
    height: initial;
    background: #222;
    padding: 0px 50px;
    z-index: 999;

    .layout-nav {
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-grow: 1;

        .nav {
            display: flex;
            justify-content: flex-start;
            align-items: center;

            .nav-item {
                display: flex;
                justify-content: center;
                align-items: center;

                .ivu-menu-dark {
                    background: #222;
                }
            }
        }

        // flex-grow: 1;
        .layout-logo {
            padding-right: 10px;
            display: flex;
            height: 60px;
            align-items: center;
            // width: 100px;
            // height: 30px;
            /* background: #5b6270; */
            // border-radius: 3px;
            // float: left;
            // position: relative;
            // top: 6px;

            // left: 20px;
            .logo {
                width: 120px;
            }
        }
    }

    .layout-login {
        justify-content: flex-end;
        flex-grow: 1;
        text-align: right;

        .text {
            color: rgba(255, 255, 255, 0.7);
            cursor: pointer;
        }

        .text:hover {
            color: #ffffff;
        }
    }
}

.modal-form-content {
    width: 50%;
    margin: 0 auto;
    text-align: left;
}

.layout-footer-center {
    text-align: center;
}
</style>
<template>
<Layout>
    <Header>
        <div class="layout-nav">
            <div class="nav">
                <div class="layout-logo">
                    <img class="logo" src="@/assets/images/header/nav/D/logo.svg" alt="logo" />
                </div>
                <div v-show="loginStatus" class="nav-item">
                    <Menu mode="horizontal" theme="dark" :active-name="activeName">
                        <MenuItem v-for="(item, index) of navData" :name="item.title" :key="index" :to="item.link">
                            {{ item.title }}
                        </MenuItem>
                    </Menu>
                </div>
            </div>

            <div class="layout-login">
                <Dropdown class="text" v-show="loginStatus" placement="bottom-end" @on-click="handleClick">
                    歡迎{{ loginUsername }}登入
                    <Icon type="ios-arrow-down"></Icon>
                    <DropdownMenu slot="list" style="text-align:center">
                        <DropdownItem name="showEditPasswordModal">變更密碼</DropdownItem>
                        <DropdownItem v-if="isStaff=='true'" name="showEditAPPConfigModal">APP參數設定</DropdownItem>
                        <DropdownItem name="logout">登出</DropdownItem>
                    </DropdownMenu>
                </Dropdown>

                <div v-if="!loginStatus" class="text" @click="refreshPage">登入</div>
            </div>
        </div>
        <Modal title="變更密碼" width="600px" v-model="isShowEditPasswordModal" class-name="vertical-center-modal">
            <Form ref="formChangePassword" :model="formChangePassword" :rules="ruleChangePassword" label-position="top">
                <div class="modal-form-content">
                    <Form-item prop="oldPasswd" label="原密碼">
                        <i-Input type="password" v-model="formChangePassword.oldPasswd" placeholder="請輸入原密碼"></i-Input>
                    </Form-item>
                    <Form-item prop="newPasswd" label="新密碼">
                        <i-Input type="password" v-model="formChangePassword.newPasswd" placeholder="請輸入新密碼"></i-Input>
                    </Form-item>
                    <Form-item prop="newPasswdCheck" label="確認密碼">
                        <i-Input type="password" v-model="formChangePassword.newPasswdCheck" placeholder="請輸入確認密碼"></i-Input>
                    </Form-item>
                </div>
            </Form>
            <div slot="footer">
                <Button @click="changePasswordHandleSubmit('formChangePassword')" type="primary">送出</Button>
            </div>
        </Modal>

        <Modal title="變更APP參數" width="600px" v-model="isShowEditAPPConfigModal" class-name="vertical-center-modal">
            <Form ref="formChangeAPPConfig" :model="formChangeAPPConfig" :rules="ruleChangeAPPConfig" label-position="top">
                <div class="modal-form-content">
                    <Form-item prop="androidVersion" label="Android最新版本">
                        <i-Input v-model="formChangeAPPConfig.androidVersion" placeholder="請輸入Android最新版本"></i-Input>
                    </Form-item>
                    <Form-item prop="iosVersion" label="iOS最新版本">
                        <i-Input v-model="formChangeAPPConfig.iosVersion" placeholder="請輸入iOS最新版本"></i-Input>
                    </Form-item>
                    <Form-item prop="newPasswdCheck" label="是否強制用戶APP更新到最新版本">
                        <Checkbox v-model="formChangeAPPConfig.forcedUpgrade">是</Checkbox>
                    </Form-item>
                    <Form-item prop="questionnaireUrl" label="簽退問卷連結">
                        <i-Input v-model="formChangeAPPConfig.questionnaireUrl" placeholder="請輸入簽退問卷連結"></i-Input>
                    </Form-item>                    
                </div>
            </Form>
            <div slot="footer">
                <Button @click="changeAPPConfigHandleSubmit('formChangeAPPConfig')" type="primary">送出</Button>
            </div>
        </Modal>
    </Header>
</Layout>
</template>

<script>
import Config from "@/common/config";
export default {
    data() {
        const validateOldPass = (rule, value, callback) => {
            if (value === "") {
                callback(new Error("請輸入原密碼"));
            } else if (this.errorType === 1) {
                callback(new Error("原始密碼不正確"));
            } else {
                callback();
            }
            this.errorType = 0;
        };
        const validateNewPass = (rule, value, callback) => {
            let reg = /^(?![\d]+$)(?![a-zA-Z]+$)(?![~`@#$%^&*\-_=+|?()<>[\]{}",.;'!]+$)[\da-zA-Z~`@#$%^&*\-_=+|?()<>[\]{}",.;'!]{8,15}$/;
            if (value === "") {
                callback(new Error("請輸入新密碼"));
            } else if (!reg.test(value)) {
                callback(
                    new Error("密碼需含字母、數字和特殊符號至少兩種且長度8-15個字。")
                );
            } else if (this.errorType === 2) {
                callback(
                    new Error("密碼需含字母、數字和特殊符號至少兩種且長度8-15個字。")
                );
            } else if (this.errorType === 3) {
                callback(new Error("新密碼與原密碼相同，請重新輸入新密碼"));
            } else {
                if (this.formChangePassword.newPasswdCheck !== "") {
                    // 对第3个密码框单独验证
                    this.$refs.formChangePassword.validateField("newPasswdCheck");
                }
                callback();
            }
            this.errorType = 0;
        };
        const validateNewPassCheck = (rule, value, callback) => {
            if (value === "") {
                callback(new Error("請輸入確認密碼"));
            } else if (value !== this.formChangePassword.newPasswd) {
                callback(new Error("兩次填入的新密碼不一致"));
            } else {
                callback();
            }
        };
        return {
            isStaff: false,
            formChangeAPPConfig: {
                iosVersion: "",
                androidVersion: "",
                forcedUpgrade: false,
                questionnaireUrl: "",
            },   
            ruleChangeAPPConfig: {
                iosVersion: [{
                    required: true,
                    type: 'string',
                    message: '請輸入iOS最新版本',
                    trigger: 'submit'
                }],
                androidVersion: [{
                    required: true,
                    type: 'string',
                    message: '請輸入Android最新版本',
                    trigger: 'submit'
                }],
                // questionnaireUrl: [{
                //     required: true,
                //     type: 'string',
                //     message: '請輸入簽退問卷連結',
                //     trigger: 'submit'
                // }],                
            },                     
            isShowEditAPPConfigModal: false,
            loading: true,
            formChangePassword: {
                oldPasswd: "",
                newPasswd: "",
                newPasswdCheck: "",
            },
            ruleChangePassword: {
                oldPasswd: [{
                    validator: validateOldPass,
                    trigger: "submit",
                }, ],
                newPasswd: [{
                    validator: validateNewPass,
                    trigger: "submit",
                }, ],
                newPasswdCheck: [{
                    validator: validateNewPassCheck,
                    trigger: "submit",
                }, ],
            },
            isShowEditPasswordModal: false,
            activeName: "活動管理", //default
            menuShow: false,
            loginStatus: false,
            // loginUsername: '',
            loginUsername: process.client ? localStorage.getItem("username") : "",
            npoMenu: [{
                title: "活動管理",
                imgSrc: "https://www.isharing.tw/static/images/new.png",
                imgSrcActive: "https://www.isharing.tw/static/images/enterprise.png",
                link: "/backend/Event/list",
                alt: "活動管理",
            }, ],
            adminMenu: [{
                    title: "NPO管理",
                    imgSrc: "https://www.isharing.tw/static/images/new.png",
                    imgSrcActive: "https://www.isharing.tw/static/images/enterprise.png",
                    link: "/backend/Npo/list",
                    alt: "NPO管理",
                },
                {
                    title: "會員管理",
                    imgSrc: "https://www.isharing.tw/static/images/enterprise.png",
                    imgSrcActive: "https://www.isharing.tw/static/images/enterprise.png",
                    link: "/backend/Member/list",
                    alt: "會員管理",
                },
                {
                    title: "5180管理",
                    imgSrc: "https://www.isharing.tw/static/images/new.png",
                    imgSrcActive: "https://www.isharing.tw/static/images/enterprise.png",
                    link: "/backend/DonateNPO/list",
                    alt: "5180管理",
                },
                {
                    title: "邀請列表",
                    imgSrc: "https://www.isharing.tw/static/images/supply.png",
                    imgSrcActive: "https://www.isharing.tw/static/images/enterprise.png",
                    link: "/backend/NpoInvite/list",
                    alt: "物資",
                },
                {
                    title: "首頁宣傳圖片",
                    imgSrc: "https://www.isharing.tw/static/images/donate.png",
                    imgSrcActive: "https://www.isharing.tw/static/images/donate.png",
                    link: "/backend/Banner/list",
                    alt: "捐款",
                },
                {
                    title: "推播訊息",
                    imgSrc: "https://www.isharing.tw/static/images/npo.png",
                    imgSrcActive: "https://www.isharing.tw/static/images/enterprise.png",
                    link: "/backend/pushNotification/list",
                    alt: "活動單位",
                },
                {
                    title: "狀態統計",
                    imgSrc: "https://www.isharing.tw/static/images/npo.png",
                    imgSrcActive: "https://www.isharing.tw/static/images/enterprise.png",
                    link: "/backend/Status/list",
                    alt: "活動單位",
                },
                {
                    title: "資料匯出",
                    imgSrc: "https://www.isharing.tw/static/images/npo.png",
                    imgSrcActive: "https://www.isharing.tw/static/images/enterprise.png",
                    link: "/backend/Export/list",
                    alt: "活動單位",
                },
            ],
        };
    },
    computed: {
        // loginStatus() {
        //     // return true
        //     if (process.client) {
        //         if(localStorage.getItem('accessToken')) {
        //             // this.checkAccessTokenValid()
        //             this.checkAccessTokenValid()
        //             return true
        //         }else {
        //             return false
        //             // this.logout()
        //         }
        //         // return true
        //     }else {
        //         return false
        //     }
        // },
        navData() {
            if (process.client) {
                let isStaff = localStorage.getItem("isStaff");            
                let isNpo = localStorage.getItem("isNpo");
                let npoId = localStorage.getItem("npoId");
                if (isStaff == "true") {
                    return this.adminMenu;
                } else if (isNpo == "false" && npoId > 0) {
                    return [];
                } else {
                    return this.npoMenu;
                }
            }
        },
    },
    watch: {
        $route(to, from) {
            this.checkAccessTokenValid()
            this.menuRefresh()
        }
    },
    mounted() {
        this.isStaff = localStorage.getItem("isStaff");
        this.loginStatus = localStorage.getItem("accessToken") ? true : false;

        if (this.loginStatus) {
            this.checkAccessTokenValid()
            this.getAPPConfigs()
        }
        this.menuRefresh()
        
    },
    methods: {
        getAPPConfigs() {
            let _this = this
            let str = ' id eq 1' 
            let params = {
                search: str,
                // inlinecount: true,
            }
            // this.$service.getUserRolesPage.requestCommon(_this.queryStr, current, pageSize)
            this._API.getAppConfigs.send(params).then((data) => {
                // _this.detail = data.results
                if(data.results.length>0) {
                    _this.formChangeAPPConfig = _this.dataCopy(data.results[0])
                    if(_this.formChangeAPPConfig.forcedUpgrade===null) _this.formChangeAPPConfig.forcedUpgrade = false
                }
            })
        },  
        changeAPPConfigHandleSubmit(name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    let data = [{
                        id: this.formChangeAPPConfig.id,
                        iosVersion: this.formChangeAPPConfig.iosVersion,
                        androidVersion: this.formChangeAPPConfig.androidVersion,
                        forcedUpgrade: this.formChangeAPPConfig.forcedUpgrade,
                        questionnaireUrl: this.formChangeAPPConfig.questionnaireUrl,
                    }];
                    this._API.patchAppConfigs.send(data).then((data) => {
                        let _this = this;
                        let errorDesc = "";
                        // console.log('data.error:'+data.error)
                        if (data.error) {
                            switch (data.error) {
                                case "invalidRequest":
                                    errorDesc = "參數無效或無法識別";
                                    break;
                                case "invalidToken":
                                    errorDesc = "憑證已過期無效請重新執行此操作";
                                    break;
                                case "requestUnavailable":
                                    errorDesc = "稍後重試請求";
                                    break;
                                default:
                                    errorDesc = "";
                                    break;
                            }
                            this.$Notice.error({
                                title: "錯誤",
                                desc: errorDesc,
                                duration: Config.errorDuration,
                            });
                        } else {
                            this.isShowEditAPPConfigModal = false
                            this.$Notice.success({
                                title: "成功",
                                desc: "修改成功",
                                duration: Config.successDuration,
                            });
                        }
                    });
                }
            });
        },              
        handleClick(val) {
            switch (val) {
                case "logout":
                    this.logout();
                    break;
                case "showEditPasswordModal":
                    this.$refs["formChangePassword"].resetFields();
                    this.isShowEditPasswordModal = true;
                    break;
                case "showEditAPPConfigModal":
                    this.isShowEditAPPConfigModal = true;
                    break;
            }
        },
        logout() {
            if (process.client) {
                localStorage.removeItem("accessToken");
                localStorage.removeItem("refreshToken");
                localStorage.removeItem("id");
                localStorage.removeItem("uid");
                localStorage.removeItem("username");
                localStorage.removeItem("isNpo");
                localStorage.removeItem("isStaff");
                localStorage.removeItem("npoId");
            }
            location.href = "/backend/Login";

            // this.$router.push('/backend/login')
        },
        changePasswordHandleSubmit(name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    let data = {
                        oldPassword: this.formChangePassword.oldPasswd,
                        newPassword: this.formChangePassword.newPasswd,
                    };
                    this._API.patchCurrentUserPassword.send(data).then((data) => {
                        let _this = this;
                        let errorDesc = "";
                        // console.log('data.error:'+data.error)
                        if (data.error) {
                            switch (data.error) {
                                case "invalidRequest":
                                    errorDesc = "參數無效或無法識別";
                                    break;
                                case "invalidToken":
                                    errorDesc = "憑證已過期無效請重新執行此操作";
                                    break;
                                case "passwordNotMatch":
                                    errorDesc = "原始密碼不正確";
                                    break;
                                case "badPassword":
                                    errorDesc =
                                        "請輸入8-12碼英數字混合密碼";
                                    break;
                                case "samePassword":
                                    errorDesc = "新密碼與原密碼相同，請重新設定。";
                                    break;
                                case "requestUnavailable":
                                    errorDesc = "稍後重試請求";
                                    break;
                                default:
                                    errorDesc = "";
                                    break;
                            }
                            this.$Notice.error({
                                title: "錯誤",
                                desc: errorDesc,
                                duration: Config.errorDuration,
                            });
                        } else {
                            this.$Notice.success({
                                title: "成功",
                                desc: "修改成功",
                                duration: Config.successDuration,
                            });
                            setTimeout(() => {
                                // this.loading = false;
                                this.$nextTick(() => {
                                    this.logout();
                                });
                            }, 2000);
                        }
                    });
                }
            });
        },
        checkAccessTokenValid() {
            let params = {}
            let isStaff = localStorage.getItem("isStaff");
            let isNPO = localStorage.getItem("isNpo");
            let npoId = localStorage.getItem("npoId");
            if (isStaff == "true" || isNPO == "true") {
                this._API.tokenCheck.send(params).then((data) => {

                })
            } else if(isNPO=="false" && npoId>0){
                this._API.tokenCheck.send(params).then((data) => {

                })                
            } else {
                this.logout()
            }
        },
        refreshPage() {
            location.reload()
        },
        menuRefresh() {
            let routePath = this.$route.path;
            let routePathArray = routePath.split("/");
            let isStaff = localStorage.getItem("isStaff");
            switch (routePathArray[2]) {
                case "Npo":
                    if (!this.loginStatus) this.logout();
                    this.activeName = "NPO管理";
                    break;
                case "Event":
                    if (!this.loginStatus) this.logout();
                    if (isStaff) {
                        this.activeName = "NPO管理";
                    } else {
                        this.activeName = "活動管理";
                    }
                    break;
                case "Member":
                    if (!this.loginStatus) this.logout();
                    this.activeName = "會員管理";
                    break;
                case "DonateNPO":
                    if (!this.loginStatus) this.logout();
                    this.activeName = "5180管理";
                    break;
                case "NpoInvite":
                    if (!this.loginStatus) this.logout();
                    this.activeName = "邀請列表";
                    break;
                case "Banner":
                    if (!this.loginStatus) this.logout();
                    this.activeName = "首頁宣傳圖片";
                    break;
                case "Login":
                    // this.loginStatus = false
                    break;
                default:
                    this.activeName = "活動管理";
                    break;
            }
        },
        // 数据深拷贝
        dataCopy: function (data) {
            let obj = {}
            obj = JSON.parse(JSON.stringify(data))
            return obj
        },        
    },
};
</script>
