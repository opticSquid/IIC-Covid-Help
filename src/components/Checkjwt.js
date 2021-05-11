import Axios from "axios";
const CheckToken = async () => {
  console.log("Real token: ", sessionStorage.getItem("accessToken"));
  console.log("In regenerating token");
  await Axios.get("http://localhost:5000/checktoken", {
    headers: {
      accesstoken: sessionStorage.getItem("accessToken"),
      refreshtoken: localStorage.getItem("refreshToken"),
    },
  })
    .then((response) => {
      console.log("Response of jwt generation", response.data);
      sessionStorage.setItem("accessToken", response.data.accessToken);
      return true;
    })
    .catch((error) => {
      console.log("Could not request for new access token", error);
      return false;
    });
};

export default CheckToken;
