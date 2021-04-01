  <template lang="pug">
    .container
        app-logo
        .all
            input(type="checkbox" id="all_check" v-model="all_check_handle" @change="delete_all()")
            label(for="all_check") {{ all_check_status ? "取消全選" : "全選" }}
        .todolist
            
            .item(v-for="(item, key) in todolist" :key="key")
                input(type="checkbox" :id="key" v-model="item_check_handle" :value="key" @change="delete_item(item)")
                div
                    label(:for="key" :class=" !item.status ? 'delete' : ''") 日期 : {{ item.date }}
                    label(:for="key" :class=" !item.status ? 'delete' : ''") 事件 : {{ item.record }}
                    label(:for="key" :class=" !item.status ? 'delete' : ''") 地點 : {{ item.where }}
  </template>


  <script>
    import AppLogo from '~/components/AppLogo.vue';
    export default {
        components: {
            AppLogo
        },
        data () {
            return {
                todolist:[
                    {
                        date: "2021 / 4 / 1",
                        record: "完成computed todolist",
                        where: "無限創意科技",
                        status: true
                    },
                    {
                        date: "2021 / 4 / 2",
                        record: "駕著小發去旅行",
                        where: "any where",
                        status: true
                    }
                ],
                // 用來被監控的變數
                item_check_status: [],
                all_check_status: false
            }
        },
        computed: {
            item_check_handle: {
                get() {
                    // console.log('computed getter --> ')
                    // 這裡很重點!!
                    return this.item_check_status
                },
                // value = templete input 內寫的值, 注意當取消勾選時會回傳 false
                set( value ) {
                    // console.log('computed setter --> ')
                    // 特別!! 會像push把value丟到array
                    this.item_check_status = value;
                    // 決定全選狀態
                    this.all_check_status = this.item_check_status.length > 0 ? 
                    (this.item_check_status.length == this.todolist.length ? true : false) 
                    :
                    false
                }
            },
            all_check_handle: {
                get() {
                    return this.all_check_status
                },
                set( value , test ) {
                    this.all_check_status = value;
                    value ? this.todolist.forEach((item, index) => this.item_check_status.push(index)) : this.item_check_status = [];
                }
            }
        },
        updated () {
            // console.log('updated')
        },
        methods:{
            delete_item(item) {
                item.status = !item.status;
            },
            delete_all() {
                this.todolist.forEach((item, index) => {
                    item.status = this.all_check_status ? false : true;
                })
            }
        }
    }
  </script>


  <style lang="scss" scoped>
    .container{
          flex-direction: column;
          #getID{
            color: red;
          }
          .inline{
            display: inline-flex;
          }
          .todolist{
              display: flex;
              flex-direction: column;
              align-items: flex-start;
                .item{
                    display: flex;
                    align-items: center;
                    margin-bottom: 20px;
                    border: 1px solid greenyellow;
                div{
                    text-align: left;
                    margin-left: 20px;
                }
                label{
                    display: block;
                    margin-bottom: 0;
                    &.delete{
                        text-decoration: line-through;
                        text-decoration-color: red;
                    }
                }
            } 

          }
          
    }
  </style>
