<template>
<div>
    <Form ref="searchFormValidate" :model="searchFormValidate" :rules="searchRuleValidate" label-position="top">
        <Row :class="rowHeight">
            <i-Col span="20">
                <Row>
                    <i-Col span="6">
                        <FormItem class="search-form-item" label="ID" prop="id">
                            <Input v-model.trim="searchFormValidate.id" maxlength="64" placeholder="請輸入關鍵字"></Input>
                        </FormItem>
                    </i-Col>                  
                    <i-Col span="6">
                        <FormItem class="search-form-item" label="類型" prop="type">
                            <Select v-model="searchFormValidate.type" :transfer="true">
                                <Option value="all">全部</Option>
                                <Option value="1">志工NPO</Option>
                                <Option value="2">物資NPO</Option>
                                <Option value="3">企業志工</Option>
                            </Select>
                        </FormItem>
                    </i-Col>
                    <i-Col span="6">
                        <FormItem class="search-form-item" label="名稱" prop="name">
                            <Input v-model.trim="searchFormValidate.name" maxlength="64" placeholder="請輸入關鍵字"></Input>
                        </FormItem>
                    </i-Col>

                </Row>
            </i-Col>
            <i-Col span="4">
                <div class="search-submit"><Button type="primary" icon="icon icon-ic-search" long @click="searchHandleSubmit('searchFormValidate')">搜尋</Button></div>
            </i-Col>
        </Row>
        <!-- <Row type="flex" justify="center">
          <svg v-if="searchbar==='open'" @click="searchbarToggle" class="svg_SearchbarToggle"><use xlink:href="#icon-ic-search-menu-open" /></svg>
          <svg v-if="searchbar==='hide'" @click="searchbarToggle" class="svg_SearchbarToggle"><use xlink:href="#icon-ic-search-menu-hide" /></svg>
      </Row> -->
    </Form>
</div>
</template>

<script>
import Config from '@/common/config'
// import '@/assets/images/icon/ic-search-menu-open.svg' 
// import '@/assets/images/icon/ic-search-menu-hide.svg' 

export default {
    props: ['sort'],
    data() {
        return {
            searchbar: 'open',
            rowHeight: 'row-height',
            isSearch: true,
            modal_loading: false,
            clientHeight: '647px',
            params: '',
            searchFormValidate: {
                id: '',
                type: 'all',
                name: '',
            },
            searchRuleValidate: {}
        }
    },
    mounted() {
        // this.clientHeight = `${document.documentElement.clientHeight}px` > '647px' ? `${document.documentElement.clientHeight}px` : '647px'
        // const self = this
        // window.onresize = () => {
        //   self.clientHeight = `${document.documentElement.clientHeight}px` > '647px' ? `${document.documentElement.clientHeight}px` : '647px'
        // }
    },
    methods: {
        searchbarToggle: function () {
            // console.log('open')
            // this.rowHeight = 'row-height open'
            if (this.searchbar === 'open') {
                this.rowHeight = 'row-height open'
                this.searchbar = 'hide'
            } else {
                this.rowHeight = 'row-height'
                this.searchbar = 'open'
            }
        },
        searchHandleSubmit(name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    this.modal_loading = true
                    let [num, data, str] = [0, '', '1=1 ']
                    // console.log('date length:'+this.searchFormValidate.date.length)
                    // console.log('date :'+this.searchFormValidate.date)
                    if (this.searchFormValidate.id !== '') {
                        num += 1
                        str += ' and id eq \'' + this.searchFormValidate.id + '\'  '
                    }     
                     if (this.searchFormValidate.type !== 'all') {
                        num += 1
                        switch(this.searchFormValidate.type) {
                            case '1': //志工NPO
                                str += ' and isVerified eq true and isEnterprise eq false and isInventory eq false  '
                                break;
                            case '2': //物資NPO
                                str += ' and isVerified eq true and isInventory eq true  '
                                break;
                            case '3': //企業志工
                                str += ' and isVerified eq true and isEnterprise eq true and isInventory eq false  '
                                break;                                                                
                        }
                        
                    }                                  
                    if (this.searchFormValidate.name !== '') {
                        num += 1
                        str += ' and name like \'' + this.searchFormValidate.name + '\'  '
                    }

                    if (num === 0) {
                        data = ''
                    } else {
                        data = str
                        // data = data.slice(0, data.length - 5)
                    }
                    // this.params = data
                    let _this = this

                    // let str = 'active eq true'
                    let params = {
                        search: str,
                        inlinecount: true,
                        sort: _this.sort,
                        page: 0,
                        size: localStorage.getItem('pageSize') ? parseInt(localStorage.getItem('pageSize')) : 10,
                    }
                    // this.$service.getUserRolesPage.requestCommon(data, 0, 10)
                    this._API.getNpos.send(params).then((data) => {
                        _this.modal_loading = false
                        _this.$Notice.success({
                            title: '成功',
                            desc: '搜尋成功',
                            duration: Config.successDuration
                        })
                        _this.isSearch = false
                        // setTimeout(() => {
                        //   _this.$emit('closeSearchModal')
                        // }, 500)
                        _this.$emit('searchData', data)
                        _this.$emit('paramData', params)
                    })
                }
            })
        }
    }
}
</script>

<style lang="scss" scoped>
input {
    border: 1;
    outline: 1;
}
</style>
