<template>
<div class="main">
    <div class="height100"></div>
    <div class="loginWrapper">
        <div class="title">
            請登入

        </div>
        <div class="formContainer">
            <Form ref="loginFormValidate" :model="loginFormValidate" :rules="loginRuleValidate">
                <div class="inputContainer">
                    <Form-item prop="username">
                        <Icon type="md-person" />
                        <Input ref='user' v-model="loginFormValidate.username" placeholder="電子信箱" size="large" />
                    </Form-item>
                    <Form-item prop="password">
                        <Input ref='pwd' type="password" placeholder="密碼" v-model="loginFormValidate.password" size="large" />
                    </Form-item>
                    <Form-item>
                        <Button type="text" class="forgotButton" icon="ios-search" @click="openForgotModal()">忘記密碼</Button>
                    </Form-item>
                </div>
                <Button class="normalBtn" @click="handleSubmit('loginFormValidate')">登入</Button>
            </Form>
        </div>
    </div>
    <Modal title="忘記密碼" v-model="isShowForgotModal" class-name="vertical-center-modal">
        <Form ref="formForgotPassword" :model="formForgotPassword" :rules="forgotPasswordRuleValidate" label-position="top">
            <div class="modal-form-content">
                <Form-item prop="email" label="請輸入當初申請時的電子信箱">
                    <i-Input v-model="formForgotPassword.email" placeholder="電子信箱"></i-Input>
                </Form-item>
            </div>
        </Form>
        <div slot="footer">
            <Button @click="forgotPasswordHandleSubmit('formForgotPassword')" type="primary">送出</Button>
        </div>
    </Modal>
</div>
</template>

<script>
import Config from '@/common/config'
export default {
    layout: 'backend',
    components: {},
    data() {
        return {
            isShowForgotModal: false,
            loginFormValidate: {
                username: '',
                password: ''                
                // username: 'admin@twmf.com',
                // password: 'twmf5180'
                // username: 'leochlai@fih-foxconn.com',
                // password: 'Admin*123'
            },
            formForgotPassword: {
                email: '',
            },
        };
    },
    computed: {
        loginRuleValidate() {
            return {
                username: [{
                    required: true,
                    message: '請輸入帳號',
                    trigger: 'submit'
                }],
                password: [{
                    required: true,
                    message: '請輸入密碼',
                    trigger: 'submit'
                }, ]
            }
        },
        forgotPasswordRuleValidate() {
            return {
                email: [{
                        required: true,
                        message: '請輸入電子信箱',
                        trigger: 'submit'
                    },
                    {
                        type: 'email',
                        message: '電子信箱格式錯誤',
                        trigger: 'submit'
                    }
                ],
            }
        }
    },
    mounted() {
        if (process.client) {
            if (localStorage.getItem('accessToken') && localStorage.getItem('npoId') > 0) {

                if (localStorage.getItem('isStaff') == 'true') {
                    location.href = '/backend/Npo/list'
                    // this.$router.push({
                    //     name: 'backendNpoList' // 導頁至預設頁面
                    // })
                } else if (localStorage.getItem('isNpo')=="false" &&  localStorage.getItem('npoId') > 0) { //申請NPO但尚未通過，切到填寫完整資料頁
                    // this.$store.commit('setRole', 'ApplyNPO')
                    location.href = '/backend/NpoInvite/edit/'
                } else {
                    location.href = '/backend/NPOEvent/list'
                    // this.$router.push({
                    //     name: 'backendNPOEventList' // 導頁至預設頁面
                    // })
                }
            }else if(localStorage.getItem('accessToken') && localStorage.getItem('isStaff') == 'true' ) {
                location.href = '/backend/Npo/list'
            }
        }

    },
    methods: {
        handleSubmit(name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    let postData = {
                        username: this.loginFormValidate.username,
                        password: this.loginFormValidate.password
                    }
                    this._API.authToken.send(postData).then((res) => {
                        console.log(res)
                        if (res.accessToken) {
                            this.$store.state.loggedIn = true

                            localStorage.removeItem('accessToken')
                            localStorage.removeItem('refreshToken')
                            //===================================
                            localStorage.setItem('accessToken', res.accessToken)
                            localStorage.setItem('refreshToken', res.refreshToken)
                            // getProfile
                            let postAuthData = {}
                            this._API.getProfile.send(postAuthData).then((res) => {
                                localStorage.removeItem('id')
                                localStorage.removeItem('uid')
                                localStorage.removeItem('username')
                                localStorage.removeItem('isNpo')
                                localStorage.removeItem('isStaff')
                                localStorage.removeItem('npoId')
                                //===================================
                                localStorage.setItem('id', res.id)
                                localStorage.setItem('uid', res.uid)
                                localStorage.setItem('username', res.username)
                                localStorage.setItem('isNpo', res.isNpo)
                                localStorage.setItem('isStaff', res.isStaff)
                                localStorage.setItem('npoId', res.npoId)
                                // window.baseConfig.VUE_APP_APPLICATION_CODE = res.applicationCode
                                // this.$Notice.destroy()
                                if (res.isStaff == true) { //Admin
                                    // this.$store.dispatch('setRole', {role:'Admin'})
                                    // this.$store.commit('setRole', 'Admin')
                                    location.href = '/backend/Npo/list'
                                } else if (!res.isNpo && res.npoId > 0) { //申請NPO但尚未通過，切到填寫完整資料頁
                                    // this.$store.commit('setRole', 'ApplyNPO')
                                    location.href = '/backend/NpoInvite/edit/'
                                } else if(res.isNpo){ //已通過審核NPO
                                    // this.$store.commit('setRole', 'NPO')
                                    location.href = '/backend/NPOEvent/list'
                                } else { //未申請NPO
                                    this.$Notice.error({
                                        title: '錯誤',
                                        desc: '您輸入的帳號或密碼有誤，請重新輸入',
                                        duration: Config.errorDuration
                                    })                                    
                                }
                            })
                        } else {
                            let errorDesc = ''
                            switch (res.error) {
                                case 'invalidRequest':
                                    errorDesc = '參數無效或無法識別'
                                    break
                                case 'invalidToken':
                                    errorDesc = '憑證已過期無效請重新執行此操作'
                                    break
                                case 'invalidUserOrPassword':
                                    errorDesc = '您輸入的帳號或密碼有誤，請重新輸入'
                                    break
                                case 'userNotFound':
                                    errorDesc = '帳號不存在'
                                    break
                                case 'requestUnavailable':
                                    errorDesc = '稍後重試請求'
                                    break
                                default:
                                    errorDesc = '系統忙碌中'
                                    break
                            }
                            this.$Notice.error({
                                title: '錯誤',
                                desc: errorDesc,
                                duration: Config.errorDuration
                            })
                        }

                    }).catch((error) => {
                        console.log(error)
                        // this.$refs.user.focus();
                    })
                }

            })
        },
        openForgotModal() {
            this.$refs['formForgotPassword'].resetFields()
            this.isShowForgotModal = true
        },
        forgotPasswordHandleSubmit(name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    let data = {
                        email: this.formForgotPassword.email,
                        accessPage: `${location.origin}/user/resetPassword`,
                    }
                    this._API.forgetPassword.send(data).then((data) => {
                        let _this = this
                        let errorDesc = ''
                        // console.log('data.error:'+data.error)
                        if (data.error) {
                            switch (data.error) {
                                case 'invalidRequest':
                                    errorDesc = '參數無效或無法識別'
                                    break
                                case 'invalidToken':
                                    errorDesc = '憑證已過期無效請重新執行此操作'
                                    break
                                case 'userNotFound':
                                    errorDesc = '電子信箱不存在'
                                    break
                                default:
                                    errorDesc = ''
                                    break
                            }
                            this.$Notice.error({
                                title: '錯誤',
                                desc: errorDesc,
                                duration: Config.errorDuration
                            })
                        } else {
                            this.isShowForgotModal = false
                            this.$Notice.success({
                                title: '成功',
                                desc: '密碼重新設定信件已送至該電子信箱，請至電子信箱收信，點擊信中之網頁連結進行修改密碼',
                                duration: Config.successDuration
                            })

                            // setTimeout(() => {
                            //     // this.loading = false;
                            //     this.$nextTick(() => {
                            //         this.logout()
                            //     });
                            // }, 2000)                            

                        }
                    })
                }
            })
        },
    }
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/common/_variableAndUtility.scss";
@import "@/assets/scss/common/_rwd.scss";

