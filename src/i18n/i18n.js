import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
  // detect user language
  // .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  .init({
    debug: true,
    fallbackLng: "es",
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    resources: {
      en: {
        translation: {
          language: "en",
          welcomeMessage: "Welcome to U-Know! Can i assist you with something?",
          greetings: "Hello, how can I help you?",
          canIAssistYou: "Hello, can I assist you in any purchase?",
          couldntUnderstand:
            "I couldn't understand your message, please try again.",
          typeYourDoubt: "Type your doubt",
          makeYourPurchasesHere: "Make your purchases here!",
          couldntFinishPurchase: "Couldn't finish purchase",
          verifyingCatalog: "Wait a moment, I'm checking in our catalog.",
          dontHaveSuchProduct:
            "Answer that we don't have this product in our catalog.",
          theCustomerSaid: "The customer said ",
          analyzeOptions: ". (analyze the following options and answer): ",
          yourPurchaseNumber:
            " finished successfully. Thank you! \n Your order number is ",
          purchase: "Purchase of ",
          waitWhileIVerifyTheCatalog:
            "Wait a moment, I'm verifying your catalog.",
          waitWhileIFinish: "Wait a moment, I'm finishing your purchase.",
          tooManyMessages:
            "This conversation contains too many messages, please complete or cancel your order.",
          units: "units, ",
        },
      },
      pt: {
        translation: {
          language: "pt",
          welcomeMessage: "Bem-vindo ao U-Know! Posso te ajudar em algo?",
          greetings: "Olá, como posso ajudar?",
          canIAssistYou: "Olá, posso te auxiliar em alguma compra?",
          couldntUnderstand:
            "Não consegui entender sua mensagem, por favor tente novamente.",
          typeYourDoubt: "Digite sua dúvida",
          makeYourPurchasesHere: "Faça seus pedidos de compra aqui!",
          couldntFinishPurchase: "Não foi possível finalizar a compra",
          verifyingCatalog:
            "Aguarde um momento, estou verificando em nosso catálogo.",
          dontHaveSuchProduct:
            "Responda que não possuimos esse produto em nosso catálogo.",
          theCustomerSaid: "O cliente disse ",
          analyzeOptions: ". (analise as seguintes opções e o responda): ",
          yourPurchaseNumber:
            " finalizada com sucesso. Obrigado! \n Seu número do pedido é ",
          purchase: "Compra de ",
          waitWhileIVerifyTheCatalog:
            "Aguarde um momento, estou verificando seu catálogo.",
          waitWhileIFinish: "Aguarde um momento, estou finalizando sua compra.",
          tooManyMessages:
            "Essa conversa contém muitas mensagens, por favor conclua ou cancele seu pedido.",
          units: "unidades, ",
        },
      },
      es: {
        translation: {
          language: "es",
          welcomeMessage: "¡Bienvenido a U-Know! ¿Puedo ayudarte en algo?",
          greetings: "Hola, ¿cómo puedo ayudarte?",
          canIAssistYou: "Hola, ¿puedo ayudarte en alguna compra?",
          couldntUnderstand:
            "No pude entender tu mensaje, por favor inténtalo de nuevo.",
          typeYourDoubt: "Escribe tu duda",
          makeYourPurchasesHere: "¡Haz tus compras aquí!",
          couldntFinishPurchase: "No se pudo completar la compra",
          verifyingCatalog:
            "Espere un momento, estoy verificando en nuestro catálogo.",
          dontHaveSuchProduct:
            "Responda que no tenemos este producto en nuestro catálogo.",
          theCustomerSaid: "El cliente dijo ",
          analyzeOptions: ". (analiza las siguientes opciones y responde): ",
          yourPurchaseNumber:
            " finalizada con éxito. ¡Gracias! \n Su número de pedido es ",
          purchase: "Compra de ",
          waitWhileIVerifyTheCatalog:
            "Espere un momento, estoy verificando su catálogo.",
          waitWhileIFinish: "Espere un momento, estoy terminando su compra.",
          tooManyMessages:
            "Esta conversación contiene demasiados mensajes, por favor complete o cancele su pedido.",
          units: "unidades, ",
        },
      },
    },
  });

export default i18n;
