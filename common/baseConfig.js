let domain = "";
if (process.env.MODE === "dev") {
  domain = "http://10.57.52.8:8100/"; //內網訪問
} else if (process.env.MODE === "devOutsideNetwork") {
  domain = "http://isharing.fihcloud.com/"; //外網訪問
} else {
  domain = "https://stage-isharing.fihcloud.com/"; //台固雲
}
if (process.client) {
  window.baseConfig = {
    baseURL: domain,
  };
}
export default domain;

// 解決台固雲無法SSR問題
export const getDomain = () => {
  if (process.server && !process.env.MODE) {
    return "http://192.168.0.243:8100/"; // stage ssr
  } else {
    return domain;
  }
};
