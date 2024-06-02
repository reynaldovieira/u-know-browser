import axios from "axios";
import AuthService from "./auth.service";

export const PurchaseStatus = async ({ pr }: { pr: string }) => {
  try {
    const token = await AuthService(
      "60b94eea-c9bf-4a56-90af-3cbe3afe5934",
      "11fqTiabLMpCjn9tyKtSBZrbWXZXrisk"
    );

    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `https://openapi.ariba.com/api/approval/v2/prod/requisitions?realm=StratesysDSAPP-T&$filter=uniqueName eq '${pr}'`,
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
        apiKey: "c4aV7qE7Sto5d77bhMuK3hs8anCrwrdt",
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await axios.request(config);
    return JSON.stringify(response.data);
  } catch (error: any) {
    console.error(
      "Error fetching purchase status:",
      error.response ? error.response.data : error.message
    );
    return error.message;
  }
};
