import axios from "axios";
import "@/plugins/common/view-ui";
import { apiSignature, randomNumber } from "../common/util";
import { Error } from "./error";
import * as _config from "@/common/common";
import baseURL from "@/common/baseConfig";
import iView from "view-design";
import decodeHtmlEntity from "@/plugins/common/decodeHtmlEntity";

// 服务遍历器
const AjaxSend = {
  // 初始化
  init: function() {
    // axios 配置
    axios.defaults.timeout = _config.timeout; // 原設置10000ms，改為600000ms(10min)
    axios.defaults.headers.common["Content-Type"] = _config.ContentType;
    axios.defaults.headers.common["Version"] = _config.Version;
    axios.defaults.headers.common["AccessKeyId"] = _config.AccessKeyId;
    axios.defaults.headers.common["SignatureMethod"] = _config.SignatureMethod;
    axios.defaults.headers.common["SignatureVersion"] =
      _config.SignatureVersion;
    axios.defaults.baseURL = baseURL;

    if (process.client) {
      // 添加請求拦截器
      axios.interceptors.request.use(
        (config) => {
          let timestamp = new Date().getTime() + "";
          let signatureNonce = randomNumber();
          let signature = apiSignature(timestamp, signatureNonce);
          // timestamp = '1490259006774'
          // signatureNonce = '3348'
          config.headers.common["Timestamp"] = timestamp;
          config.headers.common["SignatureNonce"] = signatureNonce;
          config.headers.common["Signature"] = signature;
          config.headers.common["X-Access-Token"] = process.client
            ? localStorage.getItem("accessToken")
            : null;
          return config;
        },
        (error) => {
          Error(error);
          process.client && document.getElementsByClassName("loading")[0]
            ? (document.getElementsByClassName("loading")[0].style.display =
                "none")
            : false;
        }
      );

      // 添加响应拦截器
      axios.interceptors.response.use(
        (response) => {
          process.client && document.getElementsByClassName("loading")[0]
            ? (document.getElementsByClassName("loading")[0].style.display =
                "none")
            : false;

          if (response.data && typeof response.data === "string") {
            let data = JSON.parse(decodeHtmlEntity(response.data));
            return data;
          }
          return response.data;
        },
        (error) => {
          iView.Notice.destroy();
          let obj = Error(error);
          process.client && document.getElementsByClassName("loading")[0]
            ? (document.getElementsByClassName("loading")[0].style.display =
                "none")
            : false;

          return Promise.reject(typeof obj?.then === "function" ? obj : error);
        }
      );
    }
  },
  httpRequest: {
    url: "",
  },
  serviceApi: undefined,
  // 遍历所有服务接口
  loopServiceApi: function(serviceApi) {
    for (let i in serviceApi) {
      serviceApi[i].send = this.send;
      serviceApi[i].searchValue = this.searchValue;
      serviceApi[i].fileUpload = this.fileUpload;
    }
  },
  searchValue: function(arrObj) {
    let value = "";
    for (let i in arrObj) {
      if (parseInt(i) + 1 > arrObj.length) {
        break;
      }
      if (arrObj[i].value === undefined || arrObj[i].value === "") {
        continue;
      }
      if (value) {
        value += " and ";
      }
      value +=
        arrObj[i].account + " " + arrObj[i].operator + " " + arrObj[i].value;
    }
    return value;
  },
  requestService: function(params, url, list) {
    let ajaxObject = {
      headers: AjaxSend.serviceApi.headers ? AjaxSend.serviceApi.headers : null,
      method: AjaxSend.serviceApi.method,
    };
    // AjaxSend.serviceApi.method === "get"
    //   ? (ajaxObject.params = params)
    //   : (ajaxObject.data = params);

    switch (AjaxSend.serviceApi.method) {
      case "get":
        //  params=Qs.stringify(params, {arrayFormat: 'repeat'})
        //  params=Qs.stringify(params, {indices: false})
        ajaxObject.params = params;
        break;
      case "post":
      case "patch":
      case "put":
        if (list) {
          url = url.replace("{1}", list.toString());
        }
        ajaxObject.data = params;
        break;
      case "delete":
        if (
          url !== "api/v1/user/token" &&
          url !== "api/v1/user/fubon" &&
          url !== "api/v1/user/twm"
        ) {
          let str = params.toString();
          url = url.replace("{1}", str.replace(/\$/g, "$$$$"));
          // str = str.replace("$$","$$$$$$$$")
          // url=url.replace("{1}",str)
        }
        break;
      // case 'put':
      //       url=url.replace("{1}",params.toString())
      //       break
    }
    return axios(url, ajaxObject);
  },
  isRequestPost: function(list) {
    if (AjaxSend.serviceApi.requestPost && list && list !== "") {
      let requestPost = AjaxSend.serviceApi.requestPost(list);
      if (AjaxSend.httpRequest.url.indexOf("?") === -1) {
        for (let i in requestPost) {
          if (AjaxSend.httpRequest.url.indexOf("?") !== -1) {
            AjaxSend.httpRequest.url += "&" + i + "=" + requestPost[i];
          } else {
            AjaxSend.httpRequest.url += "?" + i + "=" + requestPost[i];
          }
        }
      } else {
        for (let i in requestPost) {
          AjaxSend.httpRequest.url += "&" + i + "=" + requestPost[i];
        }
      }
    }
  },
  send: function(params, list) {
    AjaxSend.serviceApi = this;
    AjaxSend.httpRequest.url = AjaxSend.serviceApi.requestUrl;
    if (list) {
      AjaxSend.isRequestPost(list);
    }
    try {
      // AjaxSend.serviceApi.isNoLoad
      //   ? (document.getElementsByClassName("loading")[0].style.display = "none")
      //   : (document.getElementsByClassName("loading")[0].style.display =
      //       "block");
      return AjaxSend.requestService(params, AjaxSend.httpRequest.url);
    } catch (error) {
      Error(error);
    }
  },
  fileUpload: function(file) {
    let fd = new FormData();
    if (file) {
      for (let i in file) {
        fd.append(i, file[i]);
      }
    }
    AjaxSend.serviceApi = this;
    AjaxSend.httpRequest.url = AjaxSend.serviceApi.requestUrl;
    try {
      if (document.getElementsByClassName("loading")[0]) {
        document.getElementsByClassName("loading")[0].style.display = "block";
      }
      return AjaxSend.requestService(fd, AjaxSend.httpRequest.url);
    } catch (error) {
      Error(error);
    }
  },
};
// 服务初始化
AjaxSend.init();
export default AjaxSend;
