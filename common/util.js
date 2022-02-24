import CryptoJS from 'crypto-js'


/**
 * 获取api签名
 */
export const apiSignature = (timestamp, signatureNonce) => {
  let version = 'v1'
  let accessKeyId = 'testid'
  let signatureMethod = 'HMAC-SHA1'
  // timestamp = '1490259006774'
  let signatureVersion = '1.0'
  // signatureNonce = '3348'
  let signatureStr = version + '\n' +
    accessKeyId + '\n' +
    signatureMethod + '\n' +
    timestamp + '\n' +
    signatureVersion + '\n' +
    signatureNonce
  // 密钥
  let accessKeySecret = '7b710ff6d11fda1c386111a60e5e0702'
  return CryptoJS.enc.Base64.stringify(CryptoJS.HmacSHA1(signatureStr, accessKeySecret))
}

export const randomNumber = () => {
  // let numStr = ''
  // let num = Math.floor(Math.random() * 32)
  // for (let i = 0; i <= num; i++) {
  //   numStr += Math.floor(Math.random() * 10)
  // }
  // return numStr
  
  // 減少Nonce collision
  var d = Date.now();
  if (typeof performance !== 'undefined' && typeof performance.now === 'function'){
    d += performance.now(); //use high-precision timer if available
  }
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (d + Math.random() * 16) % 16 | 0;
    d = Math.floor(d / 16);
      return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
  });

}
