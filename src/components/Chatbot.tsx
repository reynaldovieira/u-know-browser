import React, { useCallback, useEffect, useState } from "react";
import OpenAI from "openai";
import {
  Widget,
  addResponseMessage,
  toggleMsgLoader,
  addUserMessage,
} from "react-chat-widget";
import "react-chat-widget/lib/styles.css";
import axios from "axios";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { useTranslation } from "react-i18next";
import { format } from "date-fns";
import { PurchaseRequest } from "../services/purchaseRequest.service";
import { PurchaseStatus, PurchaseList } from "../services/purchases.service";
import { QualifyProvider } from "../services/providers.service";
import { ListApprovables } from "../services/approvables.service";
import "./Chatbot.scss";

const apiKey = import.meta.env.VITE_API_KEY;
const openai = new OpenAI({
  apiKey: apiKey,
  dangerouslyAllowBrowser: true,
});
let openaiThreadCreated = false;
let thread: any = null;

const createOpenaiThreadIfNeeded = async () => {
  if (!openaiThreadCreated) {
    thread = await openai.beta.threads.create();
    openaiThreadCreated = true;
  }
};

const addMessageToThread = async ({
  content: txt,
  role,
}: {
  content: string;
  role: "user" | "assistant";
}) => {
  if (!openaiThreadCreated) {
    await createOpenaiThreadIfNeeded();
  }
  await openai.beta.threads.messages.create(thread.id, {
    role: role || "user",
    content: txt,
  });
};

const createRun = async () => {
  return await openai.beta.threads.runs.createAndPoll(thread.id, {
    assistant_id: "asst_LUlE6pwP6sc3QYHrC1ZZ8Xin",
  });
};

const handleRequiresAction = async (run: any, t: any): Promise<any> => {
  if (
    run.required_action &&
    run.required_action.submit_tool_outputs &&
    run.required_action.submit_tool_outputs.tool_calls
  ) {
    const toolOutputsPromises =
      run.required_action.submit_tool_outputs.tool_calls.map(
        async (tool: any) => {
          if (tool.function.name === "finish_pr") {
            // addResponseMessage(t(`waitWhileIFinish`));
            const args = JSON.parse(tool.function.arguments);
            const output = (await PurchaseRequest(args.products))?.data;
            return {
              tool_call_id: tool.id,
              output,
            };
          } else if (tool.function.name === "get_status_pr") {
            const args = JSON.parse(tool.function.arguments);
            const output = await PurchaseStatus({ pr: args.pr });
            console.log(output);
            return {
              tool_call_id: tool.id,
              output,
            };
          } else if (tool.function.name === "info_supplier") {
            const args = JSON.parse(tool.function.arguments);
            let output = await QualifyProvider({
              cnpj: args.cnpj,
              checkhistory: true,
            });
            if (typeof output !== "string") {
              output =
                "Data de hoje: " +
                format(new Date(), "dd-MM-yyyy") +
                " " +
                JSON.stringify(output);
            }
            return {
              tool_call_id: tool.id,
              output,
            };
          } else if (tool.function.name === "qualify_supplier") {
            const args = JSON.parse(tool.function.arguments);
            let output = await QualifyProvider({
              cnpj: args.cnpj,
              checkhistory: false,
            });
            if (typeof output !== "string") {
              output =
                "Data de hoje: " +
                format(new Date(), "dd-MM-yyyy") +
                " " +
                JSON.stringify(output);
            }
            return {
              tool_call_id: tool.id,
              output,
            };
          } else if (tool.function.name === "get_list_pr") {
            const args = JSON.parse(tool.function.arguments);
            console.log("args", args);
            const output = await PurchaseList({ date: args.date });
            console.log(output);
            return {
              tool_call_id: tool.id,
              output,
            };
          } else if (tool.function.name === "get_list_approvables") {
            const args = JSON.parse(tool.function.arguments);
            const output = await ListApprovables();
            console.log(output);
            return {
              tool_call_id: tool.id,
              output,
            };
          } else if (tool.function.name === "ask_to_wait") {
            const args = JSON.parse(tool.function.arguments);
            addResponseMessage(args.message);
            const output = "ok";
            return {
              tool_call_id: tool.id,
              output,
            };
          }
        }
      );

    const toolOutputs = await Promise.all(toolOutputsPromises);

    if (toolOutputs.length > 0) {
      run = await openai.beta.threads.runs.submitToolOutputsAndPoll(
        thread.id,
        run.id,
        { tool_outputs: toolOutputs }
      );
    }
    return handleRunStatus(run, t);
  }
};

const handleRunStatus = async (run: any, t: any) => {
  if (run.status === "completed") {
    return run;
  } else if (run.status === "requires_action") {
    return await handleRequiresAction(run, t);
  }
};

const handleNewUserMessage = async (newMessage: string, t: any) => {
  toggleMsgLoader();
  await createOpenaiThreadIfNeeded();
  await addMessageToThread({ content: newMessage, role: "user" });
  let run = await createRun();
  run = await handleRunStatus(run, t);

  if (run && run.status === "completed") {
    const messages: any = await openai.beta.threads.messages.list(
      run.thread_id
    );
    const assistantMessage = messages.data.find(
      (message: any) => message.role === "assistant"
    );

    if (assistantMessage) {
      const response = assistantMessage.content[0].text.value;
      addResponseMessage(response);
    } else {
      addResponseMessage(t(`sorryCouldnUnderstand`));
    }
  }
  toggleMsgLoader();
};

