import * as _config from "@/common/common";
import { getDomain } from "@/common/baseConfig";
import { apiSignature, randomNumber } from "@/common/util";

let headerCommon = {
  headers: {
    ["Content-Type"]: _config.ContentType,
    ["Version"]: _config.Version,
    ["AccessKeyId"]: _config.AccessKeyId,
    ["SignatureMethod"]: _config.SignatureMethod,
    ["SignatureVersion"]: _config.SignatureVersion,
  },
};

let headerConfig = () => {
  let _timestamp = new Date().getTime() + "";
  let _signatureNonce = randomNumber();
  let _signature = apiSignature(_timestamp, _signatureNonce);
  let headers = {
    headers: Object.assign({}, headerCommon.headers, {
      ["Timestamp"]: _timestamp,
      ["SignatureNonce"]: _signatureNonce,
      ["Signature"]: _signature,
    }),
  };

  return headers;
};

// axios
import axios from "axios";
import https from "https";
import decodeHtmlEntity from "@/plugins/common/decodeHtmlEntity";
import iView from "view-design";
import { Error } from "./error";
const axiosInstance = axios.create({
  httpsAgent: new https.Agent({
    rejectUnauthorized: false,
  }),
});
// axios攔截器
axiosInstance.interceptors.response.use(
  (response) => {
    if (response.data && typeof response.data === "string") {
      let data = JSON.parse(decodeHtmlEntity(response.data));
      return { data };
    } else {
      return response;
    }
  },
  (error) => {
    iView.Notice.destroy();
    Error(error);
  }
);

export { headerConfig, getDomain, axiosInstance };