.modal-form-content {
    width: 50%;
    margin: 0 auto;
    text-align: left;
}

.height100 {
    height: 100px;
}

.loginWrapper {
    margin: 0 auto 20px;
    // margin-top: calc(#{$MobileHeaderHeight} + 20px);
    width: 90%;
    max-width: 500px;
    padding: 60px 10px;
    box-shadow: 1px 5px 20px 1px rgb(0 0 0 / 30%);
    border-radius: 16px;
    font-size: 16px;
    font-weight: 600;

    @include BreakPointLarge {
        // margin-top: 99px;
        max-width: 674px;
    }

    .title {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-left: 20px;
        font-family: PingFangTC;
        font-weight: 500;
        font-size: 36px;
        color: map-get($color, "Gary40");
        margin-bottom: 36px;

        img {
            margin-right: 5px;
            width: 40px;
        }
    }

    .formContainer {
        width: 90%;
        margin: 0 auto;

        @include BreakPointLarge {
            width: 350px;
        }

        .inputContainer {
            position: relative;

            input {
                width: 100%;
                height: 50px;
                font-size: 16px;
                border: 1px solid map-get($color, "Gary30");
                border-radius: 25px;
                padding-left: 50px;

                &:focus {
                    border-color: map-get($color, "Blue10");
                }
            }

            &:first-child {
                margin-bottom: 25px;
            }

            i {
                position: absolute;
                font-size: 30px;
                top: 10px;
                left: 15px;
                opacity: 0.7;
            }
        }

        .normalBtn {
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 16px;
            width: 100%;
            border: 0;
            color: map-get($color, White);
            background-color: map-get($color, "Blue10");
            border-radius: 25px;
            font-weight: inherit;
            height: 50px;

            &:nth-child(4) {
                background-color: unset;
                color: map-get($color, "Black10");
                border: 1px solid map-get($color, "Blue10");
            }

            &:nth-child(3) {
                margin-bottom: 25px;
                margin-top: 60px;
            }
        }

        .forgotButton {
            padding: 0px;
            color: #3468dc;
        }

        .forgotButton:hover {
            padding: 0px;
            background-color: transparent;
        }

        .forgotButton:focus {
            border: 0px;
            background-color: transparent;
            outline-style: none !important;
        }
    }
}
</style>