const Dictaphone = ({ message }: any) => {
  const micStyle: React.CSSProperties = {
    fontSize: "2rem",
    backgroundColor: "#3ab54a",
    padding: "1rem",
    borderRadius: "50%",
    width: "2rem",
    height: "2rem",
    boxShadow: " 0 2px 10px 1px #b5b5b5",
    color: "#fff",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "fixed",
    bottom: "1.28rem",
    right: "5.6rem",
    cursor: "pointer",
    zIndex: "99999999999",
  };

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  const startListening = () => {
    resetTranscript();
    SpeechRecognition.stopListening();
    SpeechRecognition.startListening({ continuous: true });
  };

  const stopListening = () => {
    setTimeout(() => {
      SpeechRecognition.stopListening();
      message(transcript);
      resetTranscript();
    }, 1000);
  };

  if (!browserSupportsSpeechRecognition) {
    return null;
  }

  return (
    <div>
      {!listening ? (
        <i
          className="fa-solid fa-microphone"
          style={micStyle}
          onClick={startListening}
        ></i>
      ) : (
        <i
          className="fa-solid fa-stop"
          style={micStyle}
          onClick={stopListening}
        ></i>
      )}
    </div>
  );
};

const ImageButton = ({ message }: any) => {
  const [imageData, setImageData] = useState(null) as any;

  const encodeImage = (imagePath: any) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader() as any;
      reader.readAsDataURL(imagePath);
      reader.onloadend = () => {
        resolve({
          type: "image_url",
          image_url: {
            url: `data:image/jpeg;base64,${reader.result?.split(",").pop()}`,
          },
        });
      };
      reader.onerror = reject;
    });
  };

  const handleFileChange = useCallback(async (event) => {
    if (!event.target.files[0]) return;
    if (event.target.files[0].type.includes("image")) {
      const fileData = await encodeImage(event.target.files[0]);
      setImageData(fileData);
    }
  }, []);

  const fetchImageData = async () => {
    if (imageData) {
      const requestData = JSON.stringify({
        model: "gpt-4-vision-preview",
        max_tokens: 600,
        messages: [
          {
            role: "assistant",
            content: [
              {
                type: "text",
                text: `Por favor, dedique um tempo cuidadoso e detalhado à análise da imagem apresentada, com o objetivo de identificar o produto mostrado com a maior precisão possível. Sua tarefa inclui reconhecer a marca e, se viável, o modelo específico do produto. Seguem as diretrizes detalhadas: \n 1. Priorize a identificação do produto, incluindo a marca e o modelo quando visíveis. \n 2. Se o modelo não for claramente identificável, concentre-se em determinar o produto e a marca. \n 3. Na ausência de informações sobre a marca, forneça apenas o tipo de produto. \n 4. Desconsidere a presença de pessoas na imagem; seu foco deve estar exclusivamente no produto. Por exemplo, se uma caneca está sendo segurada, mencione somente a caneca. \n 5. Se, após uma análise minuciosa, o produto não puder ser identificado, utilize a resposta padrão: 'Não foi possível identificar o produto'. \n 6. A resposta deve ser direta e limitada às informações sobre o produto, sem descrições adicionais ou introduções. Mencione somente o produto, e, quando possível, a marca e o modelo. \n \n Alguns exemplos de respostas adequadas incluem 'Mouse Logitech G502', 'Parafuso Sextavado M6', 'Teclado Razer BlackWidow Mechanical', 'Rolete de aço', 'Correia transportadora'. Evite justificar as dificuldades de identificação; responda somente com as informações do produto que conseguir confirmar. \n 7. Responda no seguinte idioma: ${navigator.language}.`,
              },
              imageData,
            ],
          },
        ],
      });

      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        requestData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
        }
      );

      const finalResponse = response.data.choices[0].message.content || "";

      finalResponse &&
        !finalResponse.toLowerCase().includes("error") &&
        message(finalResponse);
    }
  };

  useEffect(() => {
    fetchImageData();
  }, [imageData]);

  const imgStyle: React.CSSProperties = {
    fontSize: "2rem",
    backgroundColor: "#3ab5af",
    padding: "1rem",
    borderRadius: "50%",
    width: "2rem",
    height: "2rem",
    boxShadow: " 0 2px 10px 1px #b5b5b5",
    color: "#fff",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "fixed",
    bottom: "1.28rem",
    right: "10.4rem",
    cursor: "pointer",
    zIndex: "99999999999",
  };

  return (
    <div>
      <i
        className="fa-solid fa-camera"
        style={imgStyle}
        onClick={() => document.getElementById("file-input")?.click()}
      ></i>
      <input
        id="file-input"
        type="file"
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
    </div>
  );
};

const Chatbot = () => {
  const { t } = useTranslation();
  const [showChatbot, setShowChatbot] = useState(false);
  const [audioMessage, setAudioMessage] = useState("");

  useEffect(() => {
    addResponseMessage(t(`welcomeMessage`));
  }, [t]);

  const handleAudioMessage = (transcript: string) => {
    setAudioMessage(transcript);
    addUserMessage(transcript);
    handleNewUserMessage(transcript, t);
  };

  const handleImgMessage = (response: string) => {
    addUserMessage(response);
    handleNewUserMessage(response, t);
  };

  const cancelVoice = () => {
    SpeechRecognition.stopListening();
    setAudioMessage("");
  };

  const logoUrl: string = "./logo-u-know.svg";

  return (
    <>
      <div>
        <ImageButton message={handleImgMessage} />
      </div>

      <div onClick={cancelVoice}>
        <Dictaphone message={handleAudioMessage} />
      </div>

      <Widget
        handleNewUserMessage={(msg: string) => handleNewUserMessage(msg, t)}
        titleAvatar={logoUrl}
        senderPlaceHolder={t(`typeYourDoubt`)}
        subtitle=""
        toggleMsgLoader
      />
    </>
  );
};

export default Chatbot;
