import axios from "axios";
import qs from "qs";

export const PurchaseStatus = async ({ pr }: { pr: string }) => {
  console.log("PR", pr);
  let data = qs.stringify({
    pr: pr,
  });

  try {
    const response = await axios.post(
      "https://u-assist-func-middleware-ariba.azurewebsites.net/api/status-pr",
      data,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        maxBodyLength: Infinity,
      }
    );
    console.log("response.data", response);
    return response.data.toString();
  } catch (error) {
    console.error(error);
    throw new Error("Failed to authenticate");
  }
};
