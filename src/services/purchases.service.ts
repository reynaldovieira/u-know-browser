import axios from "axios";
import qs from "qs";

export const PurchaseStatus = async ({ pr }: { pr: string }) => {
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
    const formatResponse = JSON.stringify({
      status: response.data?.statusString,
      totalCost: response.data?.totalCost,
      requesterName: response.data?.requesterName,
      timeUpdated: new Date(response.data?.timeUpdated),
      items: response.data?.lineItems.map((item: any) => ({
        description: item.description,
      })),
    });
    console.log("formatResponse", formatResponse);
    return formatResponse;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to authenticate");
  }
};

export const PurchaseList = async ({ date }: { date: string }) => {
  console.log("data >", date);
  //converte a data no formato YYYY-MM-DD para timestamp
  date = new Date(date).getTime().toString();
  console.log("data convertida >", date);
  let data = qs.stringify({
    date: date,
  });

  try {
    const response = await axios.post(
      "https://u-assist-func-middleware-ariba.azurewebsites.net/api/list-prs",
      data,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        maxBodyLength: Infinity,
      }
    );
    console.log("response.data", response);
    const formatResponse = JSON.stringify(response.data);
    console.log("formatResponse", JSON.stringify(formatResponse));
    return formatResponse;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to authenticate");
  }
};
