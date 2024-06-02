import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.scss";

function App() {
  const [enter, setEnter] = useState("");
  const [entering, setEntering] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const hashcode = sessionStorage.getItem("hashcode");
    if (hashcode && hashcode === import.meta.env.VITE_TOKEN_AUTH) {
      navigate("/chatbot");
    }
  }, [navigate]);

  const handleLogin = () => {
    if (enter === "stratesys" && entering === "stratesys0324") {
      sessionStorage.setItem("hashcode", import.meta.env.VITE_TOKEN_AUTH);
      navigate("/chatbot");
    } else {
      alert("Credenciais inválidas.");
    }
  };

  return (
    <div className="loginPage">
      <div className="form">
        <h2>U-Know</h2>
        <input
          type="text"
          value={enter}
          onChange={(e) => setEnter(e.target.value)}
        />
        <input
          type="password"
          value={entering}
          onChange={(e) => setEntering(e.target.value)}
        />
        <button onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
}

export default App;
