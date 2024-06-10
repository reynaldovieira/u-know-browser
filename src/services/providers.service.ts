import axios from "axios";
export const QualifyProvider = async ({
  cnpj,
  checkhistory,
}: {
  cnpj: string;
  checkhistory: boolean;
}) => {
  try {
    const response = await axios.post(
      "https://u-assist-func-uqualify.azurewebsites.net/api/overview",
      {
        cnpj,
        checkHistory: checkhistory,
      },
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );
    console.log(response.data);
    return await JSON.stringify(response.data);
  } catch (error: any) {
    console.error(
      "Error fetching provider qualification:",
      error.response ? error.response.data : error.message
    );
    return error.message;
  }
};
