export default {
  computed: {
    warn() {
      return {
        require: "請輸入",
        formatNotMatch: "正確",
        passwordFormatNotMatch: this.placeholder.rolePassword,
      };
    },
    placeholder() {
      return {
        text: "請輸入",
        email: "電子信箱",
        password: "密碼",
        rolePassword: "8-12碼英文、數字混合密碼",
        employeeID: "員工編號",
        tel: "電話",
        idNumber: "身分證字號",
      };
    },
    dataType() {
      return {
        //_validateReuslt()switch case會以此key來讀取type,要和case match
        email: {
          type: "email", //驗證類型用,要和父層一模一樣
          val: "電子信箱", //提示字
          role: /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/,
        },
        password: {
          type: "password",
          val: "密碼",
        },
        rolePassword: {
          type: "rolePassword",
          val: `密碼`,
          role: /^(?=.*[A-Za-z])(?=.*\d)[a-zA-Z\d]{8,12}/i, //須有英文、數字,且為8-12碼
        },
        checkPassword: {
          type: "checkPassword",
          val: "確認密碼",
        },
        employeeID: {
          type: "employeeID", //驗證類型用,要和父層一模一樣
          val: "員工編號", //提示字
          role: /[0-9]{2}[0-9]{2}[0-9]{6}/,
        },
        tel: {
          type: "tel",
          val: "電話", //提示字
          // role: /[0-9]{2}[0-9]{2}[0-9]{6}/,
          role: /^[0-9\s|-]*$/,
        },
        idNumber: {
          type: "idNumber",
          val: "身分證字號", //提示字
          role: /^[A-Z](1|2)\d{8}$/i,
        },
        text: {
          type: "text",
          val: "此欄位",
        },
      };
    },
  },
  data() {
    return { _password: null };
  },
  watch: {},
  mounted() {},
  beforeDestroy() {},
  methods: {
    /**
     * 1.這裡關聯到在_validateReuslt()以何種type驗證
     * 2.沒對應到的_validateReuslt()一律return turn防止誤傳
     * */
    _keyMapping(key) {
      let newKey = null;
      switch (key) {
        case "username":
          newKey = "email";
          break;
        case "account":
          newKey = "email";
          break;
        default:
          newKey = key;
      }
      return newKey;
    },
    /*
     * submit驗證
     * input-> 1. [{待驗資料}]
     *       2. callback
     * output-> true/false/string
     *
     * 注意!!
     * 因物件key可隨意取名,所以要把[{'key'}]
     * 至_keyMapping()定義要以何種規則驗證,不然只會檢查是否為空值而已
     *
     * 父層 ref="_xxx" -> 一定要取不同名，同名會後蓋前
     */
    _validate(validateArr, func) {
      Object.keys(this.$refs).forEach((key) => {
        this.$refs[key].$emit("inputHandler");
      });
      let result = [],
        data;
      validateArr.forEach((val) => {
        data = Object.entries(val)[0];
        // mapping name
        data[0] = this._keyMapping(data[0]);
        // 驗證:必填/格式
        if (!data[1]) {
          result.push(false);
        } else {
          result.push(
            this._validateReuslt({
              type: data[0],
              val: data[1],
            })
          );
        }
      });
      // console.log("Required validate reuslt: ", result);
      func(!result.includes(false));
    },
    /*
     * 資料格式驗證
     * input -> { val(字串), type(驗證類型), use(用途:(提示 / (true/false))) }
     * output -> true/false/string
     */
    _validateReuslt({ val, type, use }) {
      switch (type) {
        // email
        case this.dataType.email.type:
          if (val && val.search(this.dataType.email.role) == -1) {
            return use ? this._roleNotMatchHandler() : false;
          } else {
            return use ? this._nullContentHandler() : true;
          }
        // 員工編號(電話格式)
        case this.dataType.employeeID.type:
          if (val && val.search(this.dataType.employeeID.role) == -1) {
            return use ? this._roleNotMatchHandler() : false;
          } else {
            return use ? this._nullContentHandler() : true;
          }
        // 電話
        case this.dataType.tel.type:
          if (val && val.search(this.dataType.tel.role) == -1) {
            return use ? this._roleNotMatchHandler() : false;
          } else {
            return use ? this._nullContentHandler() : true;
          }
        // 身分證字號
        case this.dataType.idNumber.type:
          if (val && val.search(this.dataType.idNumber.role) == -1) {
            return use ? this._roleNotMatchHandler() : false;
          } else if (val.search(this.dataType.idNumber.role) > -1) {
            return this._checkIdNumberHandler(val)
              ? use
                ? null
                : true
              : this._roleNotMatchHandler();
          } else {
            return use ? this._nullContentHandler() : true;
          }
        // 密碼
        case this.dataType.password.type:
          this._password = val;
          return use ? this._nullContentHandler() : true;
        // 註冊和修改密碼新規則驗證
        case this.dataType.rolePassword.type:
          this._password = val;
          if (val && val.search(this.dataType.rolePassword.role) == -1) {
            return use ? this._roleNotMatchHandler() : false;
          } else {
            return use ? this._nullContentHandler() : true;
          }
        // 確認密碼
        case this.dataType.checkPassword.type: //自訂亦特殊檢查類型
          return use
            ? this._nullContentHandler()
            : this._checkPasswordHandler(val);
        default:
          return use ? this._nullContentHandler() : true;
      }
    },
    _roleNotMatchHandler() {
      if (this.type !== "rolePassword") {
        return (
          this.warn.require +
          this.warn.formatNotMatch +
          this.dataType[this.type].val
        );
      } else {
        return (
          "不" +
          this.warn.formatNotMatch +
          this.dataType[this.type].val +
          "格式! " +
          `(${this.placeholder[this.type]})`
        );
      }
    },
    _nullContentHandler() {
      return this.required && !this.value
        ? this.warn.require + this.dataType[this.type].val
        : null;
    },
    _checkPasswordHandler(val) {
      if (this._password != val) {
        this.errorNotice("passwordDifference");
      }
      return this._password == val ? true : false;
    },
    _checkIdNumberHandler(id) {
      //建立字母分數陣列(A~Z)
      var city = new Array(
        1,
        10,
        19,
        28,
        37,
        46,
        55,
        64,
        39,
        73,
        82,
        2,
        11,
        20,
        48,
        29,
        38,
        47,
        56,
        65,
        74,
        83,
        21,
        3,
        12,
        30
      );
      id = id.toUpperCase();
      //使用「正規表達式」檢驗格式
      //將字串分割為陣列(IE必需這麼做才不會出錯)
      id = id.split("");
      //計算總分
      var total = city[id[0].charCodeAt(0) - 65];
      for (var i = 1; i <= 8; i++) {
        total += eval(id[i]) * (9 - i);
      }
      //補上檢查碼(最後一碼)
      total += eval(id[9]);
      //檢查比對碼(餘數應為0);
      return total % 10 !== 0 ? false : true;
    },
  },
};
