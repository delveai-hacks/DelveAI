import baseurl from ".";

const refreshAuth = async () => {
  if (localStorage.getItem("refreshToken") !== null) {
    try {
      const res = await baseurl.get("/auth/refresh_token", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("refreshToken")}`,
        },
      });
      localStorage.setItem("accessToken", res.data.access_token);
      localStorage.setItem("refreshToken", res.data.refresh_token);
    } catch (err: any) {
      console.log(err.message);
    }
  } else {
    console.log("no auth refresh");
  }
};

export default refreshAuth;
