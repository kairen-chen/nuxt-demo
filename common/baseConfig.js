let domain;
import fetch from "cross-fetch";

export default domain;

export const getClientDomain = async () => {
  try {
    const response = await fetch(
      `${process.client ? window.location.origin : process.hostName}/env.json`
    );
    const data = await response.json();
    domain = data.API_BASE_URL;
    process.APIDomain = data.API_BASE_URL;
    return data.API_BASE_URL;
  } catch (e) {}
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
