import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { ReactNode } from "react";

function Auth({ children }: { children: ReactNode }) {
  const token = sessionStorage.getItem("hashcode");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token || token !== import.meta.env.VITE_TOKEN_AUTH) {
      navigate("/");
    }
  }, [token, navigate]);

  return <>{children}</>;
}

export default Auth;
