import Service from "./service";

const getInvalidToken = () => {
  setInterval(() => {
    Service.newAuthToken
      .send({ refreshToken: localStorage.getItem("refreshToken") })
      .then((data) => {
        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("tokenType", data.tokenType);
      });
  }, 1800000);
};
export default getInvalidToken;
