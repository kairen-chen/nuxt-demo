let domain;
export default domain;

// csr getDomain
export const getClientDomain = async () => {
  if (process.client) {
    const response = await fetch(`${window.location.origin}/env.json`);
    const data = await response.json();
    domain = data.API_BASE_URL;
    return data.API_BASE_URL;
  }
};
// ssr getDomain
export const getDomain = (env) => {
  // 解決台固雲無法SSR問題
  if (process.server && env.MODE === "stage") {
    return env.API_SSR_BASE_URL; // stage ssr
  } else {
    return env.API_BASE_URL;
  }
};
