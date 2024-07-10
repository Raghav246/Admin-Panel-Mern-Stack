import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Guard({ children }) {
  const navigate = useNavigate();
  useEffect(() => {
    const adminToken = localStorage.getItem("adminToken");
    if (!adminToken) {
      navigate("/");
      localStorage.clear();
    }
  }, [navigate]);

  return <>{children}</>;
}
