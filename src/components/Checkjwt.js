import Axios from "axios";
const CheckToken = async (origin) => {
  await Axios.get(`${origin}/checktoken`, {
    headers: {
      accesstoken: sessionStorage.getItem("accessToken"),
      refreshtoken: localStorage.getItem("refreshToken"),
    },
  })
    .then((response) => {
      sessionStorage.setItem("accessToken", response.data.accessToken);
      return true;
    })
    .catch((error) => {
      console.log("Could not request for new access token", error);
      return false;
    });
};

export default CheckToken;
