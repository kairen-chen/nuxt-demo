let domain = process.env.API_BASE_URL;

if (process.client) {
  window.baseConfig = {
    baseURL: domain,
  };
}
export default domain;

// 解決台固雲無法SSR問題
export const getDomain = () => {
  if (process.server && !process.env.MODE) {
    return process.env.API_SSR_BASE_URL; // stage ssr
  } else {
    return domain;
  }
};
