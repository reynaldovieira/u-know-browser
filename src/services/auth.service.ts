import axios from "axios";

export default async function AuthService(clientId: any, clientSecret: any) {
  const authUrl = "https://api.ariba.com/v2/oauth/token?grant_type=openapi_2lo";
  const authorization = `Basic ${btoa(`${clientId}:${clientSecret}`)}`;

  try {
    const response = await axios.post(authUrl, null, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: authorization,
      },
    });
    console.log("Authentication successful");
    return response.data.access_token;
  } catch (error: any) {
    console.error(
      "Authentication error:",
      error.response ? error.response.data : error.message
    );
    throw new Error("Failed to authenticate");
  }
}
