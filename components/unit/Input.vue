<template>
  <div>
    <input
      :type="inputInfo.type"
      :placeholder="placetext || inputInfo.placeholder"
      :value="value"
      :disabled="disabled"
      :maxlength="inputInfo.maxlength || maxlength"
      @input="$emit('input', $event.target.value)"
      @blur="inputInfo.trigger == 'blur' ? inputHandler() : 'javaScript:;'"
    />
    <span class="warn"> {{ validateResultString }} </span>
  </div>
</template>
<script>
import validateMixin from "@/plugins/mixins/validateMixin";
export default {
  mixins: [validateMixin],
  props: {
    type: {
      type: String,
      default() {
        return "text";
      },
    },
    required: {
      type: Boolean,
    },
    value: {
      type: String,
    },
    placetext: {
      type: String,
    },
    disabled: {
      type: Boolean,
    },
    maxlength: {
      type: String,
      default() {
        return "50";
      },
    },
  },
  data() {
    return {
      validateResultString: null,
    };
  },
  computed: {
    // 使用父層的type,補齊制式資料
    inputInfo() {
      switch (this.type) {
        case "email":
          return {
            placeholder: this.placeholder.email,
            type: "text",
            trigger: "blur",
            validateType: "email",
          };
        case "password":
          return {
            placeholder: this.placeholder.password,
            type: "password",
            trigger: "blur",
            validateType: "password",
          };
        case "rolePassword":
          return {
            placeholder: this.placeholder.rolePassword,
            type: "password",
            trigger: "blur",
            validateType: "rolePassword",
            maxlength: 12,
          };
        case "checkPassword":
          return {
            placeholder: this.placeholder.password,
            type: "password",
            trigger: "blur",
            validateType: "password",
            maxlength: 12,
          };
        case "tel":
          return {
            placeholder: this.placeholder.tel,
            type: "tel",
            trigger: "blur",
            validateType: "tel",
          };
        case "employeeID":
          return {
            placeholder: this.placeholder.employeeID,
            type: "tel",
            trigger: "blur",
            validateType: "employeeID",
          };
        case "idNumber":
          return {
            placeholder: this.placeholder.idNumber,
            type: "text",
            trigger: "blur",
            validateType: "idNumber",
          };
        default:
          return {
            placeholder: this.placeholder.text,
            type: "text",
            trigger: "blur",
            validateType: "text",
          };
      }
    },
  },
  watch: {
    value() {
      if (this.value && this.value.length > 0) this.validateResultString = null;
    },
  },
  mounted: function() {
    this.$nextTick(function() {
      this.$on("inputHandler", function() {
        this.inputHandler();
      });
    });
  },
  methods: {
    inputHandler() {
      this.validateResultString = this._validateReuslt({
        type: this.type, //父層設的type,可隨便定義,到validateMixin內的_validateReuslt()和this.dataType要呼應(特殊參考:checkPassword)
        val: this.value,
        use: "signal",
      });
    },
    requiredHandler() {
      return this.value ? true : false;
    },
  },
};
</script>
<style lang="scss" scoped>
@import "@/assets/scss/components/member/common.scss";
.inputContainer {
  .blueBorder {
    input:focus {
      border-color: map-get($color, "Blue10");
    }
  }
  .orangeBorder {
    input:focus {
      border-color: map-get($color, "Orange10");
    }
  }
  input {
    .blueBorder:focus {
      border-color: map-get($color, "Blue10");
    }
    &.orangeBorder:focus {
      border-color: map-get($color, "Orange10");
    }
  }
}
.warn {
  position: absolute;
  bottom: 0;
  left: 20px;
  color: map-get($color, Red);
}
</style>
