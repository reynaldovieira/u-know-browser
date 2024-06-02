import { BrowserRouter, Route, Routes } from "react-router-dom";
import ChatBot from "./components/Chatbot";
import Login from "./components/Login";
import Auth from "./components/Auth";
import "./i18n/i18n.js";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/chatbot"
          element={
            <Auth>
              <ChatBot />
            </Auth>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
