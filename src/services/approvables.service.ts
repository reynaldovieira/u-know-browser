import axios from "axios";
import qs from "qs";

export const ListApprovables = async () => {
  try {
    let data = qs.stringify({});

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://u-assist-func-middleware-ariba.azurewebsites.net/api/list-approvables?",
      headers: {
        "Content-Type": "*",
      },
      data: data,
    };

    const response = await axios.request(config);
    console.log(response.data);
    const formatResponse = response.data;

    return JSON.stringify(formatResponse);
  } catch (error: any) {
    console.error(
      "Error fetching purchase list:",
      error.response ? error.response.data : error.message
    );
    return error.message;
  }
};
