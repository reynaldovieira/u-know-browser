import axios from "axios";
import qs from "qs";

export default async function AuthService(clientId: any, clientSecret: any) {
  let data = qs.stringify({
    clientId: "60b94eea-c9bf-4a56-90af-3cbe3afe5934",
    clientSecret: "11fqTiabLMpCjn9tyKtSBZrbWXZXrisk",
  });

  try {
    const response = await axios.post(
      "https://u-assist-func-middleware-ariba.azurewebsites.net/api/auth-service",
      data,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        maxBodyLength: Infinity,
      }
    );
    console.log("response.data", response.data);
    return response.data.access_token;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to authenticate");
  }
}
