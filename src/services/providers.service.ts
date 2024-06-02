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
          "Accept-Encoding": "gzip, deflate, br",
        },
      }
    );
    console.log(response.data);
    return await JSON.stringify(response.data);

    //   if (response.data.includes("</fornecedorQualificado>")) {
    //     await requestOpenAI({
    //       role: "system",
    //       content:
    //         "Responda essa mensagem no seguinte formato 'Este fornecedor já foi qualificado <negrito>{{quantidade de vezes}}<negrito> vezes. A última qualificação ocorreu em <negrito>{{data da última qualificação, formato dd/mm/yyyy}}</negrito>. \n \n Deseja continuar com essa qualificação ou prefere solicitar uma nova qualificação?' \n \n Caso o usuário aceite prosseguir com essa qualificação, continue a auxiliar o usuário com as informações solicitadas, baseada no conteúdo json que vou te passar. \n \n Caso o usuário prefira solicitar uma nova qualificação, responda com '<buscarFornecedor>" +
    //         cnpj +
    //         "<buscarFornecedor></novaQualificacao>'. \n \n \n Segue o conteúdo para você obter os dados para as dúvidas do usuário (verifique no histórico de mensagens qual foi a dúvida do cliente como: 'porte', 'capital social', 'nota', 'reputação social', etc). Caso o usuário não especifique uma informação, responda com o formato do prompt inicial da conversa, um overview. >>> : " +
    //         JSON.stringify(response.data),
    //     });
    //   } else {
    //     await requestOpenAI({
    //       role: "system",
    //       content: `Responda a dúvida do usuário baseado no seguinte conteúdo json >>> : ${JSON.stringify(
    //         response.data
    //       )}`,
    //     });
    //     return;
    //   }
  } catch (error: any) {
    console.error(
      "Error fetching provider qualification:",
      error.response ? error.response.data : error.message
    );
    return error.message;
  }
};
