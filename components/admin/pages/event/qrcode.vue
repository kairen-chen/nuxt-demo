<template>
<div class="main">
    <div style="font-size: 45pt">{{detail.subject}}</div>
    <div style="font-size: 24pt; margin: 20px 0;">請用手機 App 掃描 QR Code 以完成報到手續</div>
    <div style="background: #f6f5fa; padding: 20px; width: 640px; margin: 0 auto;">
        <div id="qrcodeTable">
            <QRCanvas :options="options" />
        </div>
        <div style="font-size: 24px; margin-top: 20px">活動名稱：{{detail.subject}}</div>
        <div style="font-size: 24px; margin-top: 20px">活動時間：{{detail.happenDate}}</div>
    </div>
    <div style="font-size:18pt;margin: 20px 0">下載微樂志工 App，隨時掌控資訊、快速報到、一鍵登入</div>
    <div style="background: #f6f5fa; padding: 20px; width: 640px; margin: 0 auto;">
        <div style="float: left;">
            <img src="https://www.isharing.tw/static/images/qrcode_android.png">
        </div>
        <div style="float:left;margin-left:100px">
            <img src="https://www.isharing.tw/static/images/logo_download.png" height="168">
        </div>
        <div style="float: right;">
            <img src="https://www.isharing.tw/static/images/qrcode_ios.png">
        </div>
        <div style="clear: both"></div>
    </div>

</div>
</template>

<script>
import {
    QRCanvas
} from 'qrcanvas-vue';
export default {
    // middleware: 'routeAuth',
    // meta: {
    //     requiresAdmin: true
    // },    
    layout: 'qrcode',
    components: {
        QRCanvas
    },
    data() {
        return {
            // eventUid: '',
            detail: {
                subject: '',
                happenDate: ''
            },
            options: {
                data: this.$route.params.id,
                size: 300,
            },
            props: {
                categeory: {
                    type: String,
                    // required: true
                }
            }
        };

    },
    mounted() {
        this.getDetail()
    },
    methods: {
        getDetail() {
            let _this = this
            let str = ' uid eq ' + this.$route.params.id
            let params = {
                search: str,
                inlinecount: true,
            }
            // this.$service.getUserRolesPage.requestCommon(_this.queryStr, current, pageSize)
            this._API.getEvents.send(params).then((data) => {
                 _this.detail = data.results[0]
                // _this.eventUid = data.results[0].uid
            })
        },

    },

};
</script>

<style lang="scss" scoped>
.main {
    text-align: center;
    margin: 8px;
}
</style>
